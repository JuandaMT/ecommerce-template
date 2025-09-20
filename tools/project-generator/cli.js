#!/usr/bin/env node

import { Command } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const program = new Command()

program
  .name('create-ecommerce-client')
  .description('Generate a new e-commerce client project')
  .version('1.0.0')

program
  .argument('[client-name]', 'Name of the new client')
  .action(async (clientName) => {
    try {
      const config = await promptForConfig(clientName)
      await generateClient(config)
    } catch (error) {
      console.error(chalk.red('Error generating client:'), error.message)
      process.exit(1)
    }
  })

async function promptForConfig(clientName) {
  const questions = [
    {
      type: 'input',
      name: 'clientId',
      message: 'Client ID (used for database and configuration):',
      default: clientName || 'my-store',
      validate: (input) => {
        if (!/^[a-z0-9-]+$/.test(input)) {
          return 'Client ID must contain only lowercase letters, numbers, and hyphens'
        }
        return true
      }
    },
    {
      type: 'input',
      name: 'clientName',
      message: 'Client display name:',
      default: (answers) => answers.clientId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    },
    {
      type: 'input',
      name: 'companyName',
      message: 'Company name:',
      default: (answers) => answers.clientName
    },
    {
      type: 'input',
      name: 'tagline',
      message: 'Company tagline (optional):',
      default: 'Quality products for everyone'
    },
    {
      type: 'input',
      name: 'primaryColor',
      message: 'Primary color (hex):',
      default: '#1976d2',
      validate: (input) => {
        if (!/^#[0-9A-F]{6}$/i.test(input)) {
          return 'Please enter a valid hex color (e.g., #1976d2)'
        }
        return true
      }
    },
    {
      type: 'input',
      name: 'apiPort',
      message: 'Backend API port:',
      default: '5001',
      validate: (input) => {
        const port = parseInt(input)
        if (isNaN(port) || port < 1000 || port > 65535) {
          return 'Please enter a valid port number (1000-65535)'
        }
        return true
      }
    },
    {
      type: 'input',
      name: 'frontendPort',
      message: 'Frontend port:',
      default: '3000',
      validate: (input) => {
        const port = parseInt(input)
        if (isNaN(port) || port < 1000 || port > 65535) {
          return 'Please enter a valid port number (1000-65535)'
        }
        return true
      }
    },
    {
      type: 'confirm',
      name: 'generateBackendConfig',
      message: 'Generate backend configuration?',
      default: true
    }
  ]

  return await inquirer.prompt(questions)
}

async function generateClient(config) {
  const rootDir = path.resolve(process.cwd())
  const clientDir = path.join(rootDir, 'clients', `${config.clientId}-frontend`)
  const backendConfigPath = path.join(rootDir, 'packages', 'backend-core', 'clients', `${config.clientId}.env`)

  console.log(chalk.blue('\n🚀 Generating e-commerce client...'))
  console.log(chalk.gray(`Client ID: ${config.clientId}`))
  console.log(chalk.gray(`Directory: ${clientDir}`))

  // Check if client already exists
  if (await fs.pathExists(clientDir)) {
    throw new Error(`Client directory already exists: ${clientDir}`)
  }

  const spinner = ora('Copying template files...').start()

  try {
    // Copy frontend template
    const templateDir = path.join(rootDir, 'packages', 'frontend-template')
    await fs.copy(templateDir, clientDir, {
      filter: (src) => {
        const relativePath = path.relative(templateDir, src)
        return !relativePath.includes('node_modules') &&
               !relativePath.includes('dist') &&
               !relativePath.includes('.git')
      }
    })

    spinner.text = 'Customizing configuration...'

    // Generate client-specific configuration
    await generateClientConfig(clientDir, config)

    // Generate package.json
    await generatePackageJson(clientDir, config)

    // Generate backend configuration if requested
    if (config.generateBackendConfig) {
      await generateBackendConfig(backendConfigPath, config)
    }

    spinner.succeed('Client generated successfully!')

    console.log(chalk.green('\n✅ E-commerce client generated successfully!'))
    console.log(chalk.yellow('\nNext steps:'))
    console.log(chalk.gray(`1. cd ${path.relative(process.cwd(), clientDir)}`))
    console.log(chalk.gray('2. npm install'))
    console.log(chalk.gray('3. npm run dev'))

    if (config.generateBackendConfig) {
      console.log(chalk.yellow('\nBackend configuration:'))
      console.log(chalk.gray(`- Configuration file: ${path.relative(process.cwd(), backendConfigPath)}`))
      console.log(chalk.gray('- Update environment variables as needed'))
    }

  } catch (error) {
    spinner.fail('Failed to generate client')
    throw error
  }
}

async function generateClientConfig(clientDir, config) {
  const configPath = path.join(clientDir, 'src', 'config', 'client.config.ts')

  const configContent = `export interface ClientConfig {
  clientId: string
  name: string
  apiBaseUrl: string
  theme: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
  }
  branding: {
    logo: string
    favicon: string
    companyName: string
    tagline?: string
  }
  features: {
    wishlist: boolean
    reviews: boolean
    multiCurrency: boolean
    guestCheckout: boolean
    socialLogin: boolean
  }
  payment: {
    stripe?: {
      publishableKey: string
    }
    paypal?: {
      clientId: string
    }
  }
  seo: {
    defaultTitle: string
    defaultDescription: string
    keywords: string[]
  }
}

export const clientConfig: ClientConfig = {
  clientId: '${config.clientId}',
  name: '${config.clientName}',
  apiBaseUrl: 'http://localhost:${config.apiPort}/api',
  theme: {
    primary: '${config.primaryColor}',
    secondary: '#dc004e',
    accent: '#ff5722',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#333333'
  },
  branding: {
    logo: '/logo.png',
    favicon: '/favicon.ico',
    companyName: '${config.companyName}',
    tagline: '${config.tagline}'
  },
  features: {
    wishlist: true,
    reviews: true,
    multiCurrency: false,
    guestCheckout: true,
    socialLogin: false
  },
  payment: {
    // Add your payment provider configuration here
  },
  seo: {
    defaultTitle: '${config.companyName} - Quality Products',
    defaultDescription: 'Discover amazing products at ${config.companyName}',
    keywords: ['ecommerce', 'online store', 'shopping', '${config.clientId}']
  }
}`

  await fs.writeFile(configPath, configContent)
}

async function generatePackageJson(clientDir, config) {
  const packageJsonPath = path.join(clientDir, 'package.json')
  const packageJson = await fs.readJson(packageJsonPath)

  packageJson.name = `${config.clientId}-frontend`
  packageJson.scripts.dev = `vite --port ${config.frontendPort}`
  packageJson.scripts.preview = `vite preview --port ${config.frontendPort}`

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
}

async function generateBackendConfig(configPath, config) {
  const configContent = `# ${config.companyName} Configuration
CLIENT_NAME=${config.companyName}
DATABASE_URL=mongodb://localhost:27017/${config.clientId}-ecommerce
JWT_SECRET=${generateRandomSecret()}

# Payment Providers (Update with your keys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Storage Configuration
STORAGE_PROVIDER=local`

  await fs.writeFile(configPath, configContent)
}

function generateRandomSecret() {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15)
}

program.parse()
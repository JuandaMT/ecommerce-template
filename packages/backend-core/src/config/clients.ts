import { readFileSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export interface ClientConfig {
  CLIENT_ID: string
  CLIENT_NAME: string
  DATABASE_URL: string
  JWT_SECRET: string
  STRIPE_SECRET_KEY?: string
  PAYPAL_CLIENT_ID?: string
  PAYPAL_CLIENT_SECRET?: string
  EMAIL_SERVICE?: string
  EMAIL_HOST?: string
  EMAIL_PORT?: string
  EMAIL_USER?: string
  EMAIL_PASS?: string
  STORAGE_PROVIDER?: 'local' | 'aws' | 'cloudinary'
  AWS_ACCESS_KEY_ID?: string
  AWS_SECRET_ACCESS_KEY?: string
  AWS_REGION?: string
  AWS_BUCKET_NAME?: string
  CLOUDINARY_CLOUD_NAME?: string
  CLOUDINARY_API_KEY?: string
  CLOUDINARY_API_SECRET?: string
}

const clientConfigs: Map<string, ClientConfig> = new Map()

export const loadClientConfig = (clientId: string): ClientConfig => {
  if (clientConfigs.has(clientId)) {
    return clientConfigs.get(clientId)!
  }

  const clientEnvPath = join(__dirname, '../../clients', `${clientId}.env`)

  if (!existsSync(clientEnvPath)) {
    throw new Error(`Client configuration not found for: ${clientId}`)
  }

  // Load client-specific environment variables
  const envConfig = dotenv.parse(readFileSync(clientEnvPath))

  const config: ClientConfig = {
    CLIENT_ID: clientId,
    CLIENT_NAME: envConfig.CLIENT_NAME || clientId,
    DATABASE_URL: envConfig.DATABASE_URL || `mongodb://localhost:27017/${clientId}-ecommerce`,
    JWT_SECRET: envConfig.JWT_SECRET || `default-secret-${clientId}`,
    STRIPE_SECRET_KEY: envConfig.STRIPE_SECRET_KEY,
    PAYPAL_CLIENT_ID: envConfig.PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET: envConfig.PAYPAL_CLIENT_SECRET,
    EMAIL_SERVICE: envConfig.EMAIL_SERVICE,
    EMAIL_HOST: envConfig.EMAIL_HOST,
    EMAIL_PORT: envConfig.EMAIL_PORT,
    EMAIL_USER: envConfig.EMAIL_USER,
    EMAIL_PASS: envConfig.EMAIL_PASS,
    STORAGE_PROVIDER: (envConfig.STORAGE_PROVIDER as 'local' | 'aws' | 'cloudinary') || 'local',
    AWS_ACCESS_KEY_ID: envConfig.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: envConfig.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: envConfig.AWS_REGION,
    AWS_BUCKET_NAME: envConfig.AWS_BUCKET_NAME,
    CLOUDINARY_CLOUD_NAME: envConfig.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: envConfig.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: envConfig.CLOUDINARY_API_SECRET,
  }

  clientConfigs.set(clientId, config)
  return config
}

export const getClientConfig = (clientId: string): ClientConfig => {
  return loadClientConfig(clientId)
}

export const getAllClientIds = (): string[] => {
  const clientsDir = join(__dirname, '../../clients')

  if (!existsSync(clientsDir)) {
    return []
  }

  return readdirSync(clientsDir)
    .filter((file: string) => file.endsWith('.env'))
    .map((file: string) => file.replace('.env', ''))
}

export const validateClientConfig = (config: ClientConfig): void => {
  const required = ['CLIENT_ID', 'CLIENT_NAME', 'DATABASE_URL', 'JWT_SECRET']

  for (const field of required) {
    if (!config[field as keyof ClientConfig]) {
      throw new Error(`Missing required configuration: ${field} for client ${config.CLIENT_ID}`)
    }
  }
}
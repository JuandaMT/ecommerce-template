import React from 'react'
import { clientConfig } from '../../../config/client.config'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">{clientConfig.branding.companyName}</h3>
          {clientConfig.branding.tagline && (
            <p className="text-gray-400 mb-4">{clientConfig.branding.tagline}</p>
          )}
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {clientConfig.branding.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
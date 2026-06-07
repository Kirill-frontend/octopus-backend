import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { ServicePages } from './collections/ServicePages'
import { FormSubmissions } from './collections/FormSubmissions'
import { Media } from './collections/Media'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { FaqPage } from './globals/FaqPage'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { HomePage } from './globals/HomePage'
import { ServicesPage } from './globals/ServicesPage'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
    cors: ['https://octopusgr.com', 'https://admin.octopusgr.com'],
    csrf: [
      'https://octopusgr.com', 'https://admin.octopusgr.com'
    ],
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  collections: [Users, Media, ServicePages, FormSubmissions],
  globals: [SiteSettings, Header, Footer, HomePage, AboutPage, ServicesPage, ContactPage, FaqPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})

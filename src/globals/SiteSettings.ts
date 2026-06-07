import type { GlobalConfig } from 'payload'

import { siteSettingsSeoFields } from '@/fields/seo'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
    description: 'Site-wide branding, favicon assets, and default SEO values.',
  },
  fields: siteSettingsSeoFields,
}

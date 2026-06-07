import type { GlobalConfig } from 'payload'

import { buildLinkFields } from '@/fields/linkFields'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
    description: 'Editable header navigation and CTA.',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mobileLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'ctaUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: buildLinkFields(),
    },
  ],
}

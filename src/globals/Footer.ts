import type { GlobalConfig } from 'payload'

import { buildLinkFields } from '@/fields/linkFields'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
    description: 'Footer logo, newsletter settings, and navigation links.',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'newsletterTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'newsletterText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'newsletterFormEnabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'mainLinks',
      type: 'array',
      fields: buildLinkFields(),
    },
    {
      name: 'utilityLinks',
      type: 'array',
      fields: buildLinkFields(),
    },
    {
      name: 'copyrightText',
      type: 'text',
      required: true,
    },
  ],
}

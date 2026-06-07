import type { Field } from 'payload'

import { pageReferenceOptions } from '@/constants/pageReferences'

export const buildLinkFields = (): Field[] => [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'type',
    type: 'select',
    required: true,
    defaultValue: 'pageRef',
    options: [
      { label: 'Custom URL', value: 'custom' },
      { label: 'Service Page', value: 'servicePage' },
      { label: 'Site Page', value: 'pageRef' },
    ],
  },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
        placeholder: '/contact or https://example.com',
      },
      validate: (value: unknown, { siblingData }: { siblingData?: { type?: string } }) => {
        if (siblingData?.type === 'custom' && !value) {
          return 'URL is required for custom links.'
        }

      return true
    },
  },
  {
    name: 'servicePage',
    type: 'relationship',
    relationTo: 'servicePages',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'servicePage',
    },
    validate: (value: unknown, { siblingData }: { siblingData?: { type?: string } }) => {
      if (siblingData?.type === 'servicePage' && !value) {
        return 'Choose a service page.'
      }

      return true
    },
  },
  {
    name: 'pageRef',
    type: 'select',
    options: [...pageReferenceOptions],
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'pageRef',
    },
    validate: (value: unknown, { siblingData }: { siblingData?: { type?: string } }) => {
      if (siblingData?.type === 'pageRef' && !value) {
        return 'Choose a site page.'
      }

      return true
    },
  },
  {
    name: 'newTab',
    type: 'checkbox',
    defaultValue: false,
  },
]

import type { GlobalConfig } from 'payload'

import { buildLinkFields } from '@/fields/linkFields'
import { seoField } from '@/fields/seo'

const uploadWithFallbackFields = (
  baseName: string,
  baseLabel: string,
) => [
  {
    name: baseName,
    type: 'upload' as const,
    relationTo: 'media' as const,
  },
  {
    name: `${baseName}Url`,
    type: 'text' as const,
    admin: {
      description: `${baseLabel} URL fallback from the current frontend implementation.`,
    },
  },
  {
    name: `${baseName}Alt`,
    type: 'text' as const,
  },
]

export const ServicesPage: GlobalConfig = {
  slug: 'servicesPage',
  label: 'Services Page',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Structured content for the Services overview page.',
    group: 'Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'lead',
              type: 'textarea',
            },
            {
              name: 'content',
              type: 'richText',
            },
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
            {
              name: 'valuesGrid',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'text', type: 'textarea', required: true },
                  ],
                },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'button',
                  type: 'group',
                  fields: buildLinkFields(),
                },
                { name: 'showArrow', type: 'checkbox', defaultValue: false },
                {
                  name: 'variant',
                  type: 'select',
                  defaultValue: 'service',
                  options: ['default', 'service'],
                },
                ...uploadWithFallbackFields('image', 'CTA image'),
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
  ],
}

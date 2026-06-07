import type { Field, GlobalConfig } from 'payload'

import { seoField } from '@/fields/seo'

type PageGlobalFactoryArgs = {
  description: string
  extraFields?: Field[]
  label: string
  slug: string
}

export const createStructuredPageGlobal = ({
  description,
  extraFields = [],
  label,
  slug,
}: PageGlobalFactoryArgs): GlobalConfig => ({
  slug,
  label,
  access: {
    read: () => true,
  },
  admin: {
    description,
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
            ...extraFields,
          ],
        },
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
  ],
})

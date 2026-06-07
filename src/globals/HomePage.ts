import type { GlobalConfig } from 'payload'

import { featuredServicePositionOptions } from '@/constants/pageReferences'
import { seoField } from '@/fields/seo'

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  label: 'Home Page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pages',
    description: 'Homepage hero and featured service positioning.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'featuredServices',
              type: 'array',
              maxRows: 7,
              validate: (value) => {
                if (!Array.isArray(value)) {
                  return true
                }

                const positions = value
                  .map((item: unknown) => (item as { position?: string } | null)?.position)
                  .filter((position): position is string => Boolean(position))

                if (new Set(positions).size !== positions.length) {
                  return 'Featured service positions must be unique.'
                }

                return true
              },
              fields: [
                {
                  name: 'service',
                  type: 'relationship',
                  relationTo: 'servicePages',
                  required: true,
                  filterOptions: {
                    showInHomepagePicker: {
                      equals: true,
                    },
                  },
                },
                {
                  name: 'position',
                  type: 'select',
                  required: true,
                  options: [...featuredServicePositionOptions],
                },
                {
                  name: 'customLabel',
                  type: 'text',
                },
                {
                  name: 'isVisible',
                  type: 'checkbox',
                  defaultValue: true,
                },
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

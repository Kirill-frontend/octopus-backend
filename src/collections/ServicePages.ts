import type { CollectionConfig } from 'payload'

import { servicePageBlocks } from '@/blocks/servicePageBlocks'
import { seoField } from '@/fields/seo'
import { slugify } from '@/lib/slugify'

export const ServicePages: CollectionConfig = {
  slug: 'servicePages',
  labels: {
    singular: 'Service Page',
    plural: 'Service Pages',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder', 'updatedAt'],
    group: 'Content',
    description: 'Reusable service landing pages assembled from blocks.',
  },
  defaultSort: 'sortOrder',
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          return {
            ...data,
            slug: slugify(String(data.title)),
          }
        }

        return data
      },
    ],
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
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: {
                description: 'Used for the public route, for example /services/engineering-solutions.',
              },
            },
            {
              name: 'shortLabel',
              type: 'text',
            },
            {
              name: 'excerpt',
              type: 'textarea',
            },
            {
              name: 'cardLabel',
              type: 'text',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'listingImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'showInHomepagePicker',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'showInServicesPage',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Blocks',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: servicePageBlocks,
              required: true,
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoField],
        },
        {
          label: 'Publishing',
          fields: [
            {
              name: 'sortOrder',
              type: 'number',
              admin: {
                description: 'Controls service listing order.',
              },
            },
          ],
        },
      ],
    },
  ],
}

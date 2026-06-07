import type { Field, GlobalConfig } from 'payload'

import { buildLinkFields } from '@/fields/linkFields'
import { seoField } from '@/fields/seo'

const uploadWithFallbackFields = (
  baseName: string,
  baseLabel: string,
): Field[] => [
  {
    name: baseName,
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: `${baseName}Url`,
    type: 'text',
    admin: {
      description: `${baseLabel} URL fallback from the current frontend implementation.`,
    },
  },
  {
    name: `${baseName}Alt`,
    type: 'text',
  },
]

export const AboutPage: GlobalConfig = {
  slug: 'aboutPage',
  label: 'About Page',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Structured content for the About page.',
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
                {
                  name: 'eyebrow',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'primaryAction',
                  type: 'group',
                  fields: buildLinkFields(),
                },
                {
                  name: 'secondaryAction',
                  type: 'group',
                  fields: buildLinkFields(),
                },
                ...uploadWithFallbackFields('image', 'Hero image'),
                {
                  name: 'stats',
                  type: 'array',
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'aboutStory',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'body',
                  type: 'richText',
                  required: true,
                },
                {
                  name: 'cta',
                  type: 'group',
                  fields: buildLinkFields(),
                },
                ...uploadWithFallbackFields('image', 'Story image'),
              ],
            },
            {
              name: 'values',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'introText',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                    ...uploadWithFallbackFields('icon', 'Value icon'),
                  ],
                },
              ],
            },
            {
              name: 'office',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                },
                ...uploadWithFallbackFields('image', 'Office image'),
                {
                  name: 'details',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'link',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'visitLink',
                  type: 'group',
                  fields: buildLinkFields(),
                },
              ],
            },
            {
              name: 'team',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'members',
                  type: 'array',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'role',
                      type: 'text',
                      required: true,
                    },
                    ...uploadWithFallbackFields('image', 'Team member image'),
                  ],
                },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'button',
                  type: 'group',
                  fields: buildLinkFields(),
                },
                {
                  name: 'showArrow',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'variant',
                  type: 'select',
                  defaultValue: 'default',
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

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

export const ContactPage: GlobalConfig = {
  slug: 'contactPage',
  label: 'Contact Page',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Structured content and details for the Contact page.',
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
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'contactMethods',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'value', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                    {
                      name: 'icon',
                      type: 'select',
                      required: true,
                      options: ['email', 'phone'],
                    },
                  ],
                },
                {
                  name: 'form',
                  type: 'group',
                  fields: [
                    { name: 'namePlaceholder', type: 'text', required: true },
                    { name: 'emailPlaceholder', type: 'text', required: true },
                    { name: 'phonePlaceholder', type: 'text', required: true },
                    { name: 'subjectPlaceholder', type: 'text', required: true },
                    { name: 'messagePlaceholder', type: 'text', required: true },
                    { name: 'submitLabel', type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              name: 'office',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
                ...uploadWithFallbackFields('image', 'Office image'),
                {
                  name: 'details',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'value', type: 'text', required: true },
                    { name: 'link', type: 'text' },
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
              name: 'partners',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
                {
                  name: 'logos',
                  type: 'array',
                  fields: [
                    ...uploadWithFallbackFields('image', 'Partner logo'),
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
                { name: 'showArrow', type: 'checkbox', defaultValue: true },
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

import type { Field, GroupField } from 'payload'

export const seoField: GroupField = {
  name: 'seo',
  type: 'group',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
    },
    {
      name: 'canonicalUrl',
      type: 'text',
    },
    {
      name: 'robots',
      type: 'text',
    },
    {
      name: 'ogTitle',
      type: 'text',
    },
    {
      name: 'ogDescription',
      type: 'textarea',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'faviconSvgOverride',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'faviconIcoOverride',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'appleTouchIconOverride',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export const siteSettingsSeoFields: Field[] = [
  {
    name: 'siteName',
    type: 'text',
    required: true,
  },
  {
    name: 'siteUrl',
    type: 'text',
    required: true,
  },
  {
    name: 'defaultTitle',
    type: 'text',
    required: true,
  },
  {
    name: 'titleTemplate',
    type: 'text',
    required: true,
  },
  {
    name: 'defaultDescription',
    type: 'textarea',
    required: true,
  },
  {
    name: 'defaultRobots',
    type: 'text',
    defaultValue: 'index,follow',
  },
  {
    name: 'themeColor',
    type: 'text',
    defaultValue: '#0E3B5B',
  },
  {
    name: 'locale',
    type: 'text',
    defaultValue: 'en',
  },
  {
    name: 'faviconSvg',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'faviconIco',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'appleTouchIcon',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'defaultOgImage',
    type: 'upload',
    relationTo: 'media',
  },
]

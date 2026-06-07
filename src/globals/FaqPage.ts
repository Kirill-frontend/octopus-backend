import { createStructuredPageGlobal } from '@/fields/pageContent'

export const FaqPage = createStructuredPageGlobal({
  slug: 'faqPage',
  label: 'FAQ Page',
  description: 'Structured FAQ content.',
  extraFields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
})

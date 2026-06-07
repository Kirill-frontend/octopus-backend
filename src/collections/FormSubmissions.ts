import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'formSubmissions',
  labels: {
    singular: 'Form Submission',
    plural: 'Form Submissions',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'subject', 'submissionType', 'createdAt'],
    group: 'Operations',
    description: 'Optional storage for contact and request form entries.',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'subject', type: 'text' },
    {
      name: 'submissionType',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: ['contact', 'quote-request', 'callback-request'],
    },
    {
      name: 'servicePage',
      type: 'relationship',
      relationTo: 'servicePages',
    },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: ['new', 'in-progress', 'closed'],
    },
  ],
}

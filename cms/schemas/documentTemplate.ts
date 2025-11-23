import { SchemaDefinition } from './types';

export const documentTemplateSchema: SchemaDefinition = {
  name: 'documentTemplate',
  type: 'document',
  title: 'Document Template',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Legal Assistance', value: 'assistance' },
          { title: 'Appeal or Remedy', value: 'appeal' },
          { title: 'Complaint', value: 'complaint' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'body', title: 'Body', type: 'text' }
  ]
};

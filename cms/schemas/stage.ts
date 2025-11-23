import { SchemaDefinition } from './types';

export const stageSchema: SchemaDefinition = {
  name: 'stage',
  type: 'document',
  title: 'Jalur Perkara Stage',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'order', title: 'Order', type: 'number' },
    { name: 'summary', title: 'Summary', type: 'text' },
    { name: 'actions', title: 'Immediate Actions', type: 'array', of: [{ type: 'string' }] },
    { name: 'tip', title: 'Practical Tip', type: 'text' },
    {
      name: 'rights',
      title: 'Key Rights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'relatedRights',
              title: 'Related Rights',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'right' }] }]
            }
          ]
        }
      ]
    }
  ]
};

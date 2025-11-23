import { SchemaDefinition } from './types';

export const rightSchema: SchemaDefinition = {
  name: 'right',
  type: 'document',
  title: 'Legal Right',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    {
      name: 'audience',
      title: 'Audience',
      type: 'string',
      options: {
        list: [
          { title: 'Suspect', value: 'suspect' },
          { title: 'Victim', value: 'victim' },
          { title: 'Witness', value: 'witness' },
          { title: 'General', value: 'general' },
          { title: 'Vulnerable Group', value: 'vulnerable' }
        ]
      }
    },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'sources', title: 'Legal Sources', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'stageReferences',
      title: 'Referenced Stages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'stage' }] }]
    }
  ]
};

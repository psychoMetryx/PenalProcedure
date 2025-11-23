import { SchemaDefinition } from './types';

export const glossaryTermSchema: SchemaDefinition = {
  name: 'glossaryTerm',
  type: 'document',
  title: 'Glossary Term',
  fields: [
    { name: 'term', title: 'Term', type: 'string' },
    { name: 'definition', title: 'Definition', type: 'text' },
    {
      name: 'relatedStages',
      title: 'Related Stages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'stage' }] }]
    },
    {
      name: 'relatedRights',
      title: 'Related Rights',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'right' }] }]
    }
  ]
};

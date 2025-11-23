import { documentTemplateSchema } from './documentTemplate';
import { glossaryTermSchema } from './glossaryTerm';
import { rightSchema } from './right';
import { stageSchema } from './stage';
import { SchemaDefinition } from './types';

export const schemas: SchemaDefinition[] = [stageSchema, rightSchema, glossaryTermSchema, documentTemplateSchema];

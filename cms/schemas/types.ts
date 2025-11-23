export type SchemaDefinition = {
  name: string;
  type: 'document';
  title: string;
  fields: Array<Record<string, unknown>>;
};

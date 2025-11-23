export type Reference = {
  _ref: string;
  _type: 'reference';
};

export type Slug = {
  current: string;
  _type: 'slug';
};

export type StageRight = {
  title: string;
  description: string;
  relatedRights?: Reference[];
};

export type Stage = {
  _id?: string;
  title: string;
  slug?: Slug;
  order?: number;
  summary?: string;
  actions?: string[];
  rights?: StageRight[];
  tip?: string;
};

export type Right = {
  _id?: string;
  title: string;
  slug?: Slug;
  audience: 'suspect' | 'victim' | 'witness' | 'general' | 'vulnerable';
  description: string;
  sources?: string[];
  stageReferences?: Reference[];
};

export type GlossaryTerm = {
  _id?: string;
  term: string;
  definition: string;
  relatedStages?: Reference[];
  relatedRights?: Reference[];
};

export type DocumentTemplate = {
  _id?: string;
  title: string;
  slug?: Slug;
  category: 'assistance' | 'appeal' | 'complaint' | 'other';
  description?: string;
  body: string;
};

export type SearchableContent = Stage | Right | GlossaryTerm | DocumentTemplate;

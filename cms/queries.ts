export const STAGES_QUERY = `*[_type == "stage"]|order(order asc){
  _id,
  title,
  slug,
  order,
  summary,
  actions,
  rights[]{title, description, relatedRights}
}`;

export const RIGHTS_QUERY = `*[_type == "right"]{
  _id,
  title,
  slug,
  audience,
  description,
  sources,
  stageReferences
}`;

export const GLOSSARY_QUERY = `*[_type == "glossaryTerm"]|order(term asc){
  _id,
  term,
  definition,
  relatedStages,
  relatedRights
}`;

export const TEMPLATES_QUERY = `*[_type == "documentTemplate"]{
  _id,
  title,
  slug,
  category,
  description,
  body
}`;

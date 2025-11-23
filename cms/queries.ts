export const STAGES_QUERY = `*[_type == "stage"]|order(order asc){
  _id,
  title,
  slug,
  order,
  summary,
  actions,
  tip,
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

export const EVIDENCE_ITEMS_QUERY = `*[_type == "evidenceItem"]|order(_createdAt asc){
  _id,
  "id": coalesce(id, _id),
  title,
  type,
  accepted,
  basis,
  detail,
  pasal,
  citationUrl
}`;

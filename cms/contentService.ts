import { fetchFromSanity } from './config';
import { GLOSSARY_QUERY, RIGHTS_QUERY, STAGES_QUERY, TEMPLATES_QUERY } from './queries';
import { DocumentTemplate, GlossaryTerm, Right, Stage } from './types';

export async function getStages(): Promise<Stage[]> {
  return fetchFromSanity<Stage[]>(STAGES_QUERY);
}

export async function getRights(): Promise<Right[]> {
  return fetchFromSanity<Right[]>(RIGHTS_QUERY);
}

export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  return fetchFromSanity<GlossaryTerm[]>(GLOSSARY_QUERY);
}

export async function getDocumentTemplates(): Promise<DocumentTemplate[]> {
  return fetchFromSanity<DocumentTemplate[]>(TEMPLATES_QUERY);
}

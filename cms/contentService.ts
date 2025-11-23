import { fetchFromSanity } from './config';
import { cache, cachePaths } from './cache';
import { GLOSSARY_QUERY, RIGHTS_QUERY, STAGES_QUERY, TEMPLATES_QUERY } from './queries';
import { DocumentTemplate, GlossaryTerm, Right, Stage } from './types';

export async function getStages(): Promise<Stage[]> {
  try {
    const stages = await fetchFromSanity<Stage[]>(STAGES_QUERY);
    await cache.write(cachePaths.stages, stages);
    return stages;
  } catch (error) {
    const cachedStages = await cache.read<Stage[]>(cachePaths.stages);

    if (cachedStages?.length) {
      console.warn('Falling back to cached stages payload');
      return cachedStages;
    }

    throw error;
  }
}

export async function getRights(): Promise<Right[]> {
  try {
    const rights = await fetchFromSanity<Right[]>(RIGHTS_QUERY);
    await cache.write(cachePaths.rights, rights);
    return rights;
  } catch (error) {
    const cachedRights = await cache.read<Right[]>(cachePaths.rights);

    if (cachedRights?.length) {
      console.warn('Falling back to cached rights payload');
      return cachedRights;
    }

    throw error;
  }
}

export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  return fetchFromSanity<GlossaryTerm[]>(GLOSSARY_QUERY);
}

export async function getDocumentTemplates(): Promise<DocumentTemplate[]> {
  return fetchFromSanity<DocumentTemplate[]>(TEMPLATES_QUERY);
}

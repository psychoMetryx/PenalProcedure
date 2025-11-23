import { fetchFromSanity, sanityConfig } from './config';
import { EVIDENCE_ITEMS_QUERY } from './queries';
import { evidenceItems as fallbackEvidence, ensureEvidenceHasCitation } from './legalConstants';
import { EvidenceItem } from './types';

const isSanityConfigured = Boolean(sanityConfig.projectId && sanityConfig.dataset);

export async function loadEvidenceItems(): Promise<EvidenceItem[]> {
  if (!isSanityConfigured) {
    return ensureEvidenceHasCitation(fallbackEvidence);
  }

  try {
    const items = await fetchFromSanity<EvidenceItem[]>(EVIDENCE_ITEMS_QUERY);
    const validated = ensureEvidenceHasCitation(items);

    if (validated.length) {
      return validated;
    }
  } catch (error) {
    console.warn('Falling back to bundled evidence items', error);
  }

  return ensureEvidenceHasCitation(fallbackEvidence);
}

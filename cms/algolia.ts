import { DocumentTemplate, GlossaryTerm, Right, Stage } from './types';

export type AlgoliaConfig = {
  appId: string;
  adminApiKey: string;
  indexName: string;
};

export type AlgoliaRecord = (
  | Stage
  | Right
  | GlossaryTerm
  | DocumentTemplate
) & { objectID: string; contentType: 'stage' | 'right' | 'glossary' | 'template' };

const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, ALGOLIA_INDEX_NAME } = process.env;

export const algoliaConfig: AlgoliaConfig = {
  appId: ALGOLIA_APP_ID ?? '',
  adminApiKey: ALGOLIA_ADMIN_API_KEY ?? '',
  indexName: ALGOLIA_INDEX_NAME ?? 'pahamkuhap-content'
};

const ensureAlgoliaConfig = () => {
  if (!algoliaConfig.appId || !algoliaConfig.adminApiKey) {
    throw new Error('Missing Algolia configuration. Set ALGOLIA_APP_ID and ALGOLIA_ADMIN_API_KEY.');
  }
};

export async function sendRecordsToAlgolia(records: AlgoliaRecord[]): Promise<void> {
  ensureAlgoliaConfig();

  const endpoint = `https://${algoliaConfig.appId}.algolia.net/1/indexes/${algoliaConfig.indexName}/batch`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Algolia-API-Key': algoliaConfig.adminApiKey,
      'X-Algolia-Application-Id': algoliaConfig.appId
    },
    body: JSON.stringify({
      requests: records.map((record) => ({
        action: 'addObject',
        body: record
      }))
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to push records to Algolia: ${response.status} ${message}`);
  }
}

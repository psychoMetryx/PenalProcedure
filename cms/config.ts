export type SanityConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
  useCdn: boolean;
};

const defaultApiVersion = '2024-01-01';

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION, SANITY_READ_TOKEN } = process.env;

export const sanityConfig: SanityConfig = {
  projectId: SANITY_PROJECT_ID ?? '',
  dataset: SANITY_DATASET ?? '',
  apiVersion: SANITY_API_VERSION ?? defaultApiVersion,
  token: SANITY_READ_TOKEN,
  useCdn: !SANITY_READ_TOKEN
};

const ensureConfig = () => {
  if (!sanityConfig.projectId || !sanityConfig.dataset) {
    throw new Error(
      'Missing Sanity configuration. Please set SANITY_PROJECT_ID and SANITY_DATASET environment variables.'
    );
  }
};

const buildSanityUrl = (query: string) => {
  const base = sanityConfig.useCdn ? 'apicdn' : 'api';
  return `https://${sanityConfig.projectId}.${base}.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`;
};

export async function fetchFromSanity<T>(query: string): Promise<T> {
  ensureConfig();
  const url = buildSanityUrl(query);
  const response = await fetch(url, {
    headers: sanityConfig.token
      ? {
          Authorization: `Bearer ${sanityConfig.token}`
        }
      : undefined
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Sanity data: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as { result: T };
  return payload.result;
}

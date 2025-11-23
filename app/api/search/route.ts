import { NextResponse } from 'next/server';

type ContentType = 'stage' | 'right' | 'glossary' | 'template';

type AlgoliaHit = {
  objectID: string;
  contentType: ContentType;
  title?: string;
  term?: string;
  summary?: string;
  description?: string;
  definition?: string;
  body?: string;
  audience?: 'suspect' | 'victim' | 'witness' | 'general';
  slug?: { current?: string };
};

type AlgoliaResponse = {
  hits: AlgoliaHit[];
};

const { ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY, ALGOLIA_INDEX_NAME } = process.env;
const indexName = ALGOLIA_INDEX_NAME || 'pahamkuhap-content';

export async function POST(request: Request) {
  if (!ALGOLIA_APP_ID || !ALGOLIA_SEARCH_API_KEY) {
    return NextResponse.json(
      { error: 'Konfigurasi Algolia tidak lengkap. Tambahkan kredensial di environment.' },
      { status: 500 }
    );
  }

  let payload: { query?: unknown } = {};
  try {
    payload = await request.json();
  } catch (error) {
    console.error('Invalid search request payload', error);
    return NextResponse.json({ hits: [] });
  }

  const { query } = payload;
  if (!query || typeof query !== 'string') {
    return NextResponse.json({ hits: [] });
  }

  const endpoint = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${indexName}/query`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Algolia-API-Key': ALGOLIA_SEARCH_API_KEY!,
        'X-Algolia-Application-Id': ALGOLIA_APP_ID
      },
      body: JSON.stringify({ query, hitsPerPage: 12 })
    });

    const data: AlgoliaResponse = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Pencarian Algolia gagal dijalankan.', hits: [] },
        { status: response.status }
      );
    }

    const hits = (data.hits || []).map((hit) => ({
      objectID: hit.objectID,
      contentType: hit.contentType,
      title: hit.title,
      term: hit.term,
      summary: hit.summary,
      description: hit.description,
      definition: hit.definition,
      body: hit.body,
      audience: hit.audience,
      slug: hit.slug
    }));

    return NextResponse.json({ hits });
  } catch (error) {
    console.error('Algolia search failed', error);
    return NextResponse.json({ error: 'Pencarian tidak tersedia saat ini.', hits: [] }, { status: 500 });
  }
}

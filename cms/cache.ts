import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');

async function readCachedPayload<T>(fileName: string): Promise<T | null> {
  const cachePath = path.join(DATA_DIR, fileName);

  try {
    const content = await readFile(cachePath, 'utf8');
    return JSON.parse(content) as T;
  } catch (error) {
    return null;
  }
}

async function persistCachedPayload<T>(fileName: string, payload: T) {
  const cachePath = path.join(DATA_DIR, fileName);

  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(cachePath, JSON.stringify(payload, null, 2), 'utf8');
  } catch (error) {
    console.error(`Failed to persist cached payload for ${fileName}`, error);
  }
}

export const cachePaths = {
  rights: 'rights.json',
  stages: 'stages.json'
};

export const cache = {
  read: readCachedPayload,
  write: persistCachedPayload
};

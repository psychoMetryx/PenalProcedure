import { sendRecordsToAlgolia } from '../cms/algolia';
import { getDocumentTemplates, getGlossaryTerms, getRights, getStages } from '../cms/contentService';
import { AlgoliaRecord } from '../cms/algolia';

const buildRecords = async (): Promise<AlgoliaRecord[]> => {
  const [stages, rights, glossaryTerms, templates] = await Promise.all([
    getStages(),
    getRights(),
    getGlossaryTerms(),
    getDocumentTemplates()
  ]);

  const stageRecords: AlgoliaRecord[] = stages.map((stage) => ({
    ...stage,
    objectID: stage._id ?? stage.slug?.current ?? stage.title,
    contentType: 'stage'
  }));

  const rightRecords: AlgoliaRecord[] = rights.map((right) => ({
    ...right,
    objectID: right._id ?? right.slug?.current ?? right.title,
    contentType: 'right'
  }));

  const glossaryRecords: AlgoliaRecord[] = glossaryTerms.map((term) => ({
    ...term,
    objectID: term._id ?? term.term,
    contentType: 'glossary'
  }));

  const templateRecords: AlgoliaRecord[] = templates.map((template) => ({
    ...template,
    objectID: template._id ?? template.slug?.current ?? template.title,
    contentType: 'template'
  }));

  return [...stageRecords, ...rightRecords, ...glossaryRecords, ...templateRecords];
};

const run = async () => {
  const records = await buildRecords();
  await sendRecordsToAlgolia(records);
  console.log(`Indexed ${records.length} records to Algolia index.`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

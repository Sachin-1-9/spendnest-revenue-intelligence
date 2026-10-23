import fs from 'fs';
import path from 'path';

// Helper paths
const initialPath = path.resolve('data/data/01_initial.json');
const updatePath = path.resolve('data/data/02_update.json');

console.log('====================================================');
console.log('  SPENDNEST REVENUE INTELLIGENCE INBOX REPLAY TEST  ');
console.log('====================================================\n');

// 1. Verify files exist
if (!fs.existsSync(initialPath) || !fs.existsSync(updatePath)) {
  console.error('ERROR: Required JSON data files not found at expected paths.');
  process.exit(1);
}

const rawInitial = JSON.parse(fs.readFileSync(initialPath, 'utf8'));
const rawUpdate = JSON.parse(fs.readFileSync(updatePath, 'utf8'));

console.log(`[PASS] Loaded raw deliveries:`);
console.log(`       - Initial: batch_id=${rawInitial.batch_id}, revision=${rawInitial.revision}, records=${rawInitial.records.length}`);
console.log(`       - Update:  batch_id=${rawUpdate.batch_id}, revision=${rawUpdate.revision}, records=${rawUpdate.records.length}\n`);

// Ingestion state store
const store = new Map();

function makeKey(sourceType, sourceId) {
  return `${sourceType}:${sourceId}`;
}

function hasUsableTranscript(record) {
  if (record.source_type === 'call') {
    return Boolean(record.payload?.transcript && record.payload.transcript.trim());
  } else {
    return Boolean(record.transcript_payload?.turns && record.transcript_payload.turns.length > 0);
  }
}

// Ingestion function
function ingestBatch(batch) {
  let added = 0;
  let updated = 0;
  let ignored = 0;

  for (const rec of batch.records) {
    const key = makeKey(rec.source_type, rec.source_id);
    const existing = store.get(key);

    if (!existing) {
      store.set(key, {
        source_record: rec,
        applied_revision: batch.revision,
        manual_route: null,
        manual_route_reason: null,
        is_manually_overridden: false,
        review_status: hasUsableTranscript(rec) ? 'automated' : 'uncaptured'
      });
      added++;
    } else if (batch.revision > existing.applied_revision) {
      const isManual = existing.is_manually_overridden;
      store.set(key, {
        source_record: rec,
        applied_revision: batch.revision,
        manual_route: existing.manual_route,
        manual_route_reason: existing.manual_route_reason,
        is_manually_overridden: isManual,
        review_status: isManual ? 'needs_review' : (hasUsableTranscript(rec) ? 'automated' : 'uncaptured')
      });
      updated++;
    } else {
      ignored++;
    }
  }

  return { added, updated, ignored };
}

// TEST 1: Initial Ingestion
console.log('TEST 1: Ingesting Initial Batch (01_initial.json)...');
const res1 = ingestBatch(rawInitial);
console.log(`        Added: ${res1.added}, Updated: ${res1.updated}, Ignored: ${res1.ignored}`);
if (store.size !== 44) {
  console.error(`[FAIL] Expected 44 records, got ${store.size}`);
  process.exit(1);
}
const initialUsable = Array.from(store.values()).filter(r => hasUsableTranscript(r.source_record)).length;
if (initialUsable !== 17) {
  console.error(`[FAIL] Expected 17 usable transcripts initially, got ${initialUsable}`);
  process.exit(1);
}
console.log(`[PASS] Store has 44 unique records and exactly 17 usable transcripts.\n`);

// TEST 2: Duplicate Ingestion Test (Idempotency)
console.log('TEST 2: Repeating Initial Batch Import (Deduplication Check)...');
const res2 = ingestBatch(rawInitial);
console.log(`        Added: ${res2.added}, Updated: ${res2.updated}, Ignored: ${res2.ignored}`);
if (res2.ignored !== 44 || store.size !== 44) {
  console.error(`[FAIL] Duplicate import failed idempotency check! Store size=${store.size}, ignored=${res2.ignored}`);
  process.exit(1);
}
console.log(`[PASS] Zero records duplicated; 44 duplicates safely ignored.\n`);

// TEST 3: Manual Route Override
console.log('TEST 3: Applying Manual Route Override on M07...');
const m07Key = makeKey('meeting', '4f304fff-fd40-5cfc-a366-0a134c445c2a');
const m07 = store.get(m07Key);
if (!m07) {
  console.error('[FAIL] M07 record not found in store!');
  process.exit(1);
}
m07.manual_route = 'deal_next_steps';
m07.manual_route_reason = 'Manager manual pipeline review';
m07.is_manually_overridden = true;
m07.review_status = 'manually_overridden';
console.log(`[PASS] M07 manual route set to '${m07.manual_route}' with override flag=true.\n`);

// TEST 4: Late Transcript Update Batch
console.log('TEST 4: Ingesting Update Batch (02_update.json)...');
const res4 = ingestBatch(rawUpdate);
console.log(`        Added: ${res4.added}, Updated: ${res4.updated}, Ignored: ${res4.ignored}`);
if (store.size !== 44) {
  console.error(`[FAIL] Record count changed after update! Count=${store.size}`);
  process.exit(1);
}
const m07AfterUpdate = store.get(m07Key);
if (m07AfterUpdate.applied_revision !== 2) {
  console.error(`[FAIL] M07 revision not updated to 2! Got ${m07AfterUpdate.applied_revision}`);
  process.exit(1);
}
const m07Turns = m07AfterUpdate.source_record.transcript_payload?.turns?.length || 0;
if (m07Turns !== 27) {
  console.error(`[FAIL] Expected 27 transcript turns for M07 after update, got ${m07Turns}`);
  process.exit(1);
}
if (!m07AfterUpdate.is_manually_overridden || m07AfterUpdate.manual_route !== 'deal_next_steps') {
  console.error(`[FAIL] CRITICAL: Manual route override was ERASED or modified! Route=${m07AfterUpdate.manual_route}`);
  process.exit(1);
}
const updatedUsable = Array.from(store.values()).filter(r => hasUsableTranscript(r.source_record)).length;
if (updatedUsable !== 18) {
  console.error(`[FAIL] Expected 18 usable transcripts post-update, got ${updatedUsable}`);
  process.exit(1);
}
console.log(`[PASS] M07 updated to revision 2 with 27 turns.`);
console.log(`[PASS] Manual route 'deal_next_steps' was strictly PRESERVED!`);
console.log(`[PASS] Usable transcript coverage increased to 18 / 44 (40.91%).\n`);

// TEST 5: Re-import Initial Batch After Update
console.log('TEST 5: Re-importing Initial Batch After Update (Revision Rejection Check)...');
const res5 = ingestBatch(rawInitial);
console.log(`        Added: ${res5.added}, Updated: ${res5.updated}, Ignored: ${res5.ignored}`);
const m07AfterReimport = store.get(m07Key);
if (m07AfterReimport.applied_revision !== 2 || m07AfterReimport.source_record.transcript_payload?.turns?.length !== 27) {
  console.error(`[FAIL] M07 was downgraded back to revision 1!`);
  process.exit(1);
}
if (m07AfterReimport.manual_route !== 'deal_next_steps') {
  console.error(`[FAIL] Manual route was corrupted on re-import!`);
  process.exit(1);
}
console.log(`[PASS] Older revision 1 was rejected for M07. Revision 2 and manual route remained active.\n`);

console.log('====================================================');
console.log('  ALL 5 REPLAY ACCEPTANCE TESTS PASSED (100% OK)   ');
console.log('====================================================\n');

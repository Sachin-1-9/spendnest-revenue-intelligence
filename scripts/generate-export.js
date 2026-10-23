import fs from 'fs';
import path from 'path';

const initialPath = path.resolve('data/data/01_initial.json');
const updatePath = path.resolve('data/data/02_update.json');
const exportDir = path.resolve('outputs');

const rawInitial = JSON.parse(fs.readFileSync(initialPath, 'utf8'));
const rawUpdate = JSON.parse(fs.readFileSync(updatePath, 'utf8'));

// Build final post-update state
const store = new Map();
function makeKey(sourceType, sourceId) { return `${sourceType}:${sourceId}`; }

// 1. Initial
for (const rec of rawInitial.records) {
  store.set(makeKey(rec.source_type, rec.source_id), {
    record: rec,
    revision: 1,
    manualRoute: null,
    manualReason: null,
    isManual: false
  });
}

// 2. Set M07 manual override before update
const m07Key = makeKey('meeting', '4f304fff-fd40-5cfc-a366-0a134c445c2a');
const m07Entry = store.get(m07Key);
if (m07Entry) {
  m07Entry.manualRoute = 'customer_success';
  m07Entry.manualReason = 'Customer technical support and bug walkthrough';
  m07Entry.isManual = true;
}

// 3. Update
for (const rec of rawUpdate.records) {
  const existing = store.get(makeKey(rec.source_type, rec.source_id));
  if (existing && 2 > existing.revision) {
    store.set(makeKey(rec.source_type, rec.source_id), {
      record: rec,
      revision: 2,
      manualRoute: existing.manualRoute,
      manualReason: existing.manualReason,
      isManual: existing.isManual
    });
  }
}

// Route classification map
const routeMap = {
  C01: { route: 'sales_coaching', rationale: 'Strong cold call pushback; rep persisted after refusal.' },
  C02: { route: 'deal_next_steps', rationale: 'Receptionist transfer to voicemail; requires callback.' },
  C03: { route: 'deal_next_steps', rationale: 'Developer API access follow-up; email recap with pricing requested.' },
  C04: { route: 'deal_next_steps', rationale: 'Voicemail follow-up after sending proposal to corrected email address.' },
  C05: { route: 'deal_next_steps', rationale: 'Incumbent competitor (StoreHarbor) in place; collateral requested.' },
  C06: { route: 'sales_coaching', rationale: '120+ store retail prospect qualifies out; full internal ERP in place.' },
  C07: { route: 'partnerships', rationale: 'Overseas incorporation advisory partnership for virtual business accounts.' },
  C08: { route: 'deal_next_steps', rationale: 'Referral to internal people operations stakeholder for proposal.' },
  C09: { route: 'sales_coaching', rationale: 'Lead intelligence captured; strict boundary against using referral name.' },
  C10: { route: 'sales_coaching', rationale: 'Outdated CRM data; contact changed employers and requested messaging-only brief.' },
  M01: { route: 'partnerships', rationale: 'Advisory firm exploring remote bank account opening partnership for clients.' },
  M02: { route: 'customer_success', rationale: 'Technology partner evaluation: SpendNest evaluating LedgerBridge AR capabilities.' },
  M03: { route: 'deal_next_steps', rationale: 'Asterloom Systems CFO review; volume pricing and ROI model requested.' },
  M04: { route: 'onboarding_ops', rationale: 'Cedarwave Distribution implementation migration and dual-run planning.' },
  M06: { route: 'deal_next_steps', rationale: 'Mapletrail Services discovery; credit limit requirements vs prepaid cards.' },
  M07: { route: 'customer_success', rationale: 'Customer software bug: event-payment description edit failing to persist.' },
  M09: { route: 'onboarding_ops', rationale: 'Brookmint Holdings expired invite token and multi-entity permissions setup.' },
  M10: { route: 'customer_success', rationale: 'Customer training session on billing examples, back-office access and invoice matching.' }
};

// Create folders
if (fs.existsSync(exportDir)) {
  fs.rmSync(exportDir, { recursive: true, force: true });
}
fs.mkdirSync(exportDir, { recursive: true });

const manifest = [];

for (const item of store.values()) {
  const rec = item.record;
  const isCall = rec.source_type === 'call';
  const mapping = routeMap[rec.record_ref] || {
    route: 'uncaptured_triage',
    rationale: 'Uncaptured or background interaction without supplied transcript.'
  };

  const activeRoute = item.isManual && item.manualRoute ? item.manualRoute : mapping.route;
  const shortId = rec.source_id.slice(0, 8);
  const routeFolder = path.join(exportDir, activeRoute);
  fs.mkdirSync(routeFolder, { recursive: true });

  const relativePath = `outputs/${activeRoute}/${rec.record_ref}_${shortId}.md`;
  const fullPath = path.join(exportDir, activeRoute, `${rec.record_ref}_${shortId}.md`);

  let doc = `# Dossier: [${rec.record_ref}] ${isCall ? `Call (${rec.payload.rep_name})` : rec.payload.title}\n\n`;
  doc += `- **Source Type:** \`${rec.source_type}\`\n`;
  doc += `- **Source ID:** \`${rec.source_id}\`\n`;
  doc += `- **Applied Delivery Revision:** \`${item.revision}\`\n`;
  doc += `- **Active Assigned Route:** \`${activeRoute}\`\n`;
  doc += `- **Manual Override:** \`${item.isManual ? 'YES' : 'NO'}\`\n`;
  if (item.isManual) {
    doc += `- **Override Reason:** ${item.manualReason}\n`;
  }
  doc += `- **Routing Rationale:** ${mapping.rationale}\n\n`;

  if (isCall) {
    doc += `## Call Transcript\n`;
    doc += rec.payload.transcript 
      ? `\`\`\`\n${rec.payload.transcript}\n\`\`\`\n`
      : `*No speech transcript provided in assessment extract. Stored outcome: \`${rec.payload.observed_outcome}\`, Duration: \`${rec.payload.duration_seconds}s\`.*\n`;
  } else {
    const turns = rec.transcript_payload?.turns || [];
    doc += `## Meeting Transcript (${turns.length} turns)\n`;
    if (turns.length > 0) {
      for (const t of turns) {
        doc += `- **[${t.timecode}] ${t.speaker}:** ${t.text}\n`;
      }
    } else {
      doc += `*No usable transcript. Reason: \`${rec.transcript_payload?.unavailable_reason || rec.payload.recording_status}\`.*\n`;
    }
  }

  fs.writeFileSync(fullPath, doc, 'utf8');

  manifest.push({
    source_type: rec.source_type,
    source_id: rec.source_id,
    record_ref: rec.record_ref,
    applied_source_revision: item.revision,
    routes: [activeRoute],
    output_paths: [relativePath],
    processing_review_state: item.isManual ? 'manually_overridden' : (rec.payload.transcript || rec.transcript_payload?.turns?.length ? 'automated' : 'uncaptured'),
    manual_override_flag: item.isManual,
    analysis_freshness: (rec.payload.transcript || rec.transcript_payload?.turns?.length) ? 'current' : 'uncaptured'
  });
}

// Write manifest.json
fs.writeFileSync(path.join(exportDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

// Write manifest.csv
const csvHeaders = ['source_type', 'source_id', 'record_ref', 'applied_source_revision', 'routes', 'output_paths', 'processing_review_state', 'manual_override_flag', 'analysis_freshness'];
const csvRows = manifest.map(e => [
  e.source_type,
  e.source_id,
  e.record_ref,
  e.applied_source_revision,
  `"${e.routes.join(';')}"`,
  `"${e.output_paths.join(';')}"`,
  e.processing_review_state,
  e.manual_override_flag,
  e.analysis_freshness
]);
fs.writeFileSync(path.join(exportDir, 'manifest.csv'), [csvHeaders.join(','), ...csvRows.map(r => r.join(','))].join('\n'), 'utf8');

console.log(`[PASS] Generated export folder 'outputs/' with ${manifest.length} dossiers, manifest.json, and manifest.csv!`);

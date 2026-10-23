import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ManagedRecordState } from '../types';
import { generateExportManifest } from './dataEngine';
import { MANAGER_BRIEF_2026_08_21 } from '../data/managerBrief';

export async function exportArchiveZip(
  state: Record<string, ManagedRecordState>
): Promise<void> {
  const zip = new JSZip();
  const manifest = generateExportManifest(state);

  // 1. Machine-readable manifest.json
  zip.file('manifest.json', JSON.stringify(manifest, null, 2));

  // 2. Machine-readable manifest.csv
  const csvHeaders = [
    'source_type',
    'source_id',
    'record_ref',
    'applied_source_revision',
    'routes',
    'output_paths',
    'processing_review_state',
    'manual_override_flag',
    'analysis_freshness'
  ];
  const csvRows = manifest.map((entry) => [
    entry.source_type,
    entry.source_id,
    entry.record_ref,
    entry.applied_source_revision,
    `"${entry.routes.join(';')}"`,
    `"${entry.output_paths.join(';')}"`,
    entry.processing_review_state,
    entry.manual_override_flag,
    entry.analysis_freshness
  ]);
  const csvContent = [csvHeaders.join(','), ...csvRows.map((r) => r.join(','))].join('\n');
  zip.file('manifest.csv', csvContent);

  // 3. Manager Daily Brief markdown file
  let briefMd = `# ${MANAGER_BRIEF_2026_08_21.title}\n\n`;
  briefMd += `**Date:** ${MANAGER_BRIEF_2026_08_21.date} (${MANAGER_BRIEF_2026_08_21.timezone})\n\n`;
  briefMd += `## Executive Summary\n${MANAGER_BRIEF_2026_08_21.executive_summary}\n\n`;
  briefMd += `## Key Metrics\n`;
  for (const k of MANAGER_BRIEF_2026_08_21.kpis) {
    briefMd += `- **${k.label}:** ${k.value} *(${k.denominator_note})*\n`;
  }
  briefMd += `\n`;
  for (const s of MANAGER_BRIEF_2026_08_21.sections) {
    briefMd += `## ${s.title} [${s.badge}]\n${s.summary}\n\n`;
    for (const item of s.items) {
      briefMd += `### [${item.record_ref}] ${item.headline} (${item.priority.toUpperCase()})\n`;
      briefMd += `- **Evidence:** ${item.evidence}\n`;
      briefMd += `- **Action & Owner:** ${item.action_owner}\n\n`;
    }
  }
  zip.file('manager_brief_2026-08-21.md', briefMd);

  // 4. Dossier files per route
  const outputsFolder = zip.folder('outputs');

  for (const item of Object.values(state)) {
    const rec = item.source_record;
    const isCall = rec.source_type === 'call';
    const payload: any = rec.payload;
    const title = isCall ? `Call with ${payload.rep_name || 'Rep'}` : payload.title;
    const activeRoute = item.is_manually_overridden && item.manual_route ? item.manual_route : item.analysis.suggested_route;
    const shortId = rec.source_id.slice(0, 8);

    let doc = `# Dossier: ${rec.record_ref} - ${title}\n\n`;
    doc += `**Source Type:** ${rec.source_type}\n`;
    doc += `**Source ID:** \`${rec.source_id}\`\n`;
    doc += `**Applied Revision:** ${item.applied_revision}\n`;
    doc += `**Timestamp:** ${isCall ? payload.started_at : payload.starts_at} (Asia/Kolkata)\n`;
    doc += `**Person:** ${isCall ? `Rep: ${payload.rep_name}` : `Organizer: ${payload.organizer_email}`}\n`;
    doc += `**Active Route:** \`${activeRoute}\`\n`;
    doc += `**Manual Override:** ${item.is_manually_overridden ? `YES (${item.manual_route_reason})` : 'NO'}\n`;
    doc += `**Review State:** \`${item.review_status}\`\n\n`;

    doc += `## Analysis\n`;
    doc += `### What Happened\n${item.analysis.what_happened}\n\n`;
    doc += `### Why It Matters\n${item.analysis.why_it_matters}\n\n`;

    doc += `### Transcript Citations & Evidence\n`;
    for (const c of item.analysis.citations) {
      doc += `> "${c.passage}"\n*(Location: ${c.location}${c.turn_number ? `, Turn ${c.turn_number}` : ''})*\n\n`;
    }

    doc += `### Honest Uncertainty\n`;
    for (const u of item.analysis.honest_uncertainty) {
      doc += `- ${u}\n`;
    }
    doc += `\n`;

    doc += `### Actionable Next Steps\n`;
    for (const ns of item.analysis.next_steps) {
      doc += `- **[${ns.owner}]** ${ns.action}${ns.deadline ? ` *(Deadline: ${ns.deadline})*` : ''}\n`;
    }
    doc += `\n`;

    if (item.analysis.coaching_note) {
      doc += `### Sales Coaching Note\n${item.analysis.coaching_note}\n\n`;
    }

    doc += `## Source Material\n`;
    if (isCall) {
      if (payload.transcript) {
        doc += `### Call Transcript\n\`\`\`\n${payload.transcript}\n\`\`\`\n`;
      } else {
        doc += `*No transcript was provided for this background call.* Outcome: \`${payload.observed_outcome}\`, Duration: ${payload.duration_seconds}s.\n`;
      }
    } else {
      const turns = rec.transcript_payload?.turns;
      if (turns && turns.length > 0) {
        doc += `### Meeting Turns (${turns.length} turns)\n`;
        for (const t of turns) {
          doc += `- **[${t.timecode}] ${t.speaker}:** ${t.text}\n`;
        }
      } else {
        doc += `*No usable transcript.* Reason: \`${rec.transcript_payload?.unavailable_reason || payload.recording_status}\`\n`;
      }
    }

    // Save under active route folder
    const routeFolder = outputsFolder?.folder(activeRoute);
    routeFolder?.file(`${rec.record_ref}_${shortId}.md`, doc);

    // If secondary routes exist, link them
    if (item.analysis.secondary_routes) {
      for (const secRoute of item.analysis.secondary_routes) {
        if (secRoute !== activeRoute) {
          const secFolder = outputsFolder?.folder(secRoute);
          const aliasDoc = `# [Cross-Reference] ${rec.record_ref}\n\nThis record is primarily routed to \`${activeRoute}\` but also flagged for \`${secRoute}\`.\nSee primary dossier at \`outputs/${activeRoute}/${rec.record_ref}_${shortId}.md\`.\n\n${doc}`;
          secFolder?.file(`${rec.record_ref}_${shortId}.md`, aliasDoc);
        }
      }
    }
  }

  // 5. Generate and download zip
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'spendnest_revenue_inbox_export_2026-08-21.zip');
}

import React from 'react';
import { 
  PlayCircle, 
  FileText, 
  Download, 
  RotateCcw, 
  Clock, 
  ShieldCheck,
  Inbox
} from 'lucide-react';

interface NavbarProps {
  currentRevision: number;
  totalRecords: number;
  usableTranscripts: number;
  onOpenReplay: () => void;
  onOpenBrief: () => void;
  onExportZip: () => void;
  onReset: () => void;
  isExporting: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRevision,
  totalRecords,
  usableTranscripts,
  onOpenReplay,
  onOpenBrief,
  onExportZip,
  onReset,
  isExporting
}) => {
  return (
    <header className="glass-panel" style={{ padding: '0.9rem 1.25rem', marginBottom: '1.25rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--primary)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Inbox size={19} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
              SpendNest
            </h1>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.12rem 0.45rem', borderRadius: 'var(--radius-sm)' }}>
              Revenue Intelligence Inbox
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.15rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={12} color="var(--text-muted)" />
              <strong>21 August 2026</strong> (Asia/Kolkata)
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={12} color="var(--primary)" />
              Batch: <strong>{currentRevision >= 2 ? 'update-002 (Rev 2)' : 'initial-001 (Rev 1)'}</strong>
            </span>
            <span>•</span>
            <span>
              <strong>{totalRecords}</strong> Records ({usableTranscripts} Transcribed)
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={onOpenReplay}
          className="btn btn-secondary btn-sm"
          title="Interactive Assessment Replay Runner (Duplicates, Updates, Overrides)"
        >
          <PlayCircle size={14} color="var(--primary)" />
          Replay Protocol
        </button>

        <button 
          onClick={onOpenBrief}
          className="btn btn-secondary btn-sm"
          title="Open Manager Daily Brief for 21 August 2026"
        >
          <FileText size={14} color="var(--text-muted)" />
          Manager Brief
        </button>

        <button 
          onClick={onExportZip}
          disabled={isExporting}
          className="btn btn-primary btn-sm"
          title="Download complete ZIP with manifest.json and organized dossiers"
        >
          <Download size={14} />
          {isExporting ? 'Generating ZIP...' : 'Export ZIP & Manifest'}
        </button>

        <button 
          onClick={onReset}
          className="btn btn-outline btn-sm"
          title="Reset to clean initial batch (clears manual overrides)"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>
    </header>
  );
};

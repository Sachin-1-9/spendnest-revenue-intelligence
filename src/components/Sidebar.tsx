import React from 'react';
import { 
  Inbox, 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  Presentation, 
  Download, 
  RotateCcw, 
  Clock, 
  ArrowRightLeft,
  Zap
} from 'lucide-react';
import { ActiveTabType } from './Navbar';

interface SidebarProps {
  activeTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
  currentRevision: number;
  totalRecords: number;
  usableTranscripts: number;
  onTogglePostUpdate: () => void;
  onToggleInitialBatch: () => void;
  onExportZip: () => void;
  onReset: () => void;
  isExporting: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  currentRevision,
  totalRecords,
  usableTranscripts,
  onTogglePostUpdate,
  onToggleInitialBatch,
  onExportZip,
  onReset,
  isExporting
}) => {
  const isPostUpdate = currentRevision >= 2;

  const navItems: { id: ActiveTabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'inbox', label: 'Interaction Feed', icon: <Inbox size={16} />, badge: `${totalRecords}` },
    { id: 'analytics', label: 'Team Performance', icon: <BarChart3 size={16} /> },
    { id: 'brief', label: 'Manager Briefing', icon: <FileText size={16} />, badge: '21 Aug' },
    { id: 'replay', label: 'Replay & Audit Lab', icon: <ShieldCheck size={16} /> },
    { id: 'presentation', label: '5 Slides Deck', icon: <Presentation size={16} />, badge: '5' }
  ];

  return (
    <aside className="app-sidebar">
      
      {/* Brand Header */}
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(99, 102, 241, 0.4)'
          }}>
            <Zap size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Nexus Revenue
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              Intelligence Studio
            </div>
          </div>
        </div>

        {/* Date & Denominator Info */}
        <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Clock size={11} color="var(--text-muted)" />
          <span>21 Aug 2026 • Asia/Kolkata</span>
        </div>
      </div>

      {/* Batch State Pill & Switcher */}
      <div style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.65rem 0.75rem',
        marginBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            DELIVERY BATCH
          </span>
          <span className="badge badge-rev" style={{ fontSize: '0.65rem', color: isPostUpdate ? 'var(--status-success)' : 'var(--text-main)' }}>
            Rev {currentRevision}
          </span>
        </div>

        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isPostUpdate ? 'var(--status-success)' : 'var(--text-main)', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <ShieldCheck size={13} />
          {isPostUpdate ? `update-002 (${usableTranscripts}/44 Transcribed)` : `initial-001 (${usableTranscripts}/44 Transcribed)`}
        </div>

        <div>
          {isPostUpdate ? (
            <button
              onClick={onToggleInitialBatch}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', fontSize: '0.7rem', padding: '0.25rem' }}
              title="Switch to Initial Batch (Rev 1) to test deduplication & replay steps"
            >
              <ArrowRightLeft size={10} /> Test Initial Batch (Rev 1)
            </button>
          ) : (
            <button
              onClick={onTogglePostUpdate}
              className="btn btn-primary btn-sm"
              style={{ width: '100%', fontSize: '0.7rem', padding: '0.25rem' }}
              title="Apply update batch to load final post-update state (Rev 2)"
            >
              <ArrowRightLeft size={10} /> Load Post-Update (Rev 2)
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem', paddingLeft: '0.35rem' }}>
          MAIN WORKSPACE
        </div>

        <nav>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ color: isActive ? '#ffffff' : 'var(--primary)' }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.1rem 0.4rem',
                    borderRadius: 'var(--radius-full)',
                    background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-card)',
                    color: isActive ? '#ffffff' : 'var(--text-dim)',
                    border: isActive ? 'none' : '1px solid var(--border-subtle)'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer: Export, Reset & System Audit */}
      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        
        {/* Export ZIP Button */}
        <button
          onClick={onExportZip}
          disabled={isExporting}
          className="btn btn-primary"
          style={{ width: '100%', fontSize: '0.78rem' }}
          title="Download complete ZIP with manifest.json, manifest.csv, manager brief, and dossiers"
        >
          <Download size={13} />
          {isExporting ? 'Packaging ZIP...' : 'Export ZIP & Manifest'}
        </button>

        {/* Reset State Button */}
        <button
          onClick={onReset}
          className="btn btn-outline"
          style={{ width: '100%', fontSize: '0.75rem' }}
          title="Reset to clean initial batch (clears manual overrides)"
        >
          <RotateCcw size={12} />
          Reset State
        </button>

        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '0.2rem' }}>
          <span>Nexus Studio • DATA_CONTRACT v1</span>
        </div>
      </div>

    </aside>
  );
};

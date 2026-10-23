import React from 'react';
import { 
  Inbox, 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  Presentation, 
  Download, 
  RotateCcw, 
  Sun, 
  Moon, 
  Clock, 
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';

export type ActiveTabType = 'inbox' | 'analytics' | 'brief' | 'replay' | 'presentation';

interface NavbarProps {
  activeTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
  currentRevision: number;
  totalRecords: number;
  usableTranscripts: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onTogglePostUpdate: () => void;
  onToggleInitialBatch: () => void;
  onExportZip: () => void;
  onReset: () => void;
  isExporting: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  currentRevision,
  totalRecords,
  usableTranscripts,
  isDarkMode,
  onToggleTheme,
  onTogglePostUpdate,
  onToggleInitialBatch,
  onExportZip,
  onReset,
  isExporting
}) => {
  const isPostUpdate = currentRevision >= 2;

  const tabs: { id: ActiveTabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'inbox', label: 'Interactions Feed', icon: <Inbox size={15} />, badge: `${totalRecords}` },
    { id: 'analytics', label: 'Team Matrix & Metrics', icon: <BarChart3 size={15} /> },
    { id: 'brief', label: 'Executive Brief', icon: <FileText size={15} />, badge: '21 Aug' },
    { id: 'replay', label: 'Replay & Audit Lab', icon: <ShieldCheck size={15} /> },
    { id: 'presentation', label: '5 Slides Deck', icon: <Presentation size={15} />, badge: '5' }
  ];

  return (
    <header className="omni-card" style={{ padding: '0.85rem 1.4rem', marginBottom: '1.25rem' }}>
      
      {/* Top Bar: Brand, Scope, Batch Pill & Global Utilities */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
        
        {/* Brand & Subtitle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
                OmniRevenue
              </h1>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.12rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary-border)' }}>
                Intelligence Workspace
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.2rem', fontSize: '0.73rem', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={12} color="var(--text-muted)" />
                <strong>21 August 2026</strong> (Asia/Kolkata)
              </span>
              <span>•</span>
              <span>
                <strong>{totalRecords}</strong> Records ({usableTranscripts} Transcribed)
              </span>
            </div>
          </div>
        </div>

        {/* Global Utilities & Quick Switchers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
          
          {/* Batch State Pill & Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-subtle)', padding: '0.2rem 0.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isPostUpdate ? 'var(--status-success)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShieldCheck size={12} />
              {isPostUpdate ? 'Batch: update-002 (Rev 2)' : 'Batch: initial-001 (Rev 1)'}
            </span>
            {isPostUpdate ? (
              <button 
                onClick={onToggleInitialBatch}
                className="btn btn-outline btn-sm"
                style={{ padding: '0.15rem 0.45rem', fontSize: '0.68rem', height: '22px' }}
                title="Switch to Initial Batch (Rev 1) to test 17 transcripts & replay steps"
              >
                <ArrowRightLeft size={10} /> Test Rev 1
              </button>
            ) : (
              <button 
                onClick={onTogglePostUpdate}
                className="btn btn-primary btn-sm"
                style={{ padding: '0.15rem 0.45rem', fontSize: '0.68rem', height: '22px' }}
                title="Apply update batch to load final post-update state (Rev 2)"
              >
                <ArrowRightLeft size={10} /> Load Rev 2
              </button>
            )}
          </div>

          {/* Theme Toggle (Dark / Light) */}
          <button 
            onClick={onToggleTheme}
            className="btn btn-secondary btn-sm"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ padding: '0.35rem 0.6rem' }}
          >
            {isDarkMode ? <Sun size={14} color="#f59e0b" /> : <Moon size={14} color="#6366f1" />}
          </button>

          {/* Export ZIP */}
          <button 
            onClick={onExportZip}
            disabled={isExporting}
            className="btn btn-primary btn-sm"
            title="Download complete ZIP with manifest.json, manifest.csv, manager brief, and dossiers"
          >
            <Download size={13} />
            {isExporting ? 'Generating...' : 'Export ZIP & Manifest'}
          </button>

          {/* Clean Reset */}
          <button 
            onClick={onReset}
            className="btn btn-outline btn-sm"
            title="Reset to clean initial batch (clears manual overrides)"
          >
            <RotateCcw size={12} />
            Reset
          </button>

        </div>

      </div>

      {/* Bottom Bar: The 5 Top-Level Navigation Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.65rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflowX: 'auto', paddingBottom: '2px' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`nav-tab-item ${isActive ? 'active' : ''}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.1rem 0.4rem',
                    borderRadius: 'var(--radius-full)',
                    background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-subtle)',
                    color: isActive ? '#ffffff' : 'var(--text-dim)',
                    marginLeft: '0.2rem'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>Current View: <strong style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{activeTab}</strong></span>
        </div>
      </div>

    </header>
  );
};

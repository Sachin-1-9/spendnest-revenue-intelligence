import React from 'react';
import { 
  HelpCircle, 
  ChevronRight,
  Database
} from 'lucide-react';
import { ActiveTabType } from './Navbar';

interface TopBarProps {
  activeTab: ActiveTabType;
  totalRecords: number;
  usableTranscripts: number;
  onOpenMetricsGuide: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  totalRecords,
  usableTranscripts,
  onOpenMetricsGuide
}) => {
  const getTabLabel = (tab: ActiveTabType) => {
    switch (tab) {
      case 'inbox': return 'Interactions Feed & Triage';
      case 'analytics': return 'Team Activity & Denominator Governance';
      case 'brief': return 'Daily Manager Brief (21 Aug 2026)';
      case 'replay': return 'Idempotent Replay & Audit Lab';
      case 'presentation': return 'Executive Presentation (5 Slides)';
      default: return tab;
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.9rem 2rem',
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      {/* Breadcrumb & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8125rem' }}>
        <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>Nexus</span>
        <ChevronRight size={13} color="var(--border-medium)" />
        <span style={{ color: 'var(--text-main)', fontWeight: 800 }}>
          {getTabLabel(activeTab)}
        </span>
      </div>

      {/* Utilities */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        
        {/* Coverage pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--bg-subtle)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.73rem', color: 'var(--text-muted)' }}>
          <Database size={12} color="var(--primary)" />
          <span><strong>{totalRecords}</strong> Records ({usableTranscripts} Transcribed)</span>
        </div>

        {/* Denominators Guide Button */}
        <button
          onClick={onOpenMetricsGuide}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.73rem' }}
          title="Inspect metric denominator formulas, period, and missing data impacts"
        >
          <HelpCircle size={13} color="var(--primary)" />
          Denominator Guide
        </button>

      </div>
    </div>
  );
};

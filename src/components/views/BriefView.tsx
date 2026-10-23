import React from 'react';
import { 
  TrendingUp, 
  AlertOctagon, 
  GraduationCap, 
  Archive, 
  CheckCircle, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { MANAGER_BRIEF_2026_08_21 } from '../../data/managerBrief';

interface BriefViewProps {
  onJumpToRecord: (recordRef: string) => void;
}

export const BriefView: React.FC<BriefViewProps> = ({
  onJumpToRecord
}) => {
  const brief = MANAGER_BRIEF_2026_08_21;

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return <span className="badge" style={{ background: 'var(--status-danger-bg)', color: 'var(--status-danger)', border: '1px solid var(--status-danger-border)' }}>URGENT</span>;
      case 'high': return <span className="badge" style={{ background: 'var(--status-warning-bg)', color: 'var(--status-warning)', border: '1px solid var(--status-warning-border)' }}>HIGH</span>;
      case 'medium': return <span className="badge" style={{ background: 'var(--status-info-bg)', color: 'var(--status-info)', border: '1px solid var(--status-info-border)' }}>MEDIUM</span>;
      default: return <span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>INFO</span>;
    }
  };

  const getSectionIcon = (index: number) => {
    switch (index) {
      case 0: return <TrendingUp size={18} color="var(--primary)" />;
      case 1: return <AlertOctagon size={18} color="var(--status-danger)" />;
      case 2: return <GraduationCap size={18} color="var(--cat-coaching)" />;
      default: return <Archive size={18} color="var(--text-dim)" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header Banner */}
      <div className="omni-card" style={{ padding: '1.4rem 1.6rem', background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-subtle) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                <Clock size={11} /> Daily Executive Briefing
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {brief.date} • {brief.timezone}
              </span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
              {brief.title}
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.35rem', maxWidth: '780px', lineHeight: '1.55' }}>
              {brief.executive_summary}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            {brief.kpis.map((kpi, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card)', padding: '0.6rem 0.95rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', minWidth: '130px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontWeight: 600 }}>{kpi.label}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.15rem 0' }}>{kpi.value}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{kpi.denominator_note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {brief.sections.map((section, sIdx) => (
          <div key={sIdx} className="omni-card" style={{ padding: '1.35rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.45rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {getSectionIcon(sIdx)}
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  {section.title}
                </h3>
              </div>
              {section.badge && (
                <span className="badge badge-rev" style={{ fontWeight: 700 }}>
                  {section.badge}
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1.1rem' }}>
              {section.summary}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {section.items.map((item, iIdx) => (
                <div 
                  key={iIdx}
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.9rem 1.15rem',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.45rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <span className="badge badge-call" style={{ fontWeight: 800 }}>
                        {item.record_ref}
                      </span>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
                        {item.headline}
                      </strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getPriorityBadge(item.priority)}
                      {item.record_ref !== 'B01-B20' && item.record_ref !== 'M05, M08, M11' && item.record_ref !== 'M12, M14' && (
                        <button 
                          onClick={() => onJumpToRecord(item.record_ref)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.2rem 0.55rem', fontSize: '0.72rem', color: 'var(--primary)', borderColor: 'var(--primary-border)' }}
                          title="Inspect supporting source record in drawer"
                        >
                          Inspect Record <ArrowRight size={11} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '0.55rem', borderLeft: '3px solid var(--primary)', paddingLeft: '0.65rem', lineHeight: '1.5' }}>
                    "{item.evidence}"
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontWeight: 600 }}>
                    <CheckCircle size={15} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{item.action_owner}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

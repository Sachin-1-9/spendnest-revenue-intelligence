import React from 'react';
import { 
  X, 
  FileText, 
  TrendingUp, 
  AlertOctagon, 
  GraduationCap, 
  Archive, 
  CheckCircle, 
  ArrowRight 
} from 'lucide-react';
import { MANAGER_BRIEF_2026_08_21 } from '../data/managerBrief';

interface ManagerBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToRecord?: (recordRef: string) => void;
}

export const ManagerBriefModal: React.FC<ManagerBriefModalProps> = ({
  isOpen,
  onClose,
  onJumpToRecord
}) => {
  if (!isOpen) return null;

  const brief = MANAGER_BRIEF_2026_08_21;

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return <span className="badge" style={{ background: 'var(--status-danger-bg)', color: 'var(--status-danger)', border: '1px solid var(--status-danger-border)' }}>URGENT</span>;
      case 'high': return <span className="badge" style={{ background: 'var(--status-warning-bg)', color: 'var(--status-warning)', border: '1px solid var(--status-warning-border)' }}>HIGH</span>;
      case 'medium': return <span className="badge" style={{ background: 'var(--status-info-bg)', color: 'var(--status-info)', border: '1px solid var(--status-info-border)' }}>MEDIUM</span>;
      default: return <span className="badge" style={{ background: '#f5f5f4', color: '#57534e', border: '1px solid #e7e5e4' }}>INFO</span>;
    }
  };

  const getSectionIcon = (index: number) => {
    switch (index) {
      case 0: return <TrendingUp size={16} color="var(--primary)" />;
      case 1: return <AlertOctagon size={16} color="var(--status-danger)" />;
      case 2: return <GraduationCap size={16} color="var(--text-muted)" />;
      default: return <Archive size={16} color="var(--text-dim)" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '880px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <div style={{ padding: '0.35rem', borderRadius: 'var(--radius-sm)', background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <FileText size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {brief.title}
                </h3>
                <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  {brief.date} • {brief.timezone}
                </span>
              </div>
              <p style={{ fontSize: '0.73rem', color: 'var(--text-dim)' }}>
                Cross-rep synthesis reviewing all 18 adapted conversations and intake triage.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-outline btn-sm" style={{ padding: '0.3rem', borderRadius: '50%' }}>
            <X size={15} />
          </button>
        </div>

        {/* Executive Summary & KPIs */}
        <div style={{ background: '#fafaf9', padding: '1.1rem 1.4rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-main)', lineHeight: '1.55', marginBottom: '0.85rem' }}>
            {brief.executive_summary}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.65rem' }}>
            {brief.kpis.map((kpi, idx) => (
              <div key={idx} style={{ background: '#ffffff', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontWeight: 600 }}>{kpi.label}</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.15rem 0' }}>{kpi.value}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{kpi.denominator_note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {brief.sections.map((section, sIdx) => (
            <div key={sIdx} className="glass-panel" style={{ padding: '1.1rem' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  {getSectionIcon(sIdx)}
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {section.title}
                  </h4>
                </div>
                {section.badge && (
                  <span className="badge badge-rev">
                    {section.badge}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.85rem' }}>
                {section.summary}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {section.items.map((item, iIdx) => (
                  <div 
                    key={iIdx}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem 0.95rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span className="badge badge-call" style={{ fontWeight: 700 }}>
                          {item.record_ref}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-main)' }}>
                          {item.headline}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        {getPriorityBadge(item.priority)}
                        {onJumpToRecord && item.record_ref !== 'B01-B20' && item.record_ref !== 'M05, M08, M11' && item.record_ref !== 'M12, M14' && (
                          <button 
                            onClick={() => {
                              onJumpToRecord(item.record_ref);
                              onClose();
                            }}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.15rem 0.45rem', fontSize: '0.68rem' }}
                            title="Inspect supporting source record"
                          >
                            Inspect <ArrowRight size={10} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '0.45rem', borderLeft: '2px solid var(--primary)', paddingLeft: '0.55rem' }}>
                      "{item.evidence}"
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--primary)', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                      <CheckCircle size={13} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{item.action_owner}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Brief
          </button>
        </div>

      </div>
    </div>
  );
};

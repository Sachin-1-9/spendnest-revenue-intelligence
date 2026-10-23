import React from 'react';
import { Search, Filter, X, User } from 'lucide-react';

interface FilterToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSourceType: 'all' | 'call' | 'meeting';
  onSourceTypeChange: (st: 'all' | 'call' | 'meeting') => void;
  selectedPerson: string;
  onPersonChange: (p: string) => void;
  selectedRoute: string;
  onRouteChange: (r: string) => void;
  selectedReviewState: string;
  onReviewStateChange: (s: string) => void;
  personOptions: { label: string; value: string; type: 'rep' | 'organizer'; count: number }[];
  totalFiltered: number;
  totalRecords: number;
  onClearFilters: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSourceType,
  onSourceTypeChange,
  selectedPerson,
  onPersonChange,
  selectedRoute,
  onRouteChange,
  selectedReviewState,
  onReviewStateChange,
  personOptions,
  totalFiltered,
  totalRecords,
  onClearFilters
}) => {
  const isFiltered = searchQuery !== '' || selectedSourceType !== 'all' || selectedPerson !== 'all' || selectedRoute !== 'all' || selectedReviewState !== 'all';

  return (
    <div className="glass-panel" style={{ padding: '0.85rem 1.1rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.65rem' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            className="input"
            style={{ width: '100%', paddingLeft: '2rem' }}
            placeholder="Search records, transcripts, reps, titles, or C01..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              style={{ position: 'absolute', right: '0.55rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Source Type Toggle */}
        <div style={{ display: 'flex', background: 'var(--bg-tertiary)', padding: '0.15rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <button 
            className={`btn btn-sm ${selectedSourceType === 'all' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none', padding: '0.3rem 0.7rem', fontSize: '0.75rem' }}
            onClick={() => onSourceTypeChange('all')}
          >
            All ({totalRecords})
          </button>
          <button 
            className={`btn btn-sm ${selectedSourceType === 'call' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none', padding: '0.3rem 0.7rem', fontSize: '0.75rem' }}
            onClick={() => onSourceTypeChange('call')}
          >
            Calls (30)
          </button>
          <button 
            className={`btn btn-sm ${selectedSourceType === 'meeting' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none', padding: '0.3rem 0.7rem', fontSize: '0.75rem' }}
            onClick={() => onSourceTypeChange('meeting')}
          >
            Meetings (14)
          </button>
        </div>

        {/* Person Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <User size={14} color="var(--text-dim)" />
          <select 
            className="select"
            value={selectedPerson}
            onChange={(e) => onPersonChange(e.target.value)}
            style={{ minWidth: '170px' }}
          >
            <option value="all">All People (Reps & Hosts)</option>
            <optgroup label="Call Sales Reps">
              {personOptions.filter(p => p.type === 'rep').map(p => (
                <option key={p.value} value={p.value}>
                  Rep: {p.label} ({p.count})
                </option>
              ))}
            </optgroup>
            <optgroup label="Meeting Organizers">
              {personOptions.filter(p => p.type === 'organizer').map(p => (
                <option key={p.value} value={p.value}>
                  Host: {p.label} ({p.count})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Route Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Filter size={14} color="var(--text-dim)" />
          <select 
            className="select"
            value={selectedRoute}
            onChange={(e) => onRouteChange(e.target.value)}
            style={{ minWidth: '155px' }}
          >
            <option value="all">All Routes</option>
            <option value="deal_next_steps">Deal Next Steps</option>
            <option value="sales_coaching">Sales Coaching</option>
            <option value="customer_success">Customer Success</option>
            <option value="partnerships">Partnerships</option>
            <option value="onboarding_ops">Onboarding / Ops</option>
            <option value="uncaptured_triage">Uncaptured Triage</option>
          </select>
        </div>

        {/* Review State Filter */}
        <div>
          <select 
            className="select"
            value={selectedReviewState}
            onChange={(e) => onReviewStateChange(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="all">All Review States</option>
            <option value="manually_overridden">Manually Overridden</option>
            <option value="needs_review">Needs Review</option>
            <option value="transcribed">Transcribed</option>
            <option value="uncaptured">Uncaptured (26)</option>
          </select>
        </div>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button 
            onClick={onClearFilters}
            className="btn btn-outline btn-sm"
            style={{ color: 'var(--status-danger)', borderColor: 'var(--status-danger-border)' }}
          >
            <X size={12} />
            Reset Filters
          </button>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.45rem', marginTop: '0.65rem' }}>
        <span>Showing <strong>{totalFiltered}</strong> of {totalRecords} records</span>
        <span>Date: <strong>21 August 2026</strong> (Asia/Kolkata)</span>
      </div>
    </div>
  );
};

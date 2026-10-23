import React from 'react';
import { KpiCards } from '../KpiCards';
import { FilterToolbar } from '../FilterToolbar';
import { RecordsTable } from '../RecordsTable';
import { ManagedRecordState } from '../../types';

interface InboxViewProps {
  records: ManagedRecordState[];
  filteredRecords: ManagedRecordState[];
  selectedKey: string | null;
  onSelectRecord: (key: string) => void;
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
  onClearFilters: () => void;
  onOpenMetricsGuide: () => void;
}

export const InboxView: React.FC<InboxViewProps> = ({
  records,
  filteredRecords,
  selectedKey,
  onSelectRecord,
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
  onClearFilters,
  onOpenMetricsGuide
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Top Level KPI Metrics & Route Filter Chips */}
      <KpiCards 
        records={records}
        selectedRoute={selectedRoute}
        onSelectRoute={onRouteChange}
        onSelectReviewState={onReviewStateChange}
        onOpenMetricsGuide={onOpenMetricsGuide}
      />

      {/* Filter and Search Bar */}
      <FilterToolbar 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedSourceType={selectedSourceType}
        onSourceTypeChange={onSourceTypeChange}
        selectedPerson={selectedPerson}
        onPersonChange={onPersonChange}
        selectedRoute={selectedRoute}
        onRouteChange={onRouteChange}
        selectedReviewState={selectedReviewState}
        onReviewStateChange={onReviewStateChange}
        personOptions={personOptions}
        totalFiltered={filteredRecords.length}
        totalRecords={records.length}
        onClearFilters={onClearFilters}
      />

      {/* Interactive Main Records Table */}
      <RecordsTable 
        records={filteredRecords}
        selectedKey={selectedKey}
        onSelectRecord={onSelectRecord}
      />
    </div>
  );
};

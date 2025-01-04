'use client';

import React, { useState } from 'react';
import { PlusIcon, XCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import SearchBar from '@/components/common/SearchBar';
import JournalTable from '@/components/journal/JournalTable';
import FileUploadModal from '@/components/common/FileUploadModal';
import Notifications from '@/components/common/Notifications';
import { useJournalEntries } from '@/hooks/useJournalEntries';
import YearFilter from '@/components/common/YearFilter';
import MonthFilter from '@/components/common/MonthFilter';
import { JournalEntry } from '@/lib/types';

export default function JournalPage() {
  const { searchTerm, setSearchTerm, isModalOpen, setIsModalOpen,
          selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, journalEntries,
          clearFilters, fetchJournalEntries
        } = useJournalEntries();

  const [selectedJournal, setSelectedJournal] = useState<JournalEntry | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleFilterChange = (filterType: 'year' | 'month', value: string) => {
    if (filterType === 'year') {
      setSelectedYear(value === '' ? null : parseInt(value, 10));
    } else {
      setSelectedMonth(value === '' ? null : parseInt(value, 10));
    }
  };

  return (
    <div className="p-6" style={{ color: 'black' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Jurnal Umum</h1>
        <Notifications />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
        <div className="flex flex-wrap items-center space-x-4">
          <YearFilter selectedYear={selectedYear} handleYearChange={(e) => handleFilterChange('year', e.target.value || '')} journalEntries={journalEntries} />
          <MonthFilter selectedMonth={selectedMonth} handleMonthChange={(e) => handleFilterChange('month', e.target.value || '')} />
          
          {/* Back button */}
          {selectedJournal && (
            <button
              onClick={() => setSelectedJournal(null)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back
            </button>
          )}

          {(selectedYear !== null || selectedMonth !== null) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <XCircleIcon className="h-5 w-5 mr-1" />
              Clear Filters
            </button>
          )}
        </div>

        <div className="flex items-center w-full sm:w-auto">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} onClearSearch={clearSearch} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-4 bg-orange-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <JournalTable entries={journalEntries} currentPage={1} onDeleteSuccess={fetchJournalEntries} selectedJournal={selectedJournal} setSelectedJournal={setSelectedJournal} searchTerm={searchTerm} />
        </div>
      </div>

      {isModalOpen && (
        <FileUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUploadSuccess={fetchJournalEntries}
        />
      )}
    </div>
  );
}
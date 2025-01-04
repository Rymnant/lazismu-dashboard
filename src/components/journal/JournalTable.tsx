import React, { useState, useMemo } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import JournalDetailTable from './JournalDetailTable';
import { JournalTableProps } from '@/lib/types';
import { deleteJurnal, getJurnalDataById } from '@/api/database';
import Pagination from '@/components/common/Pagination';
import { paginateJournalEntries } from '@/lib/utils';

export default function JournalTable({ onDeleteSuccess, selectedJournal, setSelectedJournal, filteredEntries, searchTerm }: JournalTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  const totalPages = useMemo(() => Math.ceil(filteredEntries.length / ITEMS_PER_PAGE), [filteredEntries]);
  const currentEntries = useMemo(() => paginateJournalEntries(filteredEntries, currentPage, ITEMS_PER_PAGE), [filteredEntries, currentPage]);

  const handleDelete = async (id: number) => {
    const success = await deleteJurnal(id);
    if (success) {
      console.log(`Jurnal with id ${id} deleted successfully`);
      onDeleteSuccess();
    } else {
      console.error(`Failed to delete jurnal with id ${id}`);
    }
  };

  const handleRowClick = async (id: number) => {
    const journal = await getJurnalDataById(id);
    setSelectedJournal(journal);
    console.log(`Selected journal with name: ${journal.name}`);
  };

  return (
    <div className="overflow-x-auto">
      {selectedJournal ? (
        <JournalDetailTable journal={selectedJournal} searchTerm={searchTerm} />
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Nama Jurnal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((entry, index) => (
                <tr key={index} onClick={() => handleRowClick(entry.id)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(entry.id);
                      }}
                      className="text-orange-600 hover:text-orange-900 flex items-center space-x-2 rounded-sm outline outline-gray-200 outline-1 outline-offset-4"
                    >
                      <TrashIcon className="h-5 w-5" />
                      <span style={{ color: 'black' }}>Hapus</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
            totalItems={filteredEntries.length}
          />
        </>
      )}
    </div>
  );
}
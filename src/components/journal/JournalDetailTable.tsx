import React, { useState } from 'react';
import { JournalDetailTableProps } from '@/lib/types';
import Pagination from '../common/Pagination';

export default function JournalDetailTable({ journal, searchTerm }: JournalDetailTableProps & { searchTerm: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!journal || !journal.JurnalData) {
    return null;
  }

  const filteredData = journal.JurnalData.filter(data => 
    data.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.no_hp.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.zis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.via.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.tahun.toString().includes(searchTerm.toLowerCase()) ||
    data.jenis_donatur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Nama</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">No HP</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ZIS</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Via</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Tahun</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Jenis Donatur</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData.map((data, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.no_hp}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.zis}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.via}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.tahun}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.jenis_donatur}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
      />
    </div>
  );
};

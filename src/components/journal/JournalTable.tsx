import React from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { JournalTableProps } from '@/lib/types'
import { deleteJurnal } from '@/api/database'

export default function JournalTable({ entries, currentPage, onDeleteSuccess }: JournalTableProps) {
  const handleDelete = async (id: number) => {
    const success = await deleteJurnal(id);
    if (success) {
      console.log(`Jurnal with id ${id} deleted successfully`);
      onDeleteSuccess();
    } else {
      console.error(`Failed to delete jurnal with id ${id}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              No
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Nama Jurnal
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider whitespace-nowrap">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * 7 + index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(entry.id)}
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
    </div>
  )
}
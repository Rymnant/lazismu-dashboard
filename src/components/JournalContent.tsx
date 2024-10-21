'use client'

import React, { useState } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

type JournalEntry = {
  id: number
  name: string
}

const journalEntries: JournalEntry[] = [
  { id: 1, name: 'Jurnal Desember 2021' },
  { id: 2, name: 'Jurnal Januari 2022' },
  { id: 3, name: 'Jurnal Februari 2022' },
  { id: 4, name: 'Jurnal Maret 2022' },
  { id: 5, name: 'Jurnal April 2022' },
  { id: 6, name: 'Jurnal Mei 2022' },
  { id: 7, name: 'Jurnal Juni 2022' },
]

const JournalContent: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2022')
  const [selectedMonth, setSelectedMonth] = useState<string>('Juni')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Jurnal Umum</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option>2022</option>
              <option>2021</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option>Juni</option>
              <option>Mei</option>
              <option>April</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Cari"
              className="bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="bg-orange-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Jurnal
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {journalEntries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-orange-600 hover:text-orange-900 flex items-center rounded-sm outline outline-gray-200 outline-1 outline-offset-4">
                  <TrashIcon className="h-5 w-5 mr-2" />
                    <span style={{color: 'black'}}>Hapus</span>
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JournalContent
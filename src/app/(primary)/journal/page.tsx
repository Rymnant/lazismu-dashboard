'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { PlusIcon, ChevronDownIcon, XCircleIcon } from '@heroicons/react/24/outline'
import SearchBar from '@/components/common/SearchBar'
import JournalTable from '@/components/journal/JournalTable'
import Pagination from '@/components/common/Pagination'
import FileUploadModal from '@/components/common/FileUploadModal'
import Notifications from '@/components/common/Notifications'
import { journalEntries, ITEMS_PER_PAGE } from '@/lib/constants'
import { filterJournalEntries, paginateJournalEntries } from '@/lib/utils'

export default function JournalPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)

  const filteredEntries = useMemo(() => {
    return filterJournalEntries(journalEntries, searchTerm).filter((entry) => {
      const matchesYear = selectedYear ? entry.year === selectedYear : true
      const matchesMonth = selectedMonth ? entry.month === selectedMonth : true
      return matchesYear && matchesMonth
    })
  }, [selectedYear, selectedMonth, searchTerm])

  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE)
  const currentEntries = paginateJournalEntries(filteredEntries, currentPage, ITEMS_PER_PAGE)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setCurrentPage(1)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value === '' ? null : parseInt(e.target.value, 10)
    setSelectedYear(year)
    setCurrentPage(1)
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value === '' ? null : parseInt(e.target.value, 10)
    setSelectedMonth(month)
    setCurrentPage(1)
  }

  const clearFilters = useCallback(() => {
    setSelectedYear(null)
    setSelectedMonth(null)
    setSearchTerm('')
    setCurrentPage(1)
  }, [])

  return (
    <div className="p-6" style={{color: 'black'}}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Jurnal Umum</h1>
        <Notifications />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
        <div className="flex flex-wrap items-center space-x-4">
          <div className="relative" style={{ color: 'black' }}>
            <select
              value={selectedYear || ''}
              onChange={handleYearChange}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Years</option>
              {Array.from(new Set(journalEntries.map(entry => entry.year))).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative" style={{ color: 'black' }}>
            <select
              value={selectedMonth || ''}
              onChange={handleMonthChange}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Months</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>
                  {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
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
          <JournalTable entries={currentEntries} />
        </div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      {isModalOpen && <FileUploadModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
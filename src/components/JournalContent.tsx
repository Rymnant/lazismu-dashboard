'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon, PlusIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon, XCircleIcon } from '@heroicons/react/24/outline'

type JournalEntry = {
  id: number
  name: string
  year: number
  month: number
}

// Generate 100 journal entries for demonstration
const journalEntries: JournalEntry[] = Array.from({ length: 100 }, (_, i) => {
  const date = new Date(2021, 0, 1)
  date.setMonth(date.getMonth() + i)
  return {
    id: i + 1,
    name: `Jurnal ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  }
})

const ITEMS_PER_PAGE = 7

const JournalContent: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEntries = useMemo(() => {
    return journalEntries.filter((entry) => {
      const matchesYear = selectedYear ? entry.year === selectedYear : true
      const matchesMonth = selectedMonth ? entry.month === selectedMonth : true
      const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesYear && matchesMonth && matchesSearch
    })
  }, [selectedYear, selectedMonth, searchTerm])

  const totalPages = Math.ceil(filteredEntries.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentEntries = filteredEntries.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const clearFilters = useCallback(() => {
    setSelectedYear(null)
    setSelectedMonth(null)
    setSearchTerm('')
    setCurrentPage(1)
  }, [])

  const clearSearch = () => {
    setSearchTerm('')
    setCurrentPage(1)
  }

  const renderPageButtons = () => {
    const pageButtons = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              currentPage === i
                ? 'z-10 bg-orange-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            }`}
          >
            {i}
          </button>
        )
      }
    } else {
      const leftEllipsis = currentPage > 3
      const rightEllipsis = currentPage < totalPages - 2

      if (leftEllipsis) {
        pageButtons.push(
          <button key={1} onClick={() => goToPage(1)} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            1
          </button>
        )
        pageButtons.push(
          <span key="leftEllipsis" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700">
            ...
          </span>
        )
      }

      const startPage = leftEllipsis ? Math.max(currentPage - 1, 2) : 1
      const endPage = rightEllipsis ? Math.min(currentPage + 1, totalPages - 1) : totalPages

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              currentPage === i
                ? 'z-10 bg-orange-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            }`}
          >
            {i}
          </button>
        )
      }

      if (rightEllipsis) {
        pageButtons.push(
          <span key="rightEllipsis" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700">
            ...
          </span>
        )
        pageButtons.push(
          <button key={totalPages} onClick={() => goToPage(totalPages)} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            {totalPages}
          </button>
        )
      }
    }

    return pageButtons
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Jurnal Umum</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
        <div className="flex flex-wrap items-center space-x-4">
          <div className="relative" style={{color: 'black'}}>
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
          <div className="relative" style={{color: 'black'}}>
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
              onClick={() => {
                setSelectedYear(null)
                setSelectedMonth(null)
                setCurrentPage(1)
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <XCircleIcon className="h-5 w-5 mr-1" />
              Clear Filters
            </button>
          )}
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0" style={{color: 'black'}}>
            <input
              type="text"
              placeholder="Cari"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <button className="ml-4 bg-orange-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-orange-600 hover:text-orange-900 flex items-center space-x-2 rounded-sm outline outline-gray-200 outline-1 outline-offset-4">
                      <TrashIcon className="h-5 w-5" />
                        <span style={{color: 'black'}}>Hapus</span>
                    </button>
                  </td>
                </tr>
              ))}
              {currentEntries.length < ITEMS_PER_PAGE && (
                <tr>
                  <td colSpan={3} className="px-6 py-4">
                    <div style={{ height: `${(ITEMS_PER_PAGE - currentEntries.length) * 46}px` }}></div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredEntries.length)}</span> of{' '}
              <span className="font-medium">{filteredEntries.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {renderPageButtons()}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JournalContent
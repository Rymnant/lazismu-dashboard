'use client'

import React, { useState, useMemo } from 'react'
import { ArrowPathIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, XCircleIcon } from '@heroicons/react/24/outline'

type LoyaltyBadge = {
  type: 'Sporadic' | 'Regular' | 'Generous' | 'Major'
  count: number
  color: string
}

type Muzakki = {
  id: number
  name: string
  phoneNumber: string
  gender: string
  age: number
  occupation: string
  donationType: string
  donorType: string
  year: number
}

// Dummy data
const muzakkiData: Muzakki[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Muzakki ${i + 1}`,
  phoneNumber: `08123456${String(i).padStart(2, '0')}`, // Penyebab error SSR
  gender: i % 2 === 0 ? 'Laki' : 'Perempuan',
  age: 20 + Math.floor(Math.random() * 40),
  occupation: ['Wiraswasta', 'PNS', 'Mahasiswa'][Math.floor(Math.random() * 3)],
  donationType: ['DSKL', 'Infaq', 'Zakat'][Math.floor(Math.random() * 3)],
  donorType: ['Momentum', 'Kecil jarang', 'Besar jarang', 'Kecil sering'][Math.floor(Math.random() * 4)],
  year: 2021 + Math.floor(Math.random() * 2),
}));


const loyaltyBadges: LoyaltyBadge[] = [
  { type: 'Sporadic', count: 727, color: 'bg-green-500' },
  { type: 'Regular', count: 314, color: 'bg-blue-500' },
  { type: 'Generous', count: 314, color: 'bg-yellow-500' },
  { type: 'Major', count: 175, color: 'bg-red-500' },
]

const ITEMS_PER_PAGE = 6

export default function DatabasePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredMuzakki = useMemo(() => {
    return muzakkiData.filter(muzakki =>
      muzakki.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      muzakki.phoneNumber.includes(searchTerm)
    )
  }, [searchTerm])

  const totalPages = Math.ceil(filteredMuzakki.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentEntries = filteredMuzakki.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

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
    <div className="p-6" style={{color: 'black'}}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Database Muzakki</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Loyalty Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loyaltyBadges.map((badge) => (
            <div key={badge.type} className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <div className={`${badge.color} text-white h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold`}>
                {badge.type[0]}
              </div>
              <div>
                <p className="text-2xl font-bold">{badge.count}</p>
                <p className="text-sm text-gray-500">{badge.type}</p>
                <p className="text-xs text-gray-400">Jumlah muzakki</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowPathIcon className="h-5 w-5 mr-1" />
          Refresh
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Cari"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-white border border-gray-300 rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Muzakki</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor HP</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Umur</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pekerjaan</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Donasi</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Donatur</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((muzakki) => (
                <tr key={muzakki.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{muzakki.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{muzakki.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{muzakki.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{muzakki.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{muzakki.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{muzakki.occupation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{muzakki.donationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{muzakki.donorType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{muzakki.year}</td>
                </tr>
              ))}
            
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
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredMuzakki.length)}</span> of{' '}
              <span className="font-medium">{filteredMuzakki.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
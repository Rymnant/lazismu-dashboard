'use client'

import { useState, useMemo } from 'react'
import { BellIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import LoyaltyBadges from '../../components/database/LoyaltyBadges'
import SearchBar from '../../components/common/SearchBar'
import MuzakkiTable from '../../components/database/MuzakkiTable'
import Pagination from '../../components/common/Pagination'
import { loyaltyBadges, muzakkiData, ITEMS_PER_PAGE } from '../../lib/constants'
import { filterMuzakki, paginateMuzakki } from '../../lib/utils'

export default function DatabasePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredMuzakki = useMemo(() => filterMuzakki(muzakkiData, searchTerm), [searchTerm])
  const totalPages = Math.ceil(filteredMuzakki.length / ITEMS_PER_PAGE)
  const currentEntries = paginateMuzakki(filteredMuzakki, currentPage, ITEMS_PER_PAGE)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setCurrentPage(1)
  }

  return (
    <div className="p-6" style={{color: 'black'}}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Database Muzakki</h1>
        <div className="relative">
          <BellIcon className="h-6 w-6 text-gray-500" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">9</span>
        </div>
      </div>

      <LoyaltyBadges badges={loyaltyBadges} />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowPathIcon className="h-5 w-5 mr-1" />
          Refresh
        </button>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={clearSearch}
        />
      </div>

      <MuzakkiTable muzakkiData={currentEntries} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
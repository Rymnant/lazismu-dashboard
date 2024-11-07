'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import Notifications from '@/components/common/Notifications'
import { MaintenanceTabs } from '@/components/maintenance/MaitenanceTabs'
import { MaintenanceTable } from '@/components/maintenance/MaintenanceTable'
import { muzakkiData, donorTypes, ITEMS_PER_PAGE } from '@/lib/constants'
import { toast } from "@/hooks/use-toast"
import SearchBar from '@/components/common/SearchBar'
import Pagination from '@/components/common/Pagination'

export default function MaintenancePage() {
  const [selectedTab, setSelectedTab] = useState(donorTypes[0].toLowerCase().replace(' ', '-'))
  const [selectedMuzakki, setSelectedMuzakki] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredMuzakki = useMemo(() => {
    return muzakkiData.filter(muzakki =>
      (muzakki.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      muzakki.phoneNumber.includes(searchTerm)) &&
      muzakki.donorType?.toLowerCase().replace(' ', '-') === selectedTab
    )
  }, [searchTerm, selectedTab])

  const totalPages = Math.ceil(filteredMuzakki.length / ITEMS_PER_PAGE)
  const paginatedMuzakki = filteredMuzakki.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMuzakki(paginatedMuzakki.map(m => m.id))
    } else {
      setSelectedMuzakki([])
    }
  }

  const handleSelectMuzakki = (id: number) => {
    setSelectedMuzakki(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    )
  }

  const handleSendWA = () => {
    toast({
      title: "WhatsApp Sent",
      description: `Sent to ${selectedMuzakki.length} muzakki(s)`,
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Maintenance Muzakki</h1>
        <Notifications />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Button className="bg-gray-100 hover:bg-gray-200 text-gray-900 gap-2" onClick={handleSendWA}>
          Kirim WA Otomatis
        </Button>
        <Button variant="outline" className="gap-2">
          Petunjuk
        </Button>
        <div className="ml-auto">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            onClearSearch={() => setSearchTerm('')}
          />
        </div>
      </div>

      <MaintenanceTabs
        donorTypes={donorTypes}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      <MaintenanceTable
        muzakkiData={paginatedMuzakki}
        selectedMuzakki={selectedMuzakki}
        onSelectAll={handleSelectAll}
        onSelectMuzakki={handleSelectMuzakki}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
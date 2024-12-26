'use client'

import { useState } from 'react'
import Sidebar from "@/components/layout/Sidebar"
import SidebarTrigger from "@/components/layout/SidebarTrigger"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
      <SidebarTrigger isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </div>
  )
}


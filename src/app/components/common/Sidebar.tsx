import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const sidebarItems = [
  { name: 'Dashboard', icon: '/icon/dashboard-icon.svg', href: '/pages/dashboard' },
  { name: 'Jurnal', icon: '/icon/journal-icon.svg', href: '/pages/journal' },
  { name: 'Database', icon: '/icon/database-icon.svg', href: '/pages/database' },
  { name: 'Maintenance', icon: '/icon/maintenance-icon.svg', href: '/pages/maintenance' },
  { name: 'History', icon: '/icon/history-icon.svg', href: '/pages/history' },
  { name: 'Live Chat', icon: '/icon/chat-icon.svg', href: '/pages/chat' },
  { name: 'Konten', icon: '/icon/konten-icon.svg', href: '/pages/content' },
  { name: 'Feedback', icon: '/icon/feedback-icon.svg', href: '/pages/feedback' },
  { name: 'Kelola Promo', icon: '/icon/promo-icon.svg', href: '/pages/promo' },
]

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-md h-screen">
      <div className="p-4">
        <Image src="/img/lazismu-icon.png" alt="Lazismu Logo" width={120} height={40} />
      </div>
      <nav className="mt-8">
        {sidebarItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className={`flex items-center px-6 py-2 text-gray-600 hover:bg-orange-100 hover:text-orange-500`}>
              <Image src={item.icon} alt={`${item.name} Icon`} width={25} height={25} className="mr-3" />
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
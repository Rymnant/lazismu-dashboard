import { LoyaltyBadge, Muzakki, JournalEntry, SidebarItem } from './types'

export const ITEMS_PER_PAGE = 7

const genders = ['Laki-laki', 'Perempuan'];

function generateIndonesianName() {
  const firstNames = [
    'Ahmad', 'Muhammad', 'Siti', 'Nur', 'Abdul', 'Sri', 'Andi', 'Agus', 'Dwi', 'Tri',
    'Dian', 'Ratna', 'Putri', 'Dewi', 'Rina', 'Budi', 'Rudi', 'Joko', 'Hendra', 'Yudi'
  ]
  const lastNames = [
    'Hidayat', 'Susanto', 'Wijaya', 'Kusuma', 'Putra', 'Sari', 'Saputra', 'Nugraha', 'Pratama', 'Firmansyah',
    'Purnama', 'Santoso', 'Wati', 'Utami', 'Yuliana', 'Setiawan', 'Permana', 'Suryadi', 'Ramadhan', 'Gunawan'
  ]
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
}

export const donorTypes = ['Momentum', 'Kecil jarang', 'Besar jarang', 'Kecil sering', 'Besar sering']

export const muzakkiData: Muzakki[] = Array.from({ length: 600 }, (_, i) => ({
  id: i + 1,
  name: generateIndonesianName(),
  phoneNumber: `08123456${String(i).padStart(2, '0')}`,
  gender: genders[Math.floor(Math.random() * genders.length)],
  age: 20 + Math.floor(Math.random() * 40),
  occupation: ['Wiraswasta', 'PNS', 'Mahasiswa'][Math.floor(Math.random() * 3)],
  donationType: ['DSKL', 'Infaq', 'Zakat'][Math.floor(Math.random() * 3)],
  donorType: ['Momentum', 'Kecil jarang', 'Besar jarang', 'Kecil sering', 'Besar sering'][Math.floor(Math.random() * 5)],
  status: ['Aktif', 'Tidak aktif'][Math.floor(Math.random() * 2)],
  year: 2021 + Math.floor(Math.random() * 2),
}));

export const journalEntries: JournalEntry[] = Array.from({ length: 100 }, (_, i) => {
  const date = new Date(2021, 0, 1)
  date.setMonth(date.getMonth() + i)
  return {
    id: i + 1,
    name: `Jurnal ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  }
})

export const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', icon: '/icon/dashboard-icon.svg', href: '/' },
  { name: 'Jurnal', icon: '/icon/journal-icon.svg', href: '/journal' },
  { name: 'Database', icon: '/icon/database-icon.svg', href: '/database' },
  { name: 'Maintenance', icon: '/icon/maintenance-icon.svg', href: '/maintenance' },
  { name: 'History', icon: '/icon/history-icon.svg', href: '/history' },
  { name: 'Live Chat', icon: '/icon/livechat-icon.svg', href: '/chat' },
  { name: 'Konten', icon: '/icon/konten-icon.svg', href: '/content' },
  { name: 'Feedback', icon: '/icon/feedback-icon.svg', href: '/feedback' },
  { name: 'Kelola Promo', icon: '/icon/promo-icon.svg', href: '/promo' },
]

export const loyaltyBadges: LoyaltyBadge[] = [
  { type: 'Sporadic', count: 727, image: '/icon/sporadic.svg' },
  { type: 'Regular', count: 314, image: '/icon/regular.svg' },
  { type: 'Generous', count: 314, image: '/icon/generous.svg' },
  { type: 'Major', count: 175, image: '/icon/regular.svg' },
]

export const years = [2021, 2022];
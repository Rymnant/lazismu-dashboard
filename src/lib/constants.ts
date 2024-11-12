import { LoyaltyBadge, Muzakki, JournalEntry, SidebarItem } from './types'

export const ITEMS_PER_PAGE = 7

export const genders = ['Laki-laki', 'Perempuan'];
export const occupations = ['Wiraswasta', 'PNS', 'Mahasiswa', 'Pelajar', 'Pensiunan', 'Ibu rumah tangga', 'Lainnya'];
export const donationTypes = ['DSKL', 'Infaq', 'Zakat'];
export const donorTypes = ['Momentum', 'Kecil jarang', 'Besar jarang', 'Kecil sering', 'Besar sering'];
export const status = ['Aktif', 'Tidak aktif'];
export const year = [2021, 2022, 2023, 2024];

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

export const muzakkiData: Muzakki[] = Array.from({ length: 600 }, (_, i) => ({
  id: i + 1,
  name: generateIndonesianName(),
  phoneNumber: `08123456${String(i).padStart(2, '0')}`,
  gender: genders[Math.floor(Math.random() * genders.length)],
  age: 20 + Math.floor(Math.random() * 40),
  occupation: occupations[Math.floor(Math.random() * occupations.length)],
  donationType: donationTypes[Math.floor(Math.random() * 3)],
  donorType: donorTypes[Math.floor(Math.random() * 5)],
  status: status[Math.floor(Math.random() * 2)],
  year: year[Math.floor(Math.random() * 4)],
}));

export const loyaltyBadges: LoyaltyBadge[] = [
  { type: 'Sporadic', count: muzakkiData.filter(m => m.donorType === 'Kecil jarang').length, image: '/icon/sporadic.svg' },
  { type: 'Regular', count: muzakkiData.filter(m => m.donorType === 'Besar jarang').length, image: '/icon/regular.svg' },
  { type: 'Generous', count: muzakkiData.filter(m => m.donorType === 'Kecil sering').length, image: '/icon/generous.svg' },
  { type: 'Major', count: muzakkiData.filter(m => m.donorType === 'Besar sering').length, image: '/icon/regular.svg' },
];

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
  { name: 'Dashboard', icon: '/icon/dashboard-icon.svg', activeIcon: '/icon/dashboard-icon-active.svg', href: '/', isActive: false },
  { name: 'Jurnal', icon: '/icon/journal-icon.svg', activeIcon: '/icon/journal-icon-active.svg', href: '/journal', isActive: false },
  { name: 'Database', icon: '/icon/database-icon.svg', activeIcon: '/icon/database-icon-active.svg', href: '/database', isActive: false },
  { name: 'Maintenance', icon: '/icon/maintenance-icon.svg', activeIcon: '/icon/maintenance-icon-active.svg', href: '/maintenance', isActive: false },
  { name: 'History', icon: '/icon/history-icon.svg', activeIcon: '/icon/history-icon-active.svg', href: '/history', isActive: false },
  { name: 'Live Chat', icon: '/icon/livechat-icon.svg', activeIcon: '/icon/livechat-icon-active.svg', href: '/chat', isActive: false },
  { name: 'Konten', icon: '/icon/konten-icon.svg', activeIcon: '/icon/konten-icon-active.svg', href: '/content', isActive: false },
  { name: 'Feedback', icon: '/icon/feedback-icon.svg', activeIcon: '/icon/feedback-icon-active.svg', href: '/feedback', isActive: false },
  { name: 'Kelola Promo', icon: '/icon/promo-icon.svg', activeIcon: '/icon/promo-icon-active.svg', href: '/promo', isActive: false },
]

export const years = [2021, 2022, 2023, 2024];
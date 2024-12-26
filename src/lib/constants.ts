import { LoyaltyBadge, SidebarItem } from './types'

export const ITEMS_PER_PAGE = 7

export const genders = ['Laki-laki', 'Perempuan'];
export const occupations = ['Wiraswasta', 'PNS', 'Mahasiswa', 'Pelajar', 'Pensiunan', 'Ibu rumah tangga', 'Lainnya'];
export const donationTypes = ['DSKL', 'Infaq', 'Zakat'];
export const donorTypes = ['Momentum', 'Kecil jarang', 'Besar jarang', 'Kecil sering', 'Besar sering'];
export const status = ['Aktif', 'Tidak aktif'];
export const year = [2021, 2022, 2023, 2024];

export const loyaltyBadges: LoyaltyBadge[] = [
  { type: 'Sporadic', count: 1, image: '/icon/sporadic.svg' },
  { type: 'Regular', count: 2, image: '/icon/regular.svg' },
  { type: 'Generous', count: 3, image: '/icon/generous.svg' },
  { type: 'Major', count: 4, image: '/icon/regular.svg' },
];

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
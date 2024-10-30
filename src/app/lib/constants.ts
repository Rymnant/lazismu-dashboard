import { LoyaltyBadge, Muzakki } from './types'

export const ITEMS_PER_PAGE = 7

export const loyaltyBadges: LoyaltyBadge[] = [
  { type: 'Sporadic', count: 727, color: 'bg-green-500' },
  { type: 'Regular', count: 314, color: 'bg-blue-500' },
  { type: 'Generous', count: 314, color: 'bg-yellow-500' },
  { type: 'Major', count: 175, color: 'bg-red-500' },
]

export const muzakkiData: Muzakki[] = Array.from({ length: 100 }, (_, i) => ({
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
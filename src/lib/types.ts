export type SidebarItem = {
  name: string
  icon: string
  href: string
}

export type LoyaltyBadge = {
  type: 'Sporadic' | 'Regular' | 'Generous' | 'Major'
  count: number
  image: string
}

export type Muzakki = {
  id: number
  name: string
  phoneNumber: string
  gender: string
  age: number
  occupation: string
  donationType: string
  donorType: string
  status: string
  year: number
}

export type JournalEntry = {
  id: number
  name: string
  year: number
  month: number
}

export type DonorType = 'Momentum' | 'Kecil Jarang' | 'Kecil Sering' | 'Besar Jarang' | 'Besar Sering'
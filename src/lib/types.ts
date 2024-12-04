export type SidebarItem = {
  name: string
  icon: string
  activeIcon: string
  href: string
  isActive?: boolean
}

export type LoyaltyBadge = {
  type: 'Sporadic' | 'Regular' | 'Generous' | 'Major'
  count: number
  image: string
}

export type JournalEntry = {
  id: number;
  name: string;
};

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

export type DonorType = 'Momentum' | 'Kecil Jarang' | 'Kecil Sering' | 'Besar Jarang' | 'Besar Sering'
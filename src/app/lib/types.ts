export type LoyaltyBadge = {
    type: 'Sporadic' | 'Regular' | 'Generous' | 'Major'
    count: number
    color: string
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
    year: number
  }
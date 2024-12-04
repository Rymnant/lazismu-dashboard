import { LoyaltyBadge } from '../../lib/types'
import Image from 'next/image'

type LoyaltyBadgesProps = {
  badges: LoyaltyBadge[]
}

export default function LoyaltyBadges({ badges }: LoyaltyBadgesProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-4">Loyalty Badges</h2>
      <div className="inline-grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div key={badge.type} className="rounded shadow bg-white p-4 grid grid-cols-2 gap-6">
            <div className='flex flex-col items-center'>
              <Image src={badge.image} alt={`${badge.type} badge`} width={60} height={60} className="w-15 h-15" />
              <p className="text-sm text-gray-500 mt-3">{badge.type}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p className="text-2xl font-bold">{badge.count}</p>
              <p className="text-xs text-gray-400">Jumlah muzakki</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
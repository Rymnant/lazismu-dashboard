import Image from 'next/image'
import { LoyaltyBadge } from '@/lib/types'

interface LoyaltyBadgesProps {
  badges: LoyaltyBadge[]
}

interface BadgeCardProps {
  badge: LoyaltyBadge
}

function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-row">
      <div className="basis-1/4 flex flex-col justify-center items-center">
        <Image 
          src={badge.image} 
          alt={`${badge.type} badge`} 
          width={50} 
          height={50}
        />
        <p className="text-sm text-gray-500 mt-3">{badge.type}</p>
      </div>
      <div className="basis-3/4 text-center flex flex-col justify-center">
        <p className="text-2xl font-bold">{badge.count}</p>
        <p className="text-xs text-gray-400">Jumlah muzakki</p>
      </div>
    </div>
  )
}

export default function LoyaltyBadges({ badges }: LoyaltyBadgesProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-medium mb-4">Loyalty Badges</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <BadgeCard key={badge.type} badge={badge} />
        ))}
      </div>
    </section>
  )
}




import { LoyaltyBadge } from '../../lib/types'

type LoyaltyBadgesProps = {
  badges: LoyaltyBadge[]
}

export default function LoyaltyBadges({ badges }: LoyaltyBadgesProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-4">Loyalty Badges</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div key={badge.type} className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <div className={`${badge.color} text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold`}>
              {badge.type[0]}
            </div>
            <div>
              <p className="text-2xl font-bold">{badge.count}</p>
              <p className="text-sm text-gray-500">{badge.type}</p>
              <p className="text-xs text-gray-400">Jumlah muzakki</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
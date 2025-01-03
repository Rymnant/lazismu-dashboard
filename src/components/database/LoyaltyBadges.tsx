import React, { useMemo } from 'react';
import Image from 'next/image';
import { LoyaltyBadge } from '@/lib/types';

interface BadgeCardProps {
  badge: LoyaltyBadge;
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

interface LoyaltyBadgesProps {
  muzakkiData: { donorType: string }[];
}

export default function LoyaltyBadges({ muzakkiData }: LoyaltyBadgesProps) {
  const loyaltyBadges: LoyaltyBadge[] = useMemo(() => {
    const calculateBadgeCount = (type: string) => {
      switch (type) {
        case 'Sporadic':
          return muzakkiData.filter(m => m.donorType === 'Kecil Jarang').length;
        case 'Regular':
          return muzakkiData.filter(m => m.donorType === 'Besar Jarang').length;
        case 'Generous':
          return muzakkiData.filter(m => m.donorType === 'Kecil Sering').length;
        case 'Major':
          return muzakkiData.filter(m => m.donorType === 'Besar Sering').length;
        default:
          return 0;
      }
    };

    return [
      { type: 'Sporadic', count: calculateBadgeCount('Sporadic'), image: '/icon/sporadic.svg' },
      { type: 'Regular', count: calculateBadgeCount('Regular'), image: '/icon/regular.svg' },
      { type: 'Generous', count: calculateBadgeCount('Generous'), image: '/icon/generous.svg' },
      { type: 'Major', count: calculateBadgeCount('Major'), image: '/icon/major.svg' },
    ];
  }, [muzakkiData]);

  return (
    <section className="mb-6">
      <h2 className="text-lg font-medium mb-4">Loyalty Badges</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {loyaltyBadges.map((badge) => (
          <BadgeCard key={badge.type} badge={badge} />
        ))}
      </div>
    </section>
  )
}




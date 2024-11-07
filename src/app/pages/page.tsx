'use client';

import { BellIcon } from '@heroicons/react/24/outline';
import LoyaltyBadges from '@/app/pages/LoyaltyBadges';


export default function DashboardPage() {
  const badges = {
    sporadic: 727,
    regular: 314,
    generous: 314,
    major: 175,
  };

  return (
    <div className="p-6" style={{ color: 'black' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard Muzakki</h1>
        <div className="relative">
          <BellIcon className="h-6 w-6 text-gray-500" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            9
          </span>
        </div>
      </div>

      {/* Loyalty Badges Section */}
      <LoyaltyBadges badges={badges} />
    </div>
  );
}

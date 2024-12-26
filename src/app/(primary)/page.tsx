"use client";

import Notifications from "@/components/common/Notifications";

export default function DashboardPage(){

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Notifications />
      </div>
      <div className="max-w-64 overflow-hidden rounded-xl bg-white shadow my-5">
        <div className="flex items-center justify-between">
          <div className="p-4">
            <h2 className="font-bold text-gray-900">Total Muzakki</h2>
          </div>
          <div className="bg-[#FF5722] p-4">
            <span className="font-bold text-white">69</span>
          </div>
        </div>
      </div>
      {/* <ChartSection /> */}
    </main>
  );
};
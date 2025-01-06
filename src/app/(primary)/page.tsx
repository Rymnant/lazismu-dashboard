"use client";

import React, { useEffect, useState } from "react";
import Notifications from "@/components/common/Notifications";
import ChartSection from "@/components/dashboard/Chart";
import { getMuzakki } from "@/api/database";
import { Muzakki } from "@/lib/types";

export default function DashboardPage() {
  const[muzakkiData, setMuzakkiData] = useState<Muzakki[]>([]);

  const fetchMuzakkiData = async () => {
    const data = await getMuzakki();
    setMuzakkiData(data);
  }

  useEffect(() => {
    fetchMuzakkiData();
  }, []);

  const totalMuzakki = muzakkiData.length;

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Notifications />
      </div>
      <div className="max-w-64 overflow-hidden rounded-xl bg-white shadow-lg my-5">
        <div className="flex items-center justify-between">
          <div className="p-4">
            <h2 className="font-bold text-gray-900">Total Muzakki</h2>
          </div>
          <div className="bg-[#FF5722] p-4">
            <span className="font-bold text-white">{totalMuzakki}</span>
          </div>
        </div>
      </div>
      <ChartSection data={muzakkiData} />
    </main>
  );
}
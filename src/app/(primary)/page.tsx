"use client";

import React, { useEffect, useState } from "react";
import Notifications from "@/components/common/Notifications";
import ChartSection from "@/components/dashboard/Chart";
import { getMuzakki } from "@/api/database";
import { Muzakki } from "@/lib/types";
import YearFilter from "@/components/common/YearFilter";

export default function DashboardPage() {
  const [muzakkiData, setMuzakkiData] = useState<Muzakki[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const fetchMuzakkiData = async () => {
    const data = await getMuzakki();
    setMuzakkiData(data);
  };

  useEffect(() => {
    fetchMuzakkiData();
  }, []);

  const totalMuzakki = muzakkiData.length;

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  };

  const filteredMuzakkiData = selectedYear
    ? muzakkiData.filter((item) => item.year === selectedYear)
    : muzakkiData;

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Notifications />
      </div>

      {/*Filter Section*/}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
        <div className="flex flex-wrap items-center space-x-4">
          <YearFilter
            selectedYear={selectedYear}
            handleYearChange={handleYearChange}
            yearOptions={[...new Set(muzakkiData.map((item) => item.year.toString()))]}
          />
        </div>
        <div className="flex items-center w-full sm:w-auto">
          {/* <SearchBar/> */} Search
        </div>
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
      <ChartSection data={filteredMuzakkiData} />
    </main>
  );
}
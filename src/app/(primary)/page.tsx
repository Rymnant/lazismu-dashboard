"use client";

import { useState } from "react";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import Notifications from "@/components/common/Notifications";
import { muzakkiData, donorTypes, year } from "@/lib/constants";
import { FilterSection, useFilteredMuzakki } from "@/components/common/Filter";
import ChartSection from "@/components/dashboard/Chart";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    gender: "Jenis Kelamin",
    donationType: "Jenis Donasi",
    donorType: "Golongan Muzakki",
    year: "Tahun",
  });

  const handleFilterChange = (filterName: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const filterOptions = {
    gender: ["Jenis Kelamin", "Laki-laki", "Perempuan"],
    donationType: ["Jenis Donasi", "DSKL", "Infaq", "Zakat"],
    donorType: ["Golongan Muzakki", ...donorTypes],
    year: ["Tahun", ...year.map(String)],
  };

  const filteredMuzakki = useFilteredMuzakki(muzakkiData, selectedFilters);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Notifications />
      </div>
      <FilterSection filterOptions={filterOptions} handleFilterChange={handleFilterChange} />
      <div className="max-w-64 overflow-hidden rounded-xl bg-white shadow my-5">
        <div className="flex items-center justify-between">
          <div className="p-4">
            <h2 className="font-bold text-gray-900">Total Muzakki</h2>
          </div>
          <div className="bg-[#FF5722] p-4">
            <span className="font-bold text-white">{filteredMuzakki.length}</span>
          </div>
        </div>
      </div>
      <ChartSection filteredMuzakki={filteredMuzakki} />
    </main>
  );
};

export default DashboardPage;
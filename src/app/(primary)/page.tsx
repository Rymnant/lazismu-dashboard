"use client";

import { useState, useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { muzakkiData } from "../../lib/constants";
import { Muzakki } from "../../lib/types";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [selectedFilters, setSelectedFilters] = useState<{
    gender: string;
    donationType: string;
    donorType: string;
    year: string;
  }>({
    gender: "Semua",
    donationType: "Semua",
    donorType: "Semua",
    year: "Semua",
  });

  const handleFilterChange = (filterName: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Filtered data based on selected filters
  const filteredMuzakki = useMemo(() => {
    return muzakkiData.filter((muzakki: Muzakki) => {
      return (
        (selectedFilters.gender === "Semua" || muzakki.gender === selectedFilters.gender) &&
        (selectedFilters.donationType === "Semua" || muzakki.donationType === selectedFilters.donationType) &&
        (selectedFilters.donorType === "Semua" || muzakki.donorType === selectedFilters.donorType) &&
        (selectedFilters.year === "Semua" || muzakki.year === parseInt(selectedFilters.year))
      );
    });
  }, [selectedFilters]);

  // Chart data based on filtered data
  const totalMuzakki = filteredMuzakki.length;

  const barDataDonationType = {
    labels: ["DSKL", "Infaq", "Zakat"],
    datasets: [
      {
        label: "Jenis Donasi",
        data: [
          filteredMuzakki.filter((m: Muzakki) => m.donationType === "DSKL").length,
          filteredMuzakki.filter((m: Muzakki) => m.donationType === "Infaq").length,
          filteredMuzakki.filter((m: Muzakki) => m.donationType === "Zakat").length,
        ],
        backgroundColor: ["#4CAF50", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const barDataDonorType = {
    labels: ["Momentum", "Kecil jarang", "Besar jarang", "Kecil sering"],
    datasets: [
      {
        label: "Jenis Donatur",
        data: [
          filteredMuzakki.filter((m: Muzakki) => m.donorType === "Momentum").length,
          filteredMuzakki.filter((m: Muzakki) => m.donorType === "Kecil jarang").length,
          filteredMuzakki.filter((m: Muzakki) => m.donorType === "Besar jarang").length,
          filteredMuzakki.filter((m: Muzakki) => m.donorType === "Kecil sering").length,
        ],
        backgroundColor: ["#4CAF50", "#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

const pieDataGender = {
  labels: ["Laki-laki", "Perempuan"],
  datasets: [
    {
      data: [
        filteredMuzakki.filter((m: Muzakki) => m.gender.toLowerCase() === "laki-laki").length,
        filteredMuzakki.filter((m: Muzakki) => m.gender.toLowerCase() === "perempuan").length,
      ],
      backgroundColor: ["#36A2EB", "#FF6384"],
    },
  ],
};


  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        {["Gender", "Donation Type", "Donor Type", "Year"].map((filter, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium">{filter}</label>
            <select
              className="border p-2 rounded-md"
              onChange={(e) =>
                handleFilterChange(
                  filter.toLowerCase().replace(" ", "") as keyof typeof selectedFilters,
                  e.target.value
                )
              }
            >
              <option value="Semua">Semua</option>
              {/* Map options here dynamically */}
            </select>
          </div>
        ))}
      </div>

      {/* Total Muzakki */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-medium">Total Muzakki</h2>
        <p className="text-2xl font-bold text-orange-500">{totalMuzakki}</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium mb-2">Distribusi Jenis Kelamin</h2>
          <Pie data={pieDataGender} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium mb-2">Distribusi Jenis Donasi</h2>
          <Bar data={barDataDonationType} />
        </div>
        <div className="bg-white p-4 rounded shadow col-span-2">
          <h2 className="text-lg font-medium mb-2">Distribusi Jenis Donatur</h2>
          <Bar data={barDataDonorType} />
        </div>
      </div>
    </main>
  );
}
"use client";

import { useState, useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { muzakkiData, donorTypes, years } from "../../lib/constants";
import { Muzakki } from "../../lib/types";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

type SelectedFilters = {
  gender: string;
  donationType: string;
  donorType: string;
  year: string;
};

type FilterSectionProps = {
  filterOptions: Record<keyof SelectedFilters, string[]>;
  selectedFilters: SelectedFilters;
  handleFilterChange: (filterName: keyof SelectedFilters, value: string) => void;
};

const FilterSection = ({ filterOptions, selectedFilters, handleFilterChange }: FilterSectionProps) => (
  <div className="flex flex-wrap gap-4 mb-6">
    {Object.keys(filterOptions).map((filter, index) => {
      const typedFilter = filter as keyof SelectedFilters;
      return (
        <div key={index} className="flex flex-col gap-2">
          <label className="text-sm font-medium">{filter.charAt(0).toUpperCase() + filter.slice(1)}</label>
          <select
            className="border p-2 rounded-md"
            onChange={(e) => handleFilterChange(typedFilter, e.target.value)}
          >
            {filterOptions[typedFilter].map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    })}
  </div>
);

type ChartSectionProps = {
  filteredMuzakki: Muzakki[];
};

const ChartSection = ({ filteredMuzakki }: ChartSectionProps) => {
  const barDataDonationType = {
    labels: ["DSKL", "Infaq", "Zakat"],
    datasets: [
      {
        label: "Jenis Donasi",
        data: ["DSKL", "Infaq", "Zakat"].map(type => filteredMuzakki.filter((m: Muzakki) => m.donationType === type).length),
        backgroundColor: ["#4CAF50", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const barDataDonorType = {
    labels: donorTypes,
    datasets: [
      {
        label: "Jenis Donatur",
        data: donorTypes.map(type => filteredMuzakki.filter((m: Muzakki) => m.donorType === type).length),
        backgroundColor: ["#4CAF50", "#36A2EB", "#FFCE56", "#FF6384", "#FF9F40"],
      },
    ],
  };

  const pieDataGender = {
    labels: ["Laki-laki", "Perempuan"],
    datasets: [
      {
        data: ["Laki-laki", "Perempuan"].map(gender => filteredMuzakki.filter((m: Muzakki) => m.gender.toLowerCase() === gender.toLowerCase()).length),
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
  );
};

export default function DashboardPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    gender: "Semua",
    donationType: "Semua",
    donorType: "Semua",
    year: "Semua",
  });

  const handleFilterChange = (filterName: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const filterOptions = {
    gender: ["Semua", "Laki-laki", "Perempuan"],
    donationType: ["Semua", "DSKL", "Infaq", "Zakat"],
    donorType: ["Semua", ...donorTypes],
    year: ["Semua", ...years.map(String)],
  };

  const filteredMuzakki = useMemo(() => {
    return muzakkiData.filter((m) => {
      return (
        (selectedFilters.gender === "Semua" || m.gender === selectedFilters.gender) &&
        (selectedFilters.donationType === "Semua" || m.donationType === selectedFilters.donationType) &&
        (selectedFilters.donorType === "Semua" || m.donorType === selectedFilters.donorType) &&
        (selectedFilters.year === "Semua" || m.year === parseInt(selectedFilters.year))
      );
    });
  }, [selectedFilters]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <FilterSection filterOptions={filterOptions} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
      <div className="flex flex-col items-center bg-white my-5 rounded shadow">
        <h2 className="text-lg font-medium">Total Muzakki</h2>
        <p className="text-2xl font-bold text-orange-500">{filteredMuzakki.length}</p>
      </div>
      <ChartSection filteredMuzakki={filteredMuzakki} />
    </main>
  );
}
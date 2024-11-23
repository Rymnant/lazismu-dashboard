"use client";

import { useState, useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import Notifications from "@/components/common/Notifications";
import { muzakkiData, donorTypes, year } from "@/lib/constants";
import { Muzakki } from "@/lib/types";

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

const FilterSection = ({ filterOptions, handleFilterChange }: FilterSectionProps) => (
  <div className="flex flex-wrap gap-4 mb-6">
    {Object.keys(filterOptions).map((filter, index) => {
      const typedFilter = filter as keyof SelectedFilters;
      return (
        <div key={index} className="flex flex-col gap-2">
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
    gender: "All Genders",
    donationType: "All Donations",
    donorType: "All Donors",
    year: "All Years",
  });

  const handleFilterChange = (filterName: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const filterOptions = {
    gender: ["All Genders", "Laki-laki", "Perempuan"],
    donationType: ["All Donations", "DSKL", "Infaq", "Zakat"],
    donorType: ["All Donors", ...donorTypes],
    year: ["All Years", ...year.map(String)],
  };

  const filteredMuzakki = useMemo(() => {
    return muzakkiData.filter((m) => {
      return (
        (selectedFilters.gender === "All Genders" || m.gender === selectedFilters.gender) &&
        (selectedFilters.donationType === "All Donations" || m.donationType === selectedFilters.donationType) &&
        (selectedFilters.donorType === "All Donors" || m.donorType === selectedFilters.donorType) &&
        (selectedFilters.year === "All Years" || m.year === parseInt(selectedFilters.year))
      );
    });
  }, [selectedFilters]);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Notifications />
      </div>
      <FilterSection filterOptions={filterOptions} selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
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
}
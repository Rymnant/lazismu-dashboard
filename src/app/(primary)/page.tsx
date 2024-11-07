"use client";

import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    gender: "Semua",
    institution: "Semua",
    donationType: "Semua",
    donorType: "Semua",
    year: "Semua",
  });

  const handleFilterChange = (filterName: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Contoh data
  const totalMuzakki = 1396;

  const lineData = {
    labels: ["2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Jumlah Muzakki",
        data: [500, 600, 450, 750],
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.3)",
        fill: true,
      },
    ],
  };

  const barDataDonationType = {
    labels: ["DSKL", "Infaq", "Zakat", "Zakat Penghasilan"],
    datasets: [
      {
        label: "Jenis Donasi",
        data: [300, 400, 350, 200],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const barDataDonorType = {
    labels: ["Besar Jarang", "Besar Sering", "Kecil Jarang", "Kecil Sering", "Momentum", "Calon"],
    datasets: [
      {
        label: "Jenis Donatur",
        data: [150, 250, 180, 200, 220, 140],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const pieDataGender = {
    labels: ["Laki-laki", "Perempuan", "Lain"],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ["#e0e0e0", "#aaaaaa", "#f1c40f"],
      },
    ],
  };

  const pieDataInstitution = {
    labels: ["Badan", "Perorangan"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#e0e0e0", "#aaaaaa"],
      },
    ],
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Filter Section */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {["Jenis Kelamin", "Lembaga", "Jenis Donasi", "Jenis Donatur", "Tahun"].map((filter, index) => (
          <select
            key={index}
            className="border p-2 rounded"
            onChange={(e) =>
              handleFilterChange(
                filter.toLowerCase().replace(" ", "") as keyof typeof selectedFilters,
                e.target.value
              )
            }
          >
            <option value="Semua">{filter}</option>
            <option value="Option1">Option 1</option>
            <option value="Option2">Option 2</option>
          </select>
        ))}
      </div>
      {/* Total Muzakki Section */}
      <div className="mb-6 p-4 bg-white shadow rounded-lg flex items-center justify-between">
        <h2 className="text-lg font-semibold">Total Muzakki</h2>
        <span className="text-3xl font-bold text-orange-500">{totalMuzakki}</span>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Tren Jumlah Muzakki</h2>
          <Line data={lineData} />
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Distribusi Jenis Kelamin</h2>
          <Pie data={pieDataGender} />
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Distribusi Jenis Donasi</h2>
          <Bar data={barDataDonationType} />
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Distribusi Lembaga</h2>
          <Pie data={pieDataInstitution} />
        </div>
        <div className="bg-white p-4 shadow rounded-lg col-span-2">
          <h2 className="text-lg font-semibold mb-4">Distribusi Jenis Donatur</h2>
          <Bar data={barDataDonorType} />
        </div>
      </div>
    </main>
  );
}

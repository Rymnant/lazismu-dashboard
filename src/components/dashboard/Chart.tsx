import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Muzakki, ChartSectionProps } from "@/lib/types";

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
    labels: ["Momentum", "Kecil Jarang", "Kecil Sering", "Besar Jarang", "Besar Sering"],
    datasets: [
      {
        label: "Jenis Donatur",
        data: ["Momentum", "Kecil Jarang", "Kecil Sering", "Besar Jarang", "Besar Sering"].map(type => filteredMuzakki.filter((m: Muzakki) => m.donorType === type).length),
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

export default ChartSection;

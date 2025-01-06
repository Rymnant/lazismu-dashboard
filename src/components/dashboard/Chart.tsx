import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Muzakki } from "@/lib/types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const commonOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
};

export default function ChartSection({ data }: { data: Muzakki[] }) {

  // Yearly Trend Data
  const yearlyLabels = Array.from(new Set(data.map((item) => item.year))).sort();

  // Total data for each year
  const yearlyTotalData = yearlyLabels.map((year) => {
    return data.filter((item) => item.year === year).length;
  });

  const yearlyData = {
    labels: yearlyLabels,
    datasets: [
      {
        label: 'Trend Tahunan',
        data: yearlyTotalData,
        borderColor: '#ff4500',
        backgroundColor: 'rgba(255, 69, 0, 0.5)', // Mungkin bisa ditambah sesuai dengan jumlah tahun *Note: Berlaku untuk semua chart
        // backgroundColor: 'rgba(255, 69, 0, 0.5)', // Misal
        tension: 0.4,
      },
    ],
  };

  // Gender distribution data
  const genderLabels = Array.from(new Set(data.map((item) => item.gender))).sort();

  // Total data for each gender type
  const genderTotalData = genderLabels.map((gender) => {
    return data.filter((item) => item.gender === gender).length;
  });

  const genderData = {
    labels: genderLabels,
    datasets: [
      {
        data: genderTotalData,
        backgroundColor: [
          'rgba(255, 69, 0, 0.8)',
          'rgba(255, 69, 0, 0.6)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Donation type data
  const donationTypeLabels = Array.from(new Set(data.map((item) => item.donationType))).sort();

  // Total data for each donation type
  const donationTypeTotalData = donationTypeLabels.map((donationType) => {
    return data.filter((item) => item.donationType === donationType).length;
  });

  const donationTypeData = {
    labels: donationTypeLabels,
    datasets: [
      {
        label: 'Jumlah Donasi',
        data: donationTypeTotalData,
        backgroundColor: 'rgba(255, 69, 0, 0.8)',
        borderColor: 'rgba(255, 69, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Donor type data
  const donorTypeLabels = Array.from(new Set(data.map((item) => item.donorType))).sort();

  // Total data for each donor type
  const donorTypeTotalData = donorTypeLabels.map((donorType) => {
    return data.filter((item) => item.donorType === donorType).length;
  });

  const donorTypeData = {
    labels: donorTypeLabels,
    datasets: [
      {
        label: 'Jumlah Donatur',
        data: donorTypeTotalData,
        backgroundColor: 'rgba(255, 69, 0, 0.8)',
        borderColor: 'rgba(255, 69, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yearly Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tahun</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <Line
                data={yearlyData}
                options={{
                  ...commonOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Gender Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Jenis Kelamin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <Pie
                data={genderData}
                options={{
                  ...commonOptions,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Donation Type Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Jenis Donasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <Bar
                data={donationTypeData}
                options={{
                  ...commonOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Donor Type Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Jenis Donatur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] relative">
              <Bar
                data={donorTypeData}
                options={{
                  ...commonOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

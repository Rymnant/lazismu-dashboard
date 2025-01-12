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

interface ChartSectionProps {
  data: Muzakki[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ data }) => {
  const yearlyLabels = Array.from(new Set(data.map((item) => item.year))).sort();
  const yearlyTotalData = yearlyLabels.map((year) => data.filter((item) => item.year === year).length);

  const yearlyData = {
    labels: yearlyLabels,
    datasets: [
      {
        label: 'Trend Tahunan',
        data: yearlyTotalData,
        borderColor: '#ff4500',
        backgroundColor: 'rgba(255, 69, 0, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const genderLabels = Array.from(new Set(data.map((item) => item.gender))).sort();
  const genderTotalData = genderLabels.map((gender) => data.filter((item) => item.gender === gender).length);

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

  const donationTypeLabels = Array.from(new Set(data.map((item) => item.donationType))).sort();
  const categorizedDonationTypeLabels = donationTypeLabels.map((donationType) => donationType.toLowerCase().includes('zakat') ? 'Zakat' : 'Infaq');
  const uniqueCategorizedDonationTypeLabels = Array.from(new Set(categorizedDonationTypeLabels)).sort();
  const categorizedDonationTypeData = uniqueCategorizedDonationTypeLabels.map((label) => data.filter((item) => label === 'Infaq' ? !item.donationType.toLowerCase().includes('zakat') : item.donationType.toLowerCase().includes('zakat')).length);

  const donationTypeData = {
    labels: uniqueCategorizedDonationTypeLabels,
    datasets: [
      {
        label: 'Jumlah Donasi',
        data: categorizedDonationTypeData,
        backgroundColor: 'rgba(255, 69, 0, 0.8)',
        borderColor: 'rgba(255, 69, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const donorTypeLabels = Array.from(new Set(data.map((item) => item.donorType))).sort();
  const donorTypeTotalData = donorTypeLabels.map((donorType) => data.filter((item) => item.donorType === donorType).length);

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
};

export default ChartSection;

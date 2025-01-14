import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Muzakki } from "@/lib/types";
import { useRef, RefObject } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { downloadCardWithChart } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

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
  selectedGender: string | null;
}

const isDataEmpty = (data: number[]) => data.every(item => item === 0);

const ChartSection: React.FC<ChartSectionProps> = ({ data, selectedGender }) => {
  const filteredData = selectedGender ? data.filter((item) => item.gender === selectedGender) : data;

  const yearlyLabels = Array.from(new Set(filteredData.map((item) => item.year))).sort();
  const yearlyTotalData = yearlyLabels.map((year) => filteredData.filter((item) => item.year === year).length);

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

  const genderLabels = Array.from(new Set(filteredData.map((item) => item.gender))).sort();
  const genderTotalData = genderLabels.map((gender) => filteredData.filter((item) => item.gender === gender).length);

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

  const donationTypeLabels = Array.from(new Set(filteredData.map((item) => item.donationType))).sort();
  const categorizedDonationTypeLabels = donationTypeLabels.map((donationType) => donationType.toLowerCase().includes('zakat') ? 'Zakat' : 'Infaq');
  const uniqueCategorizedDonationTypeLabels = Array.from(new Set(categorizedDonationTypeLabels)).sort();
  const categorizedDonationTypeData = uniqueCategorizedDonationTypeLabels.map((label) => filteredData.filter((item) => label === 'Infaq' ? !item.donationType.toLowerCase().includes('zakat') : item.donationType.toLowerCase().includes('zakat')).length);

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

  const donorTypeLabels = Array.from(new Set(filteredData.map((item) => item.donorType))).sort();
  const donorTypeTotalData = donorTypeLabels.map((donorType) => filteredData.filter((item) => item.donorType === donorType).length);

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

  const yearlyChartRef = useRef<ChartJS<"line"> | null>(null);
  const genderChartRef = useRef<ChartJS<"pie"> | null>(null);
  const donationTypeChartRef = useRef<ChartJS<"bar"> | null>(null);
  const donorTypeChartRef = useRef<ChartJS<"bar"> | null>(null);

  const yearlyCardRef = useRef<HTMLDivElement>(null);
  const genderCardRef = useRef<HTMLDivElement>(null);
  const donationTypeCardRef = useRef<HTMLDivElement>(null);
  const donorTypeCardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card ref={yearlyCardRef}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Tahun</CardTitle>
            {!isDataEmpty(yearlyTotalData) && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => downloadCardWithChart(yearlyCardRef.current, 'yearly-trend.png')}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isDataEmpty(yearlyTotalData) ? (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No Data Available</AlertTitle>
                <AlertDescription>
                  There is no data available for the selected filter.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="h-[300px] relative">
                <Line
                  ref={yearlyChartRef as RefObject<ChartJS<"line">>}
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
            )}
          </CardContent>
        </Card>

        <Card ref={genderCardRef}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Jenis Kelamin</CardTitle>
            {!isDataEmpty(genderTotalData) && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => downloadCardWithChart(genderCardRef.current, 'gender.png')}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isDataEmpty(genderTotalData) ? (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No Data Available</AlertTitle>
                <AlertDescription>
                  There is no gender data available for the selected filter.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="h-[300px] relative">
                <Pie
                  ref={genderChartRef as RefObject<ChartJS<"pie">>}
                  data={genderData}
                  options={{
                    ...commonOptions,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card ref={donationTypeCardRef}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Jenis Donasi</CardTitle>
            {!isDataEmpty(categorizedDonationTypeData) && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => downloadCardWithChart(donationTypeCardRef.current, 'donation-type.png')}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isDataEmpty(categorizedDonationTypeData) ? (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No Data Available</AlertTitle>
                <AlertDescription>
                  There is no donation type data available for the selected filter.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="h-[300px] relative">
                <Bar
                  ref={donationTypeChartRef as RefObject<ChartJS<"bar">>}
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
            )}
          </CardContent>
        </Card>

        <Card ref={donorTypeCardRef}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Jenis Donatur</CardTitle>
            {!isDataEmpty(donorTypeTotalData) && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => downloadCardWithChart(donorTypeCardRef.current, 'donor-type.png')}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isDataEmpty(donorTypeTotalData) ? (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No Data Available</AlertTitle>
                <AlertDescription>
                  There is no donor type data available for the selected filter.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="h-[300px] relative">
                <Bar
                  ref={donorTypeChartRef as RefObject<ChartJS<"bar">>}
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartSection;
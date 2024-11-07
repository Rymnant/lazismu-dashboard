'use client';

import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrasi komponen chart agar bisa digunakan
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type LoyaltyBadgesProps = {
  badges: {
    sporadic: number;
    regular: number;
    generous: number;
    major: number;
  };
};

export default function LoyaltyBadgesChart({ badges }: LoyaltyBadgesProps) {
  const labels = ['Sporadic', 'Regular', 'Generous', 'Major'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Jumlah Muzakki',
        data: [badges.sporadic, badges.regular, badges.generous, badges.major],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Diagram Batang */}
      <div>
        <h2 className="text-center mb-4">Diagram Batang</h2>
        <Bar data={data} />
      </div>

      {/* Diagram Lingkaran */}
      <div>
        <h2 className="text-center mb-4">Diagram Lingkaran</h2>
        <Pie data={data} />
      </div>
    </div>
  );
}

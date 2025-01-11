import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartCardProps {
  data: number[];
  labels: string[];
}

const ChartCard: React.FC<ChartCardProps> = ({ data, labels }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total',
        data,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        type: 'category' as const,
      },
      y: {
        type: 'linear' as const,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-2">
        <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartCard;
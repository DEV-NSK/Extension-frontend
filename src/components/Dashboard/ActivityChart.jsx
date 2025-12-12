import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import Card from '../Common/Card';
import '../../styles/global.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ActivityChart = ({ data }) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Page Visits',
        data: [65, 78, 66, 89, 96, 76, 80],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Interactions',
        data: [45, 58, 46, 69, 76, 56, 60],
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'var(--text-secondary)',
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'var(--bg-primary)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-primary)',
        borderColor: 'var(--border-color)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'var(--border-color)',
        },
        ticks: {
          color: 'var(--text-secondary)',
        },
      },
      y: {
        grid: {
          color: 'var(--border-color)',
        },
        ticks: {
          color: 'var(--text-secondary)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Card title="Weekly Activity" subtitle="Page visits and interactions over time" className="h-full">
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default ActivityChart;
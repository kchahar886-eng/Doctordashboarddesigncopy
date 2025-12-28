import {
  Calendar,
  Users,
  Clock,
  DollarSign,
  Plus,
  FileText,
  AlertTriangle,
  Wind,
  Activity,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { toast } from 'sonner@2.0.3';
import { useState, useEffect } from 'react';

const chartData = [
  { day: 'Mon', patients: 12 },
  { day: 'Tue', patients: 19 },
  { day: 'Wed', patients: 15 },
  { day: 'Thu', patients: 22 },
  { day: 'Fri', patients: 18 },
  { day: 'Sat', patients: 25 },
  { day: 'Sun', patients: 8 },
];

const statsCards = [
  {
    title: "Today's Appointments",
    value: '24',
    icon: Calendar,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    title: 'New Patients',
    value: '8',
    icon: Users,
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600',
  },
  {
    title: 'Avg. Consultation Time',
    value: '18 min',
    icon: Clock,
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    title: "Today's Earnings",
    value: '₹12,450',
    icon: DollarSign,
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
];

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? 'Good Morning'
      : currentHour < 17
      ? 'Good Afternoon'
      : 'Good Evening';

  const handleQuickAction = (action: string) => {
    if (action === 'add-patient') {
      onNavigate?.('patients');
      toast.success('Navigating to Patients');
    }
    if (action === 'view-appointments') {
      onNavigate?.('appointments');
      toast.success('Navigating to Appointments');
    }
    if (action === 'create-prescription') {
      onNavigate?.('prescriptions');
      toast.success('Navigating to Prescriptions');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-xl font-semibold">
            {greeting}, Dr. Sharma
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your summary for today
          </p>
        </div>

        <img
          src="/logo.png"
          alt="SehatNxt Logo"
          className="h-16 w-auto opacity-60 hidden md:block"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <p className="text-gray-600 text-sm mb-2">{card.title}</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold text-gray-900">
                  {card.value}
                </p>
                <div
                  className={`${card.bgColor} ${card.textColor} p-3 rounded-xl`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">
          Daily Patient Trend
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#1A73E8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


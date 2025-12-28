import { Calendar, Users, Clock, DollarSign, Plus, FileText, AlertTriangle, Wind, Activity, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    title: 'New Patients',
    value: '8',
    icon: Users,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600',
  },
  {
    title: 'Avg. Consultation Time',
    value: '18 min',
    icon: Clock,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    title: "Today's Earnings",
    value: '₹12,450',
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
];

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-patient':
        onNavigate?.('patients');
        toast.success('Navigating to Patients section');
        break;
      case 'view-appointments':
        onNavigate?.('appointments');
        toast.success('Navigating to Appointments');
        break;
      case 'create-prescription':
        onNavigate?.('prescriptions');
        toast.success('Navigating to Prescriptions');
        break;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header with Logo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">{greeting}, Dr. Sharma</h1>
          <p className="text-gray-600 mt-1">Here's your summary for today</p>
        </div>
        <div className="hidden md:block">
          <img src="/logo.png" alt="SehatNxt+" className="h-16 w-auto opacity-50" />
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">{card.title}</p>
                  <p className="text-gray-900">{card.value}</p>
                </div>
                <div className={`${card.bgColor} ${card.textColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 mb-4 text-lg md:text-xl">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <button 
            onClick={() => handleQuickAction('add-patient')}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" strokeWidth={2} />
            <span className="font-medium">Add New Patient</span>
          </button>
          <button 
            onClick={() => handleQuickAction('view-appointments')}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#00BFA5] to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Calendar className="w-5 h-5" strokeWidth={2} />
            <span className="font-medium">View Appointments</span>
          </button>
          <button 
            onClick={() => handleQuickAction('create-prescription')}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            <FileText className="w-5 h-5" strokeWidth={2} />
            <span className="font-medium">Create Prescription</span>
          </button>
        </div>
      </div>

      {/* Disease & Outbreak Alerts + Air Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disease & Outbreak Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500" strokeWidth={2} />
            <h2 className="text-gray-900">Disease & Outbreak Alerts</h2>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Activity className="w-5 h-5 text-red-600" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-red-900">Dengue Outbreak - High Alert</div>
                    <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">Critical</span>
                  </div>
                  <p className="text-sm text-red-700 mb-2">
                    Significant increase in dengue cases reported in South Delhi area. 127 confirmed cases this week.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-red-600">
                    <span>📍 South Delhi, Nehru Place</span>
                    <span>🕒 Updated 2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Activity className="w-5 h-5 text-yellow-600" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-yellow-900">Seasonal Flu Increase</div>
                    <span className="px-2 py-0.5 bg-yellow-600 text-white text-xs rounded-full">Moderate</span>
                  </div>
                  <p className="text-sm text-yellow-700 mb-2">
                    45% increase in influenza cases. Recommend flu vaccination to vulnerable patients.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-yellow-600">
                    <span>📍 Central Delhi</span>
                    <span>🕒 Updated 5 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-blue-900">Respiratory Infections</div>
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">Advisory</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">
                    Poor air quality contributing to increased respiratory complaints in your area.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-blue-600">
                    <span>📍 Delhi NCR</span>
                    <span>🕒 Updated 1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Air Quality Monitor */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Wind className="w-5 h-5 text-[#1A73E8]" strokeWidth={2} />
            <h2 className="text-gray-900">Air Quality Monitor</h2>
            <span className="ml-auto text-xs text-gray-500">Delhi, India</span>
          </div>

          {/* Current AQI */}
          <div className="mb-6">
            <div className="flex items-end gap-4 mb-2">
              <div className="text-5xl font-bold text-red-600">287</div>
              <div className="pb-2">
                <div className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                  Very Poor
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Air Quality Index (AQI) - Last updated: 30 mins ago
            </p>
          </div>

          {/* Pollutant Breakdown */}
          <div className="space-y-3 mb-6">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-700">PM 2.5</span>
                <span className="font-medium text-red-600">178 µg/m³</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-700">PM 10</span>
                <span className="font-medium text-orange-600">245 µg/m³</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-700">NO₂</span>
                <span className="font-medium text-yellow-600">67 µg/m³</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-700">O₃ (Ozone)</span>
                <span className="font-medium text-green-600">23 µg/m³</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>

          {/* Health Advisory for Pulmonologists */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <div className="font-medium text-red-900 mb-1">Clinical Advisory</div>
                <p className="text-sm text-red-700">
                  High pollution levels. Expect increased respiratory cases. Advise patients with asthma/COPD to:
                </p>
                <ul className="mt-2 text-sm text-red-700 space-y-1 ml-4 list-disc">
                  <li>Stay indoors during peak hours (6-10 AM)</li>
                  <li>Use N95 masks outdoors</li>
                  <li>Keep rescue inhalers handy</li>
                  <li>Monitor symptoms closely</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Trend Chart */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 mb-4 text-lg md:text-xl">Daily Patient Trend</h2>
        <div className="w-full" style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#1A73E8"
                strokeWidth={3}
                dot={{ fill: '#1A73E8', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
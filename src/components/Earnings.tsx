import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const monthlyData = [
  { month: 'Jan', earnings: 45000, patients: 120 },
  { month: 'Feb', earnings: 52000, patients: 135 },
  { month: 'Mar', earnings: 48000, patients: 128 },
  { month: 'Apr', earnings: 61000, patients: 155 },
  { month: 'May', earnings: 55000, patients: 142 },
  { month: 'Jun', earnings: 67000, patients: 168 },
  { month: 'Jul', earnings: 59000, patients: 151 },
  { month: 'Aug', earnings: 71000, patients: 178 },
  { month: 'Sep', earnings: 64000, patients: 162 },
  { month: 'Oct', earnings: 73000, patients: 185 },
];

const transactionsData = [
  { id: 'T001', patient: 'Rajesh Kumar', date: '2025-11-02', amount: 500, mode: 'Cash', remarks: 'Consultation' },
  { id: 'T002', patient: 'Priya Sharma', date: '2025-11-02', amount: 600, mode: 'UPI', remarks: 'Follow-up' },
  { id: 'T003', patient: 'Amit Patel', date: '2025-11-01', amount: 800, mode: 'Card', remarks: 'Full checkup' },
  { id: 'T004', patient: 'Sneha Verma', date: '2025-11-01', amount: 500, mode: 'Cash', remarks: 'Consultation' },
  { id: 'T005', patient: 'Vikram Singh', date: '2025-11-01', amount: 700, mode: 'UPI', remarks: 'Treatment' },
];

export function Earnings() {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const handleExportReport = () => {
    toast.success('Exporting earnings report as PDF...');
    setTimeout(() => {
      toast.success('Report exported successfully');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 text-2xl md:text-3xl">Earnings & Analytics</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Track your financial performance</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={handleExportReport}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm md:text-base"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
            <span className="font-medium">Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm mb-2">Total Patients</p>
              <p className="text-gray-900 text-xl md:text-2xl">1,524</p>
              <p className="text-xs md:text-sm text-green-600 mt-2">↑ 12% from last month</p>
            </div>
            <div className="bg-blue-50 text-blue-600 p-2 md:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Users className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm mb-2">Total Earnings</p>
              <p className="text-gray-900 text-xl md:text-2xl">₹6,45,000</p>
              <p className="text-xs md:text-sm text-green-600 mt-2">↑ 18% from last month</p>
            </div>
            <div className="bg-green-50 text-green-600 p-2 md:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm mb-2">Avg Fee/Patient</p>
              <p className="text-gray-900 text-xl md:text-2xl">₹423</p>
              <p className="text-xs md:text-sm text-green-600 mt-2">↑ 5% from last month</p>
            </div>
            <div className="bg-teal-50 text-teal-600 p-2 md:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-2">This Month</p>
              <p className="text-gray-900">₹73,000</p>
              <p className="text-sm text-green-600 mt-2">185 patients</p>
            </div>
            <div className="bg-purple-50 text-purple-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-6 h-6" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
          <h2 className="text-gray-900 text-lg md:text-xl">Revenue Trend</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            {(['daily', 'weekly', 'monthly'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-xl capitalize transition-all text-xs md:text-sm ${
                  viewMode === mode
                    ? 'bg-[#1A73E8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full" style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Bar dataKey="earnings" fill="#1A73E8" radius={[8, 8, 0, 0]} name="Earnings (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full" style={{ height: '320px' }}>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#00BFA5"
                strokeWidth={3}
                dot={{ fill: '#00BFA5', r: 6 }}
                name="Patients"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-gray-700">Transaction ID</th>
                <th className="text-left px-6 py-4 text-gray-700">Patient</th>
                <th className="text-left px-6 py-4 text-gray-700">Date</th>
                <th className="text-left px-6 py-4 text-gray-700">Amount</th>
                <th className="text-left px-6 py-4 text-gray-700">Mode</th>
                <th className="text-left px-6 py-4 text-gray-700">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactionsData.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 text-gray-700">{transaction.patient}</td>
                  <td className="px-6 py-4 text-gray-700">{transaction.date}</td>
                  <td className="px-6 py-4 text-gray-900">₹{transaction.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm ${
                      transaction.mode === 'Cash' ? 'bg-green-100 text-green-700' :
                      transaction.mode === 'UPI' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {transaction.mode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{transaction.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
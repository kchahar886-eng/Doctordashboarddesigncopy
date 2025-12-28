import { useState } from 'react';
import { Download, Calendar, FileText, Users, DollarSign, CheckCircle } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

export function DataExport() {
  const [selectedData, setSelectedData] = useState({
    patients: true,
    appointments: true,
    prescriptions: true,
    earnings: true,
    referrals: false,
    communications: false
  });

  const [dateRange, setDateRange] = useState('all');
  const [format, setFormat] = useState('excel');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    const selected = Object.entries(selectedData).filter(([_, value]) => value);
    
    if (selected.length === 0) {
      toast.error('Please select at least one data type to export');
      return;
    }

    setIsExporting(true);
    toast.info('Preparing export...');

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      toast.success(`Successfully exported ${selected.length} data type(s) as ${format.toUpperCase()}`);
    }, 2000);
  };

  const dataTypes = [
    { id: 'patients', label: 'Patients Database', icon: Users, description: 'All patient records and information' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, description: 'Appointment history and schedules' },
    { id: 'prescriptions', label: 'Prescriptions', icon: FileText, description: 'All prescription records' },
    { id: 'earnings', label: 'Earnings & Transactions', icon: DollarSign, description: 'Financial records and payments' },
    { id: 'referrals', label: 'Referrals', icon: FileText, description: 'Specialist referral records' },
    { id: 'communications', label: 'Communications', icon: FileText, description: 'Patient and staff messages' }
  ];

  const selectedCount = Object.values(selectedData).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-gray-900 mb-4">Select Data to Export</h2>
          <div className="space-y-3">
            {dataTypes.map(type => (
              <div key={type.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={type.id}
                  checked={selectedData[type.id as keyof typeof selectedData]}
                  onCheckedChange={(checked) => 
                    setSelectedData({...selectedData, [type.id]: checked as boolean})
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={type.id} className="cursor-pointer flex items-center gap-2">
                    <type.icon className="w-4 h-4 text-[#1A73E8]" />
                    <span>{type.label}</span>
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-6">
          {/* Date Range */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-gray-900 mb-4">Date Range</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#1A73E8] transition-colors">
                <input
                  type="radio"
                  name="dateRange"
                  value="all"
                  checked={dateRange === 'all'}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-4 h-4 text-[#1A73E8]"
                />
                <div>
                  <div className="font-medium text-gray-900">All Time</div>
                  <div className="text-xs text-gray-500">Export complete history</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#1A73E8] transition-colors">
                <input
                  type="radio"
                  name="dateRange"
                  value="year"
                  checked={dateRange === 'year'}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-4 h-4 text-[#1A73E8]"
                />
                <div>
                  <div className="font-medium text-gray-900">Last 12 Months</div>
                  <div className="text-xs text-gray-500">Current year data</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#1A73E8] transition-colors">
                <input
                  type="radio"
                  name="dateRange"
                  value="month"
                  checked={dateRange === 'month'}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-4 h-4 text-[#1A73E8]"
                />
                <div>
                  <div className="font-medium text-gray-900">Last 30 Days</div>
                  <div className="text-xs text-gray-500">Recent month only</div>
                </div>
              </label>
            </div>
          </div>

          {/* Export Format */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-gray-900 mb-4">Export Format</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#1A73E8] transition-colors">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  checked={format === 'excel'}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-4 h-4 text-[#1A73E8]"
                />
                <div>
                  <div className="font-medium text-gray-900">Excel (.xlsx)</div>
                  <div className="text-xs text-gray-500">Best for analysis in Excel/Sheets</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#1A73E8] transition-colors">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={format === 'csv'}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-4 h-4 text-[#1A73E8]"
                />
                <div>
                  <div className="font-medium text-gray-900">CSV (.csv)</div>
                  <div className="text-xs text-gray-500">Universal format</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#1A73E8] transition-colors">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={format === 'pdf'}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-4 h-4 text-[#1A73E8]"
                />
                <div>
                  <div className="font-medium text-gray-900">PDF (.pdf)</div>
                  <div className="text-xs text-gray-500">Print-ready format</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Export Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-[#1A73E8]" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-2">Export Summary</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p>📊 <strong>{selectedCount}</strong> data type(s) selected</p>
              <p>📅 Date range: <strong>{dateRange === 'all' ? 'All time' : dateRange === 'year' ? 'Last 12 months' : 'Last 30 days'}</strong></p>
              <p>📄 Format: <strong>{format.toUpperCase()}</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex gap-4">
        <Button
          onClick={handleExport}
          disabled={isExporting || selectedCount === 0}
          className="flex-1 py-6 text-base bg-gradient-to-r from-[#1A73E8] to-blue-600 hover:shadow-lg hover:shadow-blue-500/25"
        >
          {isExporting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Export Data ({selectedCount} items)
            </>
          )}
        </Button>
      </div>

      {/* Info Box */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-yellow-900 mb-1">Data Privacy Note</h4>
            <p className="text-sm text-yellow-800">
              Exported data contains sensitive patient information. Please ensure proper security measures 
              when storing or sharing these files. SehatNxt+ is not responsible for data breaches after export.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
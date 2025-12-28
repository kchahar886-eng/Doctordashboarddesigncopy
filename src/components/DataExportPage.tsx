import { DataExport } from './DataExport';

export function DataExportPage() {
  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 text-2xl md:text-3xl">Data Export</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Export your clinic data for backup or analysis</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <DataExport />
      </div>
    </div>
  );
}
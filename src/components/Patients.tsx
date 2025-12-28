import { useState } from 'react';
import { Search, Plus, Eye, Edit, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { VitalsTracking } from './VitalsTracking';
import { toast } from 'sonner@2.0.3';

const patientsData = [
  { id: 'P001', name: 'Rajesh Kumar', age: 45, lastVisit: '2025-11-01', diagnosis: 'Hypertension', contact: '+91 98765 43210' },
  { id: 'P002', name: 'Priya Sharma', age: 32, lastVisit: '2025-11-02', diagnosis: 'Seasonal Flu', contact: '+91 98765 43211' },
  { id: 'P003', name: 'Amit Patel', age: 58, lastVisit: '2025-10-28', diagnosis: 'Diabetes Type 2', contact: '+91 98765 43212' },
  { id: 'P004', name: 'Sneha Verma', age: 28, lastVisit: '2025-11-01', diagnosis: 'Skin Allergy', contact: '+91 98765 43213' },
  { id: 'P005', name: 'Vikram Singh', age: 41, lastVisit: '2025-10-30', diagnosis: 'Back Pain', contact: '+91 98765 43214' },
  { id: 'P006', name: 'Anjali Reddy', age: 52, lastVisit: '2025-11-02', diagnosis: 'Diabetes Management', contact: '+91 98765 43215' },
];

const visitHistory = [
  { date: '2025-11-01', diagnosis: 'Hypertension', prescription: 'Amlodipine 5mg', notes: 'Blood pressure stable' },
  { date: '2025-10-15', diagnosis: 'Routine Checkup', prescription: 'Multivitamin', notes: 'General health good' },
  { date: '2025-09-20', diagnosis: 'Seasonal Flu', prescription: 'Paracetamol, Cetirizine', notes: 'Symptoms resolved' },
];

interface PatientsProps {
  onNavigate?: (page: string) => void;
}

export function Patients({ onNavigate }: PatientsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showVitals, setShowVitals] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPatient = () => {
    toast.success('Add Patient form would open here');
  };

  const handleDownloadSummary = (patientName: string) => {
    toast.success(`Downloading summary for ${patientName}`);
  };

  const handleAddVisit = (patientName: string) => {
    toast.success(`Add visit for ${patientName}`);
  };

  const handleCreatePrescription = (patientName: string) => {
    toast.success(`Navigating to create prescription for ${patientName}`);
    setSelectedPatient(null);
    onNavigate?.('prescriptions');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setSelectedFile(file);
    } else {
      toast.error('Please upload a CSV or Excel file');
    }
  };

  const handleImportData = () => {
    if (!selectedFile) {
      toast.error('Please select a file to import');
      return;
    }
    toast.success(`Importing data from ${selectedFile.name}...`);
    setShowImportModal(false);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 text-2xl md:text-3xl">Patients</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Manage patient records</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => setShowImportModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-[#00BFA5] text-[#00BFA5] rounded-xl hover:bg-[#00BFA5] hover:text-white hover:shadow-lg hover:shadow-teal-500/25 transition-all text-sm md:text-base"
          >
            <Upload className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
            <span className="font-medium">Import</span>
          </button>
          <button 
            onClick={handleAddPatient}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm md:text-base"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
            <span className="font-medium">Add Patient</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search by name or patient ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8] transition-all text-sm md:text-base"
            />
          </div>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#1A73E8] to-[#00BFA5] flex items-center justify-center text-white text-sm md:text-base">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-gray-900 text-base md:text-lg">{patient.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{patient.id}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Age:</span>
                <span className="text-gray-900">{patient.age} years</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Last Visit:</span>
                <span className="text-gray-900">{patient.lastVisit}</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Diagnosis:</span>
                <span className="text-gray-900">{patient.diagnosis}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPatient(patient)}
              className="w-full py-2 md:py-2.5 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Eye className="w-4 h-4" strokeWidth={2} />
              <span>View Details</span>
            </button>
          </div>
        ))}
      </div>

      {/* Patient Detail Modal */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Profile</DialogTitle>
            <DialogDescription>View and manage patient information</DialogDescription>
          </DialogHeader>
          
          {selectedPatient && (
            <div className="space-y-6 pt-4">
              {/* Patient Info Header */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1A73E8] to-[#00BFA5] flex items-center justify-center text-white text-xl">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-gray-900">{selectedPatient.name}</h2>
                  <p className="text-gray-600">{selectedPatient.id} • {selectedPatient.age} years</p>
                  <p className="text-gray-600">{selectedPatient.contact}</p>
                </div>
                <button 
                  onClick={() => handleDownloadSummary(selectedPatient.name)}
                  className="px-4 py-2 bg-white text-[#1A73E8] rounded-xl border border-[#1A73E8] hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" strokeWidth={2} />
                  <span>Download Summary</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 border-b border-gray-200">
                {['overview', 'history', 'reports', 'prescriptions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 capitalize transition-all ${
                      activeTab === tab
                        ? 'text-[#1A73E8] border-b-2 border-[#1A73E8]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Last Visit</p>
                      <p className="text-gray-900">{selectedPatient.lastVisit}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Current Diagnosis</p>
                      <p className="text-gray-900">{selectedPatient.diagnosis}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  {visitHistory.map((visit, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-gray-900">{visit.diagnosis}</h3>
                        <span className="text-sm text-gray-600">{visit.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1"><strong>Prescription:</strong> {visit.prescription}</p>
                      <p className="text-sm text-gray-600">{visit.notes}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="text-center py-8 text-gray-500">
                  No reports uploaded yet
                </div>
              )}

              {activeTab === 'prescriptions' && (
                <div className="text-center py-8 text-gray-500">
                  No prescriptions available
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button 
                  onClick={() => handleAddVisit(selectedPatient.name)}
                  className="py-3 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Add Visit
                </button>
                <button 
                  onClick={() => setShowVitals(true)}
                  className="py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  Track Vitals
                </button>
                <button 
                  onClick={() => handleCreatePrescription(selectedPatient.name)}
                  className="py-3 bg-gradient-to-r from-[#00BFA5] to-teal-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Create Prescription
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Vitals Tracking Modal */}
      {showVitals && selectedPatient && (
        <VitalsTracking
          patientName={selectedPatient.name}
          patientId={selectedPatient.id}
          onClose={() => setShowVitals(false)}
        />
      )}

      {/* Import Data Modal */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Import Patient Data</DialogTitle>
            <DialogDescription>Upload a CSV or Excel file containing patient records</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {/* File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                isDragging 
                  ? 'border-[#1A73E8] bg-blue-50' 
                  : 'border-gray-300 hover:border-[#00BFA5]'
              }`}
            >
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl">
                    <FileSpreadsheet className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1A73E8] to-[#00BFA5] text-white rounded-2xl">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-gray-900">Drag & drop your file here</p>
                    <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                  </div>
                  <label className="inline-block">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg transition-all cursor-pointer">
                      <FileSpreadsheet className="w-4 h-4" />
                      Choose File
                    </span>
                  </label>
                  <p className="text-xs text-gray-400 mt-2">Supported formats: CSV, XLSX, XLS</p>
                </div>
              )}
            </div>

            {/* Sample Format Info */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-gray-900 mb-2">Required columns:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• <strong>Name</strong> - Patient full name</li>
                <li>• <strong>Age</strong> - Patient age</li>
                <li>• <strong>Contact</strong> - Phone number (optional)</li>
                <li>• <strong>Diagnosis</strong> - Last diagnosis (optional)</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setSelectedFile(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleImportData}
                disabled={!selectedFile}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Import Data
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
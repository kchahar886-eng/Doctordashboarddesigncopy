import { useState } from 'react';
import { Activity, Heart, Thermometer, Droplets, Weight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface VitalRecord {
  id: number;
  date: string;
  time: string;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  weight: number;
  bloodSugar: number;
}

interface VitalsTrackingProps {
  patientName: string;
  patientId: string;
  onClose: () => void;
}

export function VitalsTracking({ patientName, patientId, onClose }: VitalsTrackingProps) {
  const [vitals, setVitals] = useState<VitalRecord[]>([
    {
      id: 1,
      date: '2024-01-20',
      time: '10:30 AM',
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
      heartRate: 72,
      temperature: 98.6,
      oxygenSaturation: 98,
      weight: 70,
      bloodSugar: 110
    },
    {
      id: 2,
      date: '2024-01-18',
      time: '11:00 AM',
      bloodPressureSystolic: 125,
      bloodPressureDiastolic: 82,
      heartRate: 75,
      temperature: 98.4,
      oxygenSaturation: 97,
      weight: 70.5,
      bloodSugar: 115
    },
  ]);

  const [newVital, setNewVital] = useState({
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    temperature: '',
    oxygenSaturation: '',
    weight: '',
    bloodSugar: ''
  });

  const handleAddVital = () => {
    if (!newVital.bloodPressureSystolic || !newVital.heartRate) {
      toast.error('Please fill required fields (BP and Heart Rate)');
      return;
    }

    const vital: VitalRecord = {
      id: vitals.length + 1,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      bloodPressureSystolic: parseInt(newVital.bloodPressureSystolic),
      bloodPressureDiastolic: parseInt(newVital.bloodPressureDiastolic),
      heartRate: parseInt(newVital.heartRate),
      temperature: parseFloat(newVital.temperature) || 98.6,
      oxygenSaturation: parseInt(newVital.oxygenSaturation) || 98,
      weight: parseFloat(newVital.weight) || 0,
      bloodSugar: parseInt(newVital.bloodSugar) || 0
    };

    setVitals([vital, ...vitals]);
    setNewVital({
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      heartRate: '',
      temperature: '',
      oxygenSaturation: '',
      weight: '',
      bloodSugar: ''
    });
    toast.success('Vitals recorded successfully');
  };

  const getTrend = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getBPStatus = (systolic: number, diastolic: number) => {
    if (systolic >= 140 || diastolic >= 90) return { label: 'High', color: 'text-red-600 bg-red-50' };
    if (systolic < 90 || diastolic < 60) return { label: 'Low', color: 'text-blue-600 bg-blue-50' };
    return { label: 'Normal', color: 'text-green-600 bg-green-50' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-900">Vitals Tracking</h2>
              <p className="text-sm text-gray-600">{patientName} ({patientId})</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Add New Vital */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-gray-900 mb-4">Record New Vitals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-xs">BP Systolic *</Label>
                <Input
                  type="number"
                  placeholder="120"
                  value={newVital.bloodPressureSystolic}
                  onChange={(e) => setNewVital({...newVital, bloodPressureSystolic: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">BP Diastolic *</Label>
                <Input
                  type="number"
                  placeholder="80"
                  value={newVital.bloodPressureDiastolic}
                  onChange={(e) => setNewVital({...newVital, bloodPressureDiastolic: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Heart Rate *</Label>
                <Input
                  type="number"
                  placeholder="72"
                  value={newVital.heartRate}
                  onChange={(e) => setNewVital({...newVital, heartRate: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Temperature (°F)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="98.6"
                  value={newVital.temperature}
                  onChange={(e) => setNewVital({...newVital, temperature: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">SpO2 (%)</Label>
                <Input
                  type="number"
                  placeholder="98"
                  value={newVital.oxygenSaturation}
                  onChange={(e) => setNewVital({...newVital, oxygenSaturation: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Weight (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="70"
                  value={newVital.weight}
                  onChange={(e) => setNewVital({...newVital, weight: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Blood Sugar</Label>
                <Input
                  type="number"
                  placeholder="110"
                  value={newVital.bloodSugar}
                  onChange={(e) => setNewVital({...newVital, bloodSugar: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddVital} className="w-full bg-[#1A73E8] hover:bg-[#1557B0]">
                  <Activity className="w-4 h-4 mr-2" />
                  Record
                </Button>
              </div>
            </div>
          </div>

          {/* Vitals History */}
          <div>
            <h3 className="text-gray-900 mb-4">Vitals History</h3>
            <div className="space-y-3">
              {vitals.map((vital, index) => {
                const previous = vitals[index + 1];
                const bpStatus = getBPStatus(vital.bloodPressureSystolic, vital.bloodPressureDiastolic);
                
                return (
                  <div key={vital.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-gray-600">
                        {new Date(vital.date).toLocaleDateString('en-IN')} at {vital.time}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${bpStatus.color}`}>
                        {bpStatus.label}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                          <Activity className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Blood Pressure</div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{vital.bloodPressureSystolic}/{vital.bloodPressureDiastolic}</span>
                            {previous && getTrend(vital.bloodPressureSystolic, previous.bloodPressureSystolic)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                          <Heart className="w-5 h-5 text-pink-500" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Heart Rate</div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{vital.heartRate} bpm</span>
                            {previous && getTrend(vital.heartRate, previous.heartRate)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                          <Thermometer className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Temperature</div>
                          <span className="font-medium">{vital.temperature}°F</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                          <Droplets className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">SpO2</div>
                          <span className="font-medium">{vital.oxygenSaturation}%</span>
                        </div>
                      </div>

                      {vital.weight > 0 && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                            <Weight className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Weight</div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{vital.weight} kg</span>
                              {previous && previous.weight > 0 && getTrend(vital.weight, previous.weight)}
                            </div>
                          </div>
                        </div>
                      )}

                      {vital.bloodSugar > 0 && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                            <Droplets className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Blood Sugar</div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{vital.bloodSugar} mg/dL</span>
                              {previous && previous.bloodSugar > 0 && getTrend(vital.bloodSugar, previous.bloodSugar)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

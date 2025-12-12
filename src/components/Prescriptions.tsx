import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Printer, Send, Mic, MicOff, Star, FileText } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import logo from 'figma:asset/e69f99b7f89c8400a7a65b1e073263c7642e5570.png';
import { toast } from 'sonner@2.0.3';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  duration: string;
}

interface CommonPrescription {
  id: number;
  name: string;
  diagnosis: string;
  medicines: Medicine[];
  advice: string;
}

// Comprehensive Medicine Database (Indian Pharmacy)
const medicineDatabase = [
  // P
  'Paracetamol 500mg', 'Paracetamol 650mg', 'Pantoprazole 40mg', 'Pantoprazole 20mg',
  'Prednisolone 5mg', 'Prednisolone 10mg', 'Promethazine 25mg', 'Piracetam 800mg',
  'Phenytoin 100mg', 'Propranolol 40mg', 'Prazosin 1mg', 'Penicillin V 250mg',
  // A
  'Azithromycin 500mg', 'Azithromycin 250mg', 'Amoxicillin 500mg', 'Amlodipine 5mg',
  'Amlodipine 10mg', 'Atenolol 50mg', 'Atenolol 25mg', 'Aspirin 75mg', 'Aspirin 150mg',
  'Atorvastatin 10mg', 'Atorvastatin 20mg', 'Alprazolam 0.25mg', 'Alprazolam 0.5mg',
  'Aceclofenac 100mg', 'Ambroxol 30mg',
  // C
  'Cetirizine 10mg', 'Ciprofloxacin 500mg', 'Ciprofloxacin 250mg', 'Clopidogrel 75mg',
  'Chlorpheniramine 4mg', 'Clarithromycin 500mg', 'Calcium Carbonate 500mg',
  'Cefixime 200mg', 'Cefuroxime 250mg', 'Clonazepam 0.5mg',
  // D
  'Diclofenac 50mg', 'Domperidone 10mg', 'Doxycycline 100mg', 'Duloxetine 20mg',
  'Digoxin 0.25mg', 'Dexamethasone 0.5mg', 'Diazepam 5mg', 'Dolo 650',
  // E
  'Enalapril 5mg', 'Erythromycin 250mg', 'Esomeprazole 40mg', 'Ethambutol 400mg',
  // F
  'Furosemide 40mg', 'Fluconazole 150mg', 'Fexofenadine 120mg', 'Ferrous Sulfate 200mg',
  // G
  'Gabapentin 300mg', 'Glimepiride 1mg', 'Glimepiride 2mg', 'Glimepiride 4mg',
  'Gliclazide 80mg', 'Glibenclamide 5mg', 'Gentamicin Eye Drops',
  // I
  'Ibuprofen 400mg', 'Ibuprofen 200mg', 'Insulin Glargine', 'Insulin Regular',
  'Isosorbide 10mg', 'Ivermectin 12mg',
  // L
  'Levothyroxine 50mcg', 'Levothyroxine 100mcg', 'Lisinopril 5mg', 'Levofloxacin 500mg',
  'Lorazepam 1mg', 'Losartan 50mg', 'Levocetirizine 5mg',
  // M
  'Metformin 500mg', 'Metformin 850mg', 'Metformin 1000mg', 'Metronidazole 400mg',
  'Montelukast 10mg', 'Mefenamic Acid 250mg', 'Metoprolol 25mg', 'Metoprolol 50mg',
  'Multivitamin', 'Moxifloxacin 400mg',
  // N
  'Nifedipine 10mg', 'Nitroglycerin', 'Norfloxacin 400mg', 'Nebivolol 5mg',
  // O
  'Omeprazole 20mg', 'Omeprazole 40mg', 'Ofloxacin 200mg', 'Ondansetron 4mg',
  'Ondansetron 8mg', 'Olmesartan 20mg', 'Oral Rehydration Salts (ORS)',
  // R
  'Ranitidine 150mg', 'Rifampicin 450mg', 'Ramipril 2.5mg', 'Ramipril 5mg',
  'Rosuvastatin 10mg', 'Rosuvastatin 20mg',
  // S
  'Salbutamol Inhaler', 'Simvastatin 20mg', 'Spironolactone 25mg', 'Sertraline 50mg',
  'Sildenafil 50mg', 'Sulfasalazine 500mg',
  // T
  'Tramadol 50mg', 'Telmisartan 40mg', 'Telmisartan 80mg', 'Tamsulosin 0.4mg',
  'Theophylline 200mg', 'Thyronorm 50mcg', 'Thyronorm 100mcg',
  // V
  'Vitamin D3 60000 IU', 'Vitamin B12 1500mcg', 'Vitamin C 500mg', 'Valsartan 80mg',
  // Z
  'Zinc Sulfate 20mg', 'Zolpidem 5mg', 'Zolpidem 10mg'
].sort();

// Common prescription templates
const defaultCommonPrescriptions: CommonPrescription[] = [
  {
    id: 1,
    name: 'Common Cold & Fever',
    diagnosis: 'Upper Respiratory Tract Infection (URTI)',
    medicines: [
      { id: 1, name: 'Paracetamol 500mg', dosage: '1-0-1', duration: '3 days' },
      { id: 2, name: 'Cetirizine 10mg', dosage: '0-0-1', duration: '5 days' },
    ],
    advice: 'Take rest, drink plenty of fluids, avoid cold foods'
  },
  {
    id: 2,
    name: 'Hypertension Follow-up',
    diagnosis: 'Essential Hypertension - Follow-up',
    medicines: [
      { id: 1, name: 'Amlodipine 5mg', dosage: '1-0-0', duration: '30 days' },
      { id: 2, name: 'Atenolol 50mg', dosage: '0-0-1', duration: '30 days' },
    ],
    advice: 'Low salt diet, regular exercise, monitor BP daily'
  },
  {
    id: 3,
    name: 'Diabetes Management',
    diagnosis: 'Type 2 Diabetes Mellitus',
    medicines: [
      { id: 1, name: 'Metformin 500mg', dosage: '1-0-1', duration: '30 days' },
      { id: 2, name: 'Glimepiride 2mg', dosage: '1-0-0', duration: '30 days' },
    ],
    advice: 'Regular blood sugar monitoring, diabetic diet, daily walk 30 mins'
  }
];

// Drug interactions database
const drugInteractions: Record<string, string[]> = {
  'Aspirin': ['Warfarin', 'Clopidogrel', 'Ibuprofen', 'Naproxen'],
  'Warfarin': ['Aspirin', 'Clopidogrel', 'NSAIDs', 'Azithromycin'],
  'Metformin': ['Alcohol', 'Insulin'],
  'Amlodipine': ['Simvastatin', 'Atorvastatin'],
  'Atenolol': ['Insulin', 'Verapamil', 'Diltiazem'],
  'Ciprofloxacin': ['Antacids', 'Calcium supplements', 'Iron supplements'],
  'Clarithromycin': ['Statins', 'Warfarin', 'Digoxin'],
  'Digoxin': ['Amiodarone', 'Verapamil', 'Clarithromycin'],
  'Methotrexate': ['NSAIDs', 'Penicillin', 'Probenecid'],
  'Phenytoin': ['Warfarin', 'Oral contraceptives', 'Folic acid'],
  'NSAIDs': ['Aspirin', 'Warfarin', 'ACE inhibitors', 'Diuretics']
};

export function Prescriptions() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: '', dosage: '', duration: '' }
  ]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [advice, setAdvice] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [commonPrescriptions, setCommonPrescriptions] = useState<CommonPrescription[]>(defaultCommonPrescriptions);
  const [activeMedicineId, setActiveMedicineId] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [interactions, setInteractions] = useState<string[]>([]);

  // Load common prescription
  const loadCommonPrescription = (preset: CommonPrescription) => {
    setDiagnosis(preset.diagnosis);
    setMedicines(preset.medicines.map(m => ({ ...m })));
    setAdvice(preset.advice);
    toast.success(`Loaded template: ${preset.name}`);
  };

  // Voice to prescription
  const toggleVoiceInput = () => {
    if (!isListening) {
      // Start listening
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
          toast.info('Listening... Speak now');
        };

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join('');
          
          // Simple vocabulary learning - detect medicine names and common patterns
          if (transcript.toLowerCase().includes('paracetamol') || transcript.toLowerCase().includes('dolo')) {
            setSymptoms(prev => prev + (prev ? '\n' : '') + transcript);
            toast.success('Recognized prescription pattern');
          } else {
            setSymptoms(prev => prev + (prev ? ' ' : '') + transcript);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
          toast.error('Voice recognition error');
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        (window as any).currentRecognition = recognition;
      } else {
        toast.error('Voice recognition not supported in this browser');
      }
    } else {
      // Stop listening
      if ((window as any).currentRecognition) {
        (window as any).currentRecognition.stop();
      }
      setIsListening(false);
      toast.info('Stopped listening');
    }
  };

  const addMedicine = () => {
    const newId = Math.max(...medicines.map(m => m.id), 0) + 1;
    setMedicines([...medicines, { id: newId, name: '', dosage: '', duration: '' }]);
    toast.success('Medicine row added');
  };

  const removeMedicine = (id: number) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter(m => m.id !== id));
      toast.success('Medicine removed');
    } else {
      toast.error('At least one medicine is required');
    }
  };

  const updateMedicine = (id: number, field: string, value: string) => {
    setMedicines(medicines.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));

    // Show autocomplete suggestions for medicine name
    if (field === 'name' && value.length > 0) {
      const filtered = medicineDatabase.filter(med =>
        med.toLowerCase().startsWith(value.toLowerCase())
      ).slice(0, 10); // Show max 10 suggestions
      setSuggestions(filtered);
      setActiveMedicineId(id);
    } else if (field === 'name') {
      setSuggestions([]);
      setActiveMedicineId(null);
    }
  };

  const selectMedicine = (medicineId: number, medicineName: string) => {
    setMedicines(medicines.map(m => 
      m.id === medicineId ? { ...m, name: medicineName } : m
    ));
    setSuggestions([]);
    setActiveMedicineId(null);
    toast.success(`Selected: ${medicineName}`);
    
    // Check for drug interactions
    checkDrugInteractions([...medicines.filter(m => m.id !== medicineId).map(m => m.name), medicineName]);
  };

  const checkDrugInteractions = (medicineList: string[]) => {
    const foundInteractions: string[] = [];
    
    medicineList.forEach((med1, i) => {
      const baseMed1 = med1.split(' ')[0]; // Get base name without dosage
      medicineList.slice(i + 1).forEach(med2 => {
        const baseMed2 = med2.split(' ')[0];
        
        // Check if med1 interacts with med2
        if (drugInteractions[baseMed1]?.some(int => baseMed2.includes(int))) {
          foundInteractions.push(`${baseMed1} ⚠️ ${baseMed2}`);
        }
        // Check reverse
        if (drugInteractions[baseMed2]?.some(int => baseMed1.includes(int))) {
          if (!foundInteractions.includes(`${baseMed1} ⚠️ ${baseMed2}`)) {
            foundInteractions.push(`${baseMed2} ⚠️ ${baseMed1}`);
          }
        }
      });
    });
    
    setInteractions(foundInteractions);
    if (foundInteractions.length > 0) {
      toast.warning(`Drug interaction detected!`);
    }
  };

  const handleSavePrescription = () => {
    if (!selectedPatient) {
      toast.error('Please select a patient');
      return;
    }
    if (!patientAge) {
      toast.error('Please enter patient age');
      return;
    }
    if (!patientGender) {
      toast.error('Please select patient gender');
      return;
    }
    if (!diagnosis) {
      toast.error('Please enter diagnosis');
      return;
    }
    if (!medicines.some(m => m.name)) {
      toast.error('Please add at least one medicine');
      return;
    }
    toast.success('Prescription saved successfully');
  };

  const handlePrintPrescription = () => {
    if (!selectedPatient) {
      toast.error('Please select a patient first');
      return;
    }
    
    // Create print window
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const patientName = selectedPatient === 'P001' ? 'Rajesh Kumar' : 
                         selectedPatient === 'P002' ? 'Priya Sharma' : 
                         selectedPatient === 'P003' ? 'Amit Patel' : 'Patient';
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Prescription - ${patientName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Inter', Arial, sans-serif; 
              padding: 40px;
              color: #1f2937;
            }
            .prescription {
              max-width: 800px;
              margin: 0 auto;
              border: 2px solid #1A73E8;
              padding: 30px;
              border-radius: 12px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #1A73E8;
              padding-bottom: 20px;
              margin-bottom: 20px;
            }
            .header h1 {
              color: #1A73E8;
              font-size: 28px;
              margin-bottom: 8px;
            }
            .header p {
              color: #6b7280;
              font-size: 14px;
              margin: 4px 0;
            }
            .patient-info {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              margin-bottom: 24px;
              padding: 16px;
              background: #f9fafb;
              border-radius: 8px;
            }
            .patient-info div {
              font-size: 14px;
            }
            .patient-info strong {
              color: #374151;
            }
            .section {
              margin-bottom: 24px;
            }
            .section-title {
              color: #1A73E8;
              font-size: 16px;
              margin-bottom: 12px;
              font-weight: 600;
            }
            .medicines {
              border-left: 3px solid #1A73E8;
              padding-left: 16px;
            }
            .medicine-item {
              margin-bottom: 12px;
              padding: 8px 0;
            }
            .medicine-name {
              font-weight: 600;
              color: #1f2937;
              font-size: 14px;
            }
            .medicine-details {
              color: #6b7280;
              font-size: 13px;
              margin-top: 4px;
            }
            .signature-section {
              margin-top: 40px;
              padding-top: 24px;
              border-top: 1px solid #e5e7eb;
              text-align: right;
            }
            .signature {
              display: inline-block;
              text-align: right;
            }
            .signature-line {
              width: 200px;
              margin-bottom: 8px;
            }
            .doctor-name {
              font-weight: 600;
              color: #1f2937;
              font-size: 14px;
              margin-top: 8px;
            }
            .doctor-credentials {
              color: #6b7280;
              font-size: 12px;
              margin-top: 2px;
            }
            .footer {
              margin-top: 32px;
              padding-top: 16px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #9ca3af;
              font-size: 12px;
            }
            @media print {
              body { padding: 20px; }
              .prescription { border-color: #000; }
            }
          </style>
        </head>
        <body>
          <div class="prescription">
            <div class="header">
              <h1>SehatNxt+</h1>
              <p><strong>Dr. Sharma, MBBS, MD</strong></p>
              <p>Reg. No: 12345 | Contact: +91 98765 43210</p>
              <p>Sharma Clinic, MG Road, Mumbai - 400001</p>
            </div>

            <div class="patient-info">
              <div><strong>Patient Name:</strong> ${patientName}</div>
              <div><strong>Patient ID:</strong> ${selectedPatient}</div>
              <div><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
              <div><strong>Age/Gender:</strong> ${patientAge && patientGender ? `${patientAge} / ${patientGender}` : (patientAge || patientGender || '-')}</div>
            </div>

            ${symptoms ? `
            <div class="section">
              <div class="section-title">Symptoms</div>
              <p style="color: #4b5563; font-size: 14px;">${symptoms}</p>
            </div>
            ` : ''}

            ${diagnosis ? `
            <div class="section">
              <div class="section-title">Diagnosis</div>
              <p style="color: #4b5563; font-size: 14px;">${diagnosis}</p>
            </div>
            ` : ''}

            <div class="section">
              <div class="section-title">Rx (Prescription)</div>
              <div class="medicines">
                ${medicines.filter(m => m.name).map((med, index) => `
                  <div class="medicine-item">
                    <div class="medicine-name">${index + 1}. ${med.name}</div>
                    ${med.dosage ? `<div class="medicine-details">${med.dosage}${med.duration ? ' - ' + med.duration : ''}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>

            ${advice ? `
            <div class="section">
              <div class="section-title">Advice & Instructions</div>
              <p style="color: #4b5563; font-size: 14px;">${advice}</p>
            </div>
            ` : ''}

            <div class="signature-section">
              <div class="signature">
                <svg width="150" height="60" viewBox="0 0 120 50" style="display: block;">
                  <path
                    d="M10 25 Q 20 10, 35 20 T 50 25 Q 60 30, 70 20 T 85 25 Q 95 30, 105 20"
                    stroke="#1A73E8"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                  />
                  <path
                    d="M15 30 Q 25 35, 40 28 T 60 30"
                    stroke="#1A73E8"
                    stroke-width="1.5"
                    fill="none"
                    stroke-linecap="round"
                  />
                </svg>
                <div class="doctor-name">Dr. Sharma</div>
                <div class="doctor-credentials">MBBS, MD</div>
                <div class="doctor-credentials">Reg. No: 12345</div>
              </div>
            </div>

            <div class="footer">
              <p>This is a computer-generated prescription and is valid with doctor's signature.</p>
              <p>For any queries, please contact: +91 98765 43210 | info@sharmaclinic.com</p>
            </div>
          </div>
        </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
      }, 250);
      
      toast.success('Prescription ready for printing');
    }
  };

  const handleSharePrescription = () => {
    if (!selectedPatient) {
      toast.error('Please select a patient first');
      return;
    }
    toast.success('Prescription shared with pharmacy');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 text-2xl md:text-3xl">Create Prescription</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Generate prescription for your patient</p>
        </div>
        <div className="hidden md:block">
          <img src={logo} alt="SehatNxt+" className="h-16 w-auto opacity-50" />
        </div>
      </div>

      {/* Common Prescriptions */}
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-[#1A73E8]" strokeWidth={2} />
          <h2 className="text-gray-900">Quick Load: Common Prescriptions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {commonPrescriptions.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadCommonPrescription(preset)}
              className="bg-white rounded-xl p-4 text-left hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <FileText className="w-5 h-5 text-[#1A73E8]" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">{preset.name}</div>
                  <div className="text-xs text-gray-500">{preset.medicines.length} medicines</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Prescription Form */}
        <div className="lg:col-span-1 space-y-6">
          {/* Patient Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-4">Patient Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient">Select Patient</Label>
                <select
                  id="patient"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8] transition-all"
                >
                  <option value="">Search or select patient...</option>
                  <option value="P001">Rajesh Kumar (P001)</option>
                  <option value="P002">Priya Sharma (P002)</option>
                  <option value="P003">Amit Patel (P003)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number"
                    min="0"
                    max="150"
                    placeholder="Enter age" 
                    value={patientAge}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 150)) {
                        setPatientAge(value);
                      }
                    }}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full mt-1 px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8] transition-all"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Symptoms & Diagnosis</h2>
              <button
                onClick={toggleVoiceInput}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white hover:shadow-lg'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4" strokeWidth={2} />
                    <span className="text-sm">Stop</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" strokeWidth={2} />
                    <span className="text-sm">Voice Input</span>
                  </>
                )}
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="symptoms">Symptoms</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Enter patient symptoms or use voice input..."
                  rows={3}
                  className="mt-1"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
                {isListening && (
                  <div className="mt-2 text-sm text-blue-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    Listening... Speak now
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Textarea
                  id="diagnosis"
                  placeholder="Enter diagnosis..."
                  rows={3}
                  className="mt-1"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Drug Interaction Alert */}
          {interactions.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-red-900 mb-2">⚠️ Drug Interaction Alert</h3>
                  <div className="space-y-1">
                    {interactions.map((interaction, idx) => (
                      <p key={idx} className="text-sm text-red-700">• {interaction}</p>
                    ))}
                  </div>
                  <p className="text-xs text-red-600 mt-2">Please review before prescribing</p>
                </div>
              </div>
            </div>
          )}

          {/* Medicines */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Medicines</h2>
              <button
                onClick={addMedicine}
                className="flex items-center gap-2 px-3 py-2 bg-[#00BFA5] text-white rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all"
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
                <span>Add Medicine</span>
              </button>
            </div>

            {/* Info Banner */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
              <div className="p-1 bg-blue-100 rounded-lg">
                <FileText className="w-4 h-4 text-blue-600" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-900">
                  <strong>Smart Medicine Search:</strong> Type any letter to see matching medicines. 
                  Try "P" for Paracetamol, "A" for Azithromycin, etc.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {medicines.map((medicine, index) => (
                <div key={medicine.id} className="grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-5 relative">
                    <Label htmlFor={`medicine-name-${medicine.id}`}>
                      {index === 0 ? 'Medicine Name' : ''}
                    </Label>
                    <Input
                      id={`medicine-name-${medicine.id}`}
                      placeholder="Type medicine name (e.g., P for Paracetamol)"
                      value={medicine.name}
                      onChange={(e) => updateMedicine(medicine.id, 'name', e.target.value)}
                      onFocus={() => {
                        if (medicine.name.length > 0) {
                          const filtered = medicineDatabase.filter(med =>
                            med.toLowerCase().startsWith(medicine.name.toLowerCase())
                          ).slice(0, 10);
                          setSuggestions(filtered);
                          setActiveMedicineId(medicine.id);
                        }
                      }}
                      onBlur={() => {
                        // Delay to allow click on suggestion
                        setTimeout(() => {
                          setSuggestions([]);
                          setActiveMedicineId(null);
                        }, 200);
                      }}
                      className={index === 0 ? 'mt-1' : ''}
                      autoComplete="off"
                    />
                    
                    {/* Autocomplete Dropdown */}
                    {activeMedicineId === medicine.id && suggestions.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                        {suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              selectMedicine(medicine.id, suggestion);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-[#1A73E8] rounded-full"></div>
                            <span className="text-sm text-gray-900">{suggestion}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor={`medicine-dosage-${medicine.id}`}>
                      {index === 0 ? 'Dosage (M-A-E)' : ''}
                    </Label>
                    <Input
                      id={`medicine-dosage-${medicine.id}`}
                      placeholder="1-0-1"
                      value={medicine.dosage}
                      onChange={(e) => {
                        let value = e.target.value;
                        
                        // Remove all non-numeric characters
                        const numbers = value.replace(/[^0-9]/g, '');
                        
                        // Auto-format with hyphens
                        if (numbers.length === 0) {
                          updateMedicine(medicine.id, 'dosage', '');
                        } else if (numbers.length === 1) {
                          updateMedicine(medicine.id, 'dosage', numbers);
                        } else if (numbers.length === 2) {
                          updateMedicine(medicine.id, 'dosage', `${numbers[0]}-${numbers[1]}`);
                        } else if (numbers.length >= 3) {
                          updateMedicine(medicine.id, 'dosage', `${numbers[0]}-${numbers[1]}-${numbers[2]}`);
                        }
                      }}
                      onBlur={(e) => {
                        // Auto-format on blur if incomplete
                        const value = e.target.value;
                        const numbers = value.replace(/[^0-9]/g, '');
                        if (numbers.length === 1) {
                          updateMedicine(medicine.id, 'dosage', `${numbers[0]}-0-0`);
                        } else if (numbers.length === 2) {
                          updateMedicine(medicine.id, 'dosage', `${numbers[0]}-${numbers[1]}-0`);
                        }
                      }}
                      className={index === 0 ? 'mt-1' : ''}
                      maxLength={5}
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor={`medicine-duration-${medicine.id}`}>
                      {index === 0 ? 'Duration' : ''}
                    </Label>
                    <Input
                      id={`medicine-duration-${medicine.id}`}
                      placeholder="e.g., 5 days"
                      value={medicine.duration}
                      onChange={(e) => updateMedicine(medicine.id, 'duration', e.target.value)}
                      className={index === 0 ? 'mt-1' : ''}
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => removeMedicine(medicine.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      disabled={medicines.length === 1}
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advice */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-4">Advice & Notes for Patient</h2>
            <Textarea
              placeholder="Enter any advice or special notes for the patient...&#10;e.g., Take rest, drink plenty of fluids, avoid cold foods, regular exercise, etc."
              rows={5}
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              className="min-h-[120px]"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 This will be printed on the prescription and shown in the preview
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button 
              onClick={handleSavePrescription}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <Save className="w-5 h-5" strokeWidth={2} />
              <span className="font-medium">Save Prescription</span>
            </button>
            <button 
              onClick={handlePrintPrescription}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1A73E8] border-2 border-[#1A73E8] rounded-xl hover:bg-blue-50 transition-all"
            >
              <Printer className="w-5 h-5" strokeWidth={2} />
              <span className="font-medium">Print</span>
            </button>
            <button 
              onClick={handleSharePrescription}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#00BFA5] border-2 border-[#00BFA5] rounded-xl hover:bg-teal-50 transition-all"
            >
              <Send className="w-5 h-5" strokeWidth={2} />
              <span className="font-medium">Share</span>
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <h2 className="text-gray-900 mb-4">Prescription Preview</h2>
            <div className="p-4 md:p-6 bg-gray-50 rounded-xl min-h-[600px] md:min-h-[800px]">
              <div className="text-center mb-6 pb-6 border-b-2 border-gray-300">
                <img src={logo} alt="SehatNxt+" className="h-20 w-auto mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Dr. Sharma, MBBS, MD</h3>
                <p className="text-xs text-gray-500">Reg. No: 12345</p>
                <p className="text-xs text-gray-500">Sharma Clinic, MG Road, Mumbai</p>
                <p className="text-xs text-gray-500">Contact: +91 98765 43210</p>
              </div>
              
              <div className="space-y-5 text-sm">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-gray-600 text-xs mb-1"><strong>Patient:</strong> <span className="text-gray-900">{selectedPatient ? (selectedPatient === 'P001' ? 'Rajesh Kumar' : selectedPatient === 'P002' ? 'Priya Sharma' : 'Amit Patel') : '-'}</span></p>
                  <p className="text-gray-600 text-xs mb-1"><strong>Patient ID:</strong> <span className="text-gray-900">{selectedPatient || '-'}</span></p>
                  <p className="text-gray-600 text-xs mb-1"><strong>Date:</strong> <span className="text-gray-900">{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                  <p className="text-gray-600 text-xs"><strong>Age/Gender:</strong> <span className="text-gray-900">{patientAge && patientGender ? `${patientAge} / ${patientGender}` : (patientAge || patientGender || '-')}</span></p>
                </div>
                
                {/* Symptoms */}
                {symptoms && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-[#1A73E8] mb-2 font-semibold text-sm">Symptoms:</p>
                    <p className="text-gray-900 text-xs leading-relaxed pl-2">{symptoms}</p>
                  </div>
                )}

                {/* Diagnosis */}
                {diagnosis && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-[#1A73E8] mb-2 font-semibold text-sm">Diagnosis:</p>
                    <p className="text-gray-900 text-xs leading-relaxed pl-2">{diagnosis}</p>
                  </div>
                )}
                
                <div className="bg-white p-4 rounded-lg border-l-4 border-l-[#1A73E8] border-t border-r border-b border-gray-200">
                  <p className="text-[#1A73E8] mb-3 font-semibold">℞ Prescription</p>
                  {medicines.filter(m => m.name).length > 0 ? (
                    <div className="space-y-3">
                      {medicines.filter(m => m.name).map((med, index) => (
                        <div key={med.id} className="pb-3 border-b border-gray-100 last:border-b-0">
                          <p className="text-gray-900 font-medium text-sm">{index + 1}. {med.name}</p>
                          {med.dosage && (
                            <div className="mt-1 pl-4">
                              <p className="text-gray-600 text-xs">Dosage: {med.dosage}</p>
                              {med.duration && <p className="text-gray-600 text-xs">Duration: {med.duration}</p>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-xs italic">No medicines added yet</p>
                  )}
                </div>

                {/* Advice */}
                {advice && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-[#1A73E8] mb-2 font-semibold text-sm">Advice & Instructions:</p>
                    <p className="text-gray-900 text-xs leading-relaxed pl-2 whitespace-pre-line">{advice}</p>
                  </div>
                )}

                {/* Doctor's Signature */}
                <div className="pt-8 mt-8 border-t-2 border-gray-300">
                  <div className="flex flex-col items-end">
                    <div className="mb-3">
                      <svg width="140" height="60" viewBox="0 0 120 50" className="text-[#1A73E8]">
                        <path
                          d="M10 25 Q 20 10, 35 20 T 50 25 Q 60 30, 70 20 T 85 25 Q 95 30, 105 20"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <path
                          d="M15 30 Q 25 35, 40 28 T 60 30"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="text-right bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">Dr. Sharma</p>
                      <p className="text-xs text-gray-600 mt-1">MBBS, MD</p>
                      <p className="text-xs text-gray-500">Reg. No: 12345</p>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-400 text-center italic">
                    This is a computer-generated prescription and is valid with doctor's signature.
                  </p>
                  <p className="text-xs text-gray-400 text-center mt-1">
                    For queries: +91 98765 43210 | info@sharmaclinic.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

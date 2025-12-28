import { useState } from 'react';
import { Users, UserPlus, Search, FileText, TrendingUp, Calendar, CheckCircle, XCircle, Phone, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

interface Referral {
  id: number;
  patientName: string;
  patientId: string;
  referredTo: string;
  specialty: string;
  reason: string;
  referralDate: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  urgency: 'routine' | 'urgent' | 'emergency';
  contact: string;
  notes: string;
}

export function ReferralManagement() {
  const [showNewReferral, setShowNewReferral] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: 1,
      patientName: 'Rajesh Kumar',
      patientId: 'PAT001',
      referredTo: 'Dr. Anjali Mehta',
      specialty: 'Cardiology',
      reason: 'Suspected coronary artery disease, requires ECG and Echo',
      referralDate: '2024-01-20',
      status: 'pending',
      urgency: 'urgent',
      contact: '+91 98765 43210',
      notes: 'Patient has chest pain for 3 days'
    },
    {
      id: 2,
      patientName: 'Priya Sharma',
      patientId: 'PAT045',
      referredTo: 'Dr. Vikram Singh',
      specialty: 'Orthopedics',
      reason: 'Chronic knee pain, possible arthritis',
      referralDate: '2024-01-18',
      status: 'accepted',
      urgency: 'routine',
      contact: '+91 98123 45678',
      notes: 'Follow-up after 2 weeks'
    },
    {
      id: 3,
      patientName: 'Amit Patel',
      patientId: 'PAT023',
      referredTo: 'Dr. Sunita Rao',
      specialty: 'Endocrinology',
      reason: 'Uncontrolled diabetes, HbA1c 9.2%',
      referralDate: '2024-01-15',
      status: 'completed',
      urgency: 'urgent',
      contact: '+91 99876 54321',
      notes: 'Treatment plan adjusted'
    },
  ]);

  const [newReferral, setNewReferral] = useState({
    patientName: '',
    patientId: '',
    referredTo: '',
    specialty: '',
    reason: '',
    urgency: 'routine' as const,
    contact: '',
    notes: ''
  });

  const specialties = [
    'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 
    'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics', 
    'Psychiatry', 'Pulmonology', 'Urology', 'ENT'
  ];

  const filteredReferrals = referrals.filter(ref =>
    ref.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.referredTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitReferral = () => {
    if (!newReferral.patientName || !newReferral.referredTo || !newReferral.reason) {
      toast.error('Please fill all required fields');
      return;
    }

    const referral: Referral = {
      id: referrals.length + 1,
      ...newReferral,
      referralDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setReferrals([referral, ...referrals]);
    setShowNewReferral(false);
    setNewReferral({
      patientName: '',
      patientId: '',
      referredTo: '',
      specialty: '',
      reason: '',
      urgency: 'routine',
      contact: '',
      notes: ''
    });
    toast.success('Referral created successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'accepted': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'declined': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-500';
      case 'urgent': return 'bg-orange-500';
      case 'routine': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Calendar className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'declined': return <XCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Referral Management</h1>
          <p className="text-sm text-gray-600">Track and manage specialist referrals</p>
        </div>
        <Button 
          onClick={() => setShowNewReferral(!showNewReferral)} 
          className="bg-[#1A73E8] hover:bg-[#1557B0]"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          New Referral
        </Button>
      </div>

      {/* New Referral Form */}
      {showNewReferral && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-gray-900 mb-4">Create New Referral</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input
                id="patientName"
                value={newReferral.patientName}
                onChange={(e) => setNewReferral({...newReferral, patientName: e.target.value})}
                placeholder="Enter patient name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                value={newReferral.patientId}
                onChange={(e) => setNewReferral({...newReferral, patientId: e.target.value})}
                placeholder="e.g., PAT001"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="referredTo">Refer to Doctor *</Label>
              <Input
                id="referredTo"
                value={newReferral.referredTo}
                onChange={(e) => setNewReferral({...newReferral, referredTo: e.target.value})}
                placeholder="Dr. Name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty *</Label>
              <select
                id="specialty"
                value={newReferral.specialty}
                onChange={(e) => setNewReferral({...newReferral, specialty: e.target.value})}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
              >
                <option value="">Select specialty</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                value={newReferral.contact}
                onChange={(e) => setNewReferral({...newReferral, contact: e.target.value})}
                placeholder="+91 XXXXX XXXXX"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="urgency">Urgency</Label>
              <select
                id="urgency"
                value={newReferral.urgency}
                onChange={(e) => setNewReferral({...newReferral, urgency: e.target.value as any})}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
              >
                <option value="routine">Routine</option>
                <option value="urgent">Urgent</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="reason">Reason for Referral *</Label>
              <Textarea
                id="reason"
                value={newReferral.reason}
                onChange={(e) => setNewReferral({...newReferral, reason: e.target.value})}
                placeholder="Describe the reason for referral..."
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={newReferral.notes}
                onChange={(e) => setNewReferral({...newReferral, notes: e.target.value})}
                placeholder="Any additional information..."
                className="mt-1"
                rows={2}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSubmitReferral} className="bg-[#1A73E8] hover:bg-[#1557B0]">
              <Send className="w-4 h-4 mr-2" />
              Send Referral
            </Button>
            <Button onClick={() => setShowNewReferral(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search referrals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Referrals List */}
      <div className="space-y-4">
        {filteredReferrals.map(referral => (
          <div key={referral.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-gray-900">{referral.patientName}</h3>
                  <span className="text-sm text-gray-500">({referral.patientId})</span>
                  <div className={`w-2 h-2 rounded-full ${getUrgencyColor(referral.urgency)}`} 
                       title={referral.urgency}></div>
                </div>
                <p className="text-sm text-gray-600">
                  Referred to: <span className="font-medium text-gray-900">{referral.referredTo}</span>
                  {' '}- {referral.specialty}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs border flex items-center gap-1 ${getStatusColor(referral.status)}`}>
                {getStatusIcon(referral.status)}
                {referral.status.toUpperCase()}
              </span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-3">
              <p className="text-sm text-gray-700">{referral.reason}</p>
              {referral.notes && (
                <p className="text-sm text-gray-600 mt-2 italic">Note: {referral.notes}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{referral.contact}</span>
                </div>
                <span>Referred on {new Date(referral.referralDate).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReferrals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No Referrals Found</h3>
          <p className="text-gray-600">Create a new referral to get started</p>
        </div>
      )}
    </div>
  );
}
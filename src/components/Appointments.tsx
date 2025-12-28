import { useState } from 'react';
import { Calendar, Clock, User, Plus, X, Search, Filter, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

const appointmentsData = [
  { id: 1, tokenNo: '01', name: 'Rajesh Kumar', time: '09:00 AM', status: 'checked', contact: '+91 98765 43210', reason: 'Regular checkup' },
  { id: 2, tokenNo: '02', name: 'Priya Sharma', time: '09:30 AM', status: 'pending', contact: '+91 98765 43211', reason: 'Fever & cold' },
  { id: 3, tokenNo: '03', name: 'Amit Patel', time: '10:00 AM', status: 'pending', contact: '+91 98765 43212', reason: 'Follow-up' },
  { id: 4, tokenNo: '04', name: 'Sneha Verma', time: '10:30 AM', status: 'pending', contact: '+91 98765 43213', reason: 'Skin consultation' },
  { id: 5, tokenNo: '05', name: 'Vikram Singh', time: '11:00 AM', status: 'cancelled', contact: '+91 98765 43214', reason: 'General checkup' },
  { id: 6, tokenNo: '06', name: 'Anjali Reddy', time: '11:30 AM', status: 'pending', contact: '+91 98765 43215', reason: 'Diabetes checkup' },
];

export function Appointments() {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    contact: '',
    time: '',
    reason: '',
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
    
    const appointment = appointments.find(apt => apt.id === id);
    if (newStatus === 'checked') {
      toast.success(`Appointment for ${appointment?.name} marked as checked`);
    } else if (newStatus === 'cancelled') {
      toast.error(`Appointment for ${appointment?.name} has been cancelled`);
    }
  };

  const getNextTokenNumber = () => {
    const maxToken = appointments.reduce((max, apt) => {
      const tokenNum = parseInt(apt.tokenNo);
      return tokenNum > max ? tokenNum : max;
    }, 0);
    return String(maxToken + 1).padStart(2, '0');
  };

  const convertTo12Hour = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const handleAddAppointment = () => {
    if (!newAppointment.name || !newAppointment.time) {
      toast.error('Please fill in patient name and appointment time');
      return;
    }

    const newId = Math.max(...appointments.map(a => a.id), 0) + 1;
    const tokenNo = getNextTokenNumber();
    const time12Hour = convertTo12Hour(newAppointment.time);

    const appointment = {
      id: newId,
      tokenNo,
      name: newAppointment.name,
      time: time12Hour,
      status: 'pending',
      contact: newAppointment.contact,
      reason: newAppointment.reason,
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({ name: '', contact: '', time: '', reason: '' });
    setIsModalOpen(false);
    toast.success(`Appointment scheduled for ${newAppointment.name} - Token #${tokenNo}`);
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 text-2xl md:text-3xl">Appointments</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Manage your patient appointments</p>
        </div>
        <div className="flex items-center gap-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#1A73E8] to-[#00BFA5] text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <Plus className="w-5 h-5" strokeWidth={2} />
                <span className="hidden sm:inline">Add Appointment</span>
                <span className="sm:hidden">Add</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Appointment</DialogTitle>
                <DialogDescription>Create a new appointment for a walk-in patient</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border-2 border-blue-100">
                  <p className="text-sm text-gray-600 mb-1">Next Token Number</p>
                  <p className="text-gray-900">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#1A73E8] to-[#00BFA5] text-white rounded-lg">
                      {getNextTokenNumber()}
                    </span>
                  </p>
                </div>
                <div>
                  <Label htmlFor="patient-name">Patient Name *</Label>
                  <Input 
                    id="patient-name" 
                    placeholder="Enter patient name" 
                    className="mt-1"
                    value={newAppointment.name}
                    onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Appointment Time *</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    className="mt-1 text-base"
                    style={{ colorScheme: 'light' }}
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Contact Number <span className="text-gray-400 text-xs">(Optional)</span></Label>
                  <Input 
                    id="contact" 
                    placeholder="+91 xxxxx xxxxx" 
                    className="mt-1"
                    value={newAppointment.contact}
                    onChange={(e) => setNewAppointment({ ...newAppointment, contact: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="reason">Reason for Visit <span className="text-gray-400 text-xs">(Optional)</span></Label>
                  <Input 
                    id="reason" 
                    placeholder="Brief reason" 
                    className="mt-1"
                    value={newAppointment.reason}
                    onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                  />
                </div>
                <button 
                  onClick={handleAddAppointment}
                  className="w-full py-3 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Schedule Appointment
                </button>
              </div>
            </DialogContent>
          </Dialog>
          <div className="hidden md:block">
            <img src="/logo.png" alt="SehatNxt+" className="h-16 w-auto opacity-50" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
          <Filter className="w-5 h-5 text-gray-500 hidden sm:block" strokeWidth={2} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8] transition-all text-sm md:text-base"
          >
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="checked">Checked</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            className="w-full sm:w-auto px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8] transition-all text-sm md:text-base"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-3 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">Token No.</th>
                <th className="text-left px-3 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">Patient Name</th>
                <th className="text-left px-3 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">Time</th>
                <th className="text-left px-3 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">Status</th>
                <th className="text-left px-3 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">Contact</th>
                <th className="text-left px-3 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">Reason</th>
                <th className="text-left px-3 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#1A73E8] to-[#00BFA5] text-white rounded-lg text-xs md:text-sm">
                      {appointment.tokenNo}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-gray-900 text-sm md:text-base">{appointment.name}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">{appointment.time}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <span className={`px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm capitalize ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">{appointment.contact}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">{appointment.reason}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <div className="flex gap-1 md:gap-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'checked')}
                            className="p-1.5 md:p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                            title="Mark as Checked"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                            className="p-1.5 md:p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Cancel"
                          >
                            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Plus Button - Opens Add Appointment Modal */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-[#1A73E8] to-[#00BFA5] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-3xl z-50"
        aria-label="Add New Appointment"
      >
        <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
}
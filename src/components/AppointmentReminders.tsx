import { useState } from 'react';
import { Bell, Send, Clock, CheckCircle, XCircle, MessageSquare, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import logo from 'figma:asset/e69f99b7f89c8400a7a65b1e073263c7642e5570.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface Reminder {
  id: number;
  patientName: string;
  patientContact: string;
  appointmentDate: string;
  appointmentTime: string;
  tokenNumber: string;
  reminderType: 'sms' | 'whatsapp' | 'call';
  status: 'pending' | 'sent' | 'failed';
  sentAt?: string;
}

export function AppointmentReminders() {
  const [autoReminders, setAutoReminders] = useState(true);
  const [reminderTime, setReminderTime] = useState('2'); // hours before appointment
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      patientName: 'Rajesh Kumar',
      patientContact: '+91 98765 43210',
      appointmentDate: '2024-01-21',
      appointmentTime: '10:30 AM',
      tokenNumber: '12',
      reminderType: 'sms',
      status: 'pending'
    },
    {
      id: 2,
      patientName: 'Priya Sharma',
      patientContact: '+91 98765 43211',
      appointmentDate: '2024-01-21',
      appointmentTime: '11:00 AM',
      tokenNumber: '13',
      reminderType: 'whatsapp',
      status: 'sent',
      sentAt: '2024-01-20 08:30 AM'
    },
    {
      id: 3,
      patientName: 'Amit Patel',
      patientContact: '+91 98765 43212',
      appointmentDate: '2024-01-21',
      appointmentTime: '2:00 PM',
      tokenNumber: '15',
      reminderType: 'sms',
      status: 'pending'
    },
  ]);

  const handleSendReminder = (id: number) => {
    setReminders(reminders.map(r => 
      r.id === id 
        ? { ...r, status: 'sent', sentAt: new Date().toLocaleString('en-IN') }
        : r
    ));
    toast.success('Reminder sent successfully!');
  };

  const handleSendAll = () => {
    const pending = reminders.filter(r => r.status === 'pending');
    setReminders(reminders.map(r => 
      r.status === 'pending'
        ? { ...r, status: 'sent', sentAt: new Date().toLocaleString('en-IN') }
        : r
    ));
    toast.success(`Sent ${pending.length} reminder(s)`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'call': return <Phone className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const pendingCount = reminders.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ImageWithFallback src={logo} alt="SehatNxt+" className="h-10 w-auto" />
          <div>
            <h1 className="text-gray-900">Appointment Reminders</h1>
            <p className="text-sm text-gray-600">Automated SMS & WhatsApp reminders</p>
          </div>
        </div>
        {pendingCount > 0 && (
          <Button onClick={handleSendAll} className="bg-[#1A73E8] hover:bg-[#1557B0]">
            <Send className="w-4 h-4 mr-2" />
            Send All ({pendingCount})
          </Button>
        )}
      </div>

      {/* Settings Card */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
        <h2 className="text-gray-900 mb-4">Reminder Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Automatic Reminders</Label>
              <p className="text-sm text-gray-600">Send reminders automatically before appointments</p>
            </div>
            <Switch
              checked={autoReminders}
              onCheckedChange={setAutoReminders}
            />
          </div>

          {autoReminders && (
            <div>
              <Label htmlFor="reminderTime">Send reminders before appointment</Label>
              <select
                id="reminderTime"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
              >
                <option value="1">1 hour before</option>
                <option value="2">2 hours before</option>
                <option value="4">4 hours before</option>
                <option value="24">1 day before</option>
              </select>
            </div>
          )}

          <div className="bg-white rounded-xl p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-[#1A73E8] mt-0.5" />
              <div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Reminder Template:</strong>
                </p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  "Hello [Patient Name], this is a reminder for your appointment tomorrow at [Time]. Your token number is [Token]. 
                  Please arrive 10 minutes early. - Dr. [Doctor Name], [Clinic Name]"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl">{pendingCount}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl">{reminders.filter(r => r.status === 'sent').length}</div>
              <div className="text-sm text-gray-600">Sent Today</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl">{reminders.length}</div>
              <div className="text-sm text-gray-600">Total Scheduled</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-gray-900 mb-4">Scheduled Reminders</h2>
        <div className="space-y-3">
          {reminders.map(reminder => (
            <div key={reminder.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-gray-900">{reminder.patientName}</h3>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                      Token #{reminder.tokenNumber}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      {getReminderIcon(reminder.reminderType)}
                      <span className="uppercase">{reminder.reminderType}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    📞 {reminder.patientContact}
                  </p>
                  <p className="text-sm text-gray-600">
                    📅 {new Date(reminder.appointmentDate).toLocaleDateString('en-IN')} at {reminder.appointmentTime}
                  </p>
                  {reminder.sentAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Sent at: {reminder.sentAt}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs border flex items-center gap-1 ${getStatusColor(reminder.status)}`}>
                    {getStatusIcon(reminder.status)}
                    {reminder.status.toUpperCase()}
                  </span>
                  
                  {reminder.status === 'pending' && (
                    <Button
                      onClick={() => handleSendReminder(reminder.id)}
                      size="sm"
                      className="bg-[#00BFA5] hover:bg-[#00A890]"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Send Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {reminders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No Reminders Scheduled</h3>
          <p className="text-gray-600">Reminders will appear here when appointments are created</p>
        </div>
      )}
    </div>
  );
}

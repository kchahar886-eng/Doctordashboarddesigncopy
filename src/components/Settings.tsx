import { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

export function Settings() {
  const [activeTab, setActiveTab] = useState('personal');

  const handleSaveChanges = () => {
    toast.success('Settings saved successfully');
  };

  const handleAddStaff = () => {
    toast.success('Add staff member form would open here');
  };

  const handleEditStaff = (staffName: string) => {
    toast.success(`Edit ${staffName}`);
  };

  const handleRemoveStaff = (staffName: string) => {
    toast.error(`${staffName} removed from staff`);
  };

  const handleUploadLogo = () => {
    toast.success('Logo upload feature would open here');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'clinic', label: 'Clinic Details' },
    { id: 'fees', label: 'Fees & Availability' },
    { id: 'staff', label: 'Staff Access' },
    { id: 'branding', label: 'Clinic Branding' },
  ];

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 text-2xl md:text-3xl">Settings</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Manage your account and clinic settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Tabs Sidebar - Horizontal on mobile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap lg:w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all text-sm md:text-base ${
                    activeTab === tab.id
                      ? 'bg-[#1A73E8] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            {activeTab === 'personal' && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-gray-900 text-lg md:text-xl">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" defaultValue="Dr. Sharma" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input id="qualification" defaultValue="MBBS, MD" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="registration">Registration Number</Label>
                    <Input id="registration" defaultValue="12345" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input id="specialization" defaultValue="General Medicine" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="dr.sharma@example.com" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" className="mt-1" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'clinic' && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-gray-900 text-lg md:text-xl">Clinic Settings</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="clinic-name">Clinic Name</Label>
                    <Input id="clinic-name" defaultValue="Sharma Clinic" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="clinic-address">Address</Label>
                    <Textarea
                      id="clinic-address"
                      defaultValue="123 Main Street, Medical District, Mumbai, Maharashtra 400001"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clinic-phone">Clinic Phone</Label>
                      <Input id="clinic-phone" defaultValue="+91 22 1234 5678" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="clinic-email">Clinic Email</Label>
                      <Input id="clinic-email" type="email" defaultValue="contact@sharmaclinic.com" className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="opening-time">Opening Time</Label>
                      <Input id="opening-time" type="time" defaultValue="09:00" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="closing-time">Closing Time</Label>
                      <Input id="closing-time" type="time" defaultValue="18:00" className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fees' && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-gray-900 text-lg md:text-xl">Fees & Availability</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="consultation-fee">Consultation Fee</Label>
                      <Input id="consultation-fee" type="number" defaultValue="500" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="followup-fee">Follow-up Fee</Label>
                      <Input id="followup-fee" type="number" defaultValue="300" className="mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-3 block">Working Days</Label>
                    <div className="flex gap-3 flex-wrap">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <label key={day} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                          <input type="checkbox" defaultChecked={day !== 'Sun'} className="w-4 h-4 rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]" />
                          <span className="text-sm text-gray-700">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="slot-duration">Slot Duration (minutes)</Label>
                    <Input id="slot-duration" type="number" defaultValue="30" className="mt-1" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'staff' && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h2 className="text-gray-900 text-lg md:text-xl">Staff Access</h2>
                  <button 
                    onClick={handleAddStaff}
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg transition-all text-sm md:text-base"
                  >
                    Add Staff Member
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-gray-900 text-sm md:text-base">Nurse Rekha</p>
                      <p className="text-xs md:text-sm text-gray-600">nurse@sharmaclinic.com</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => handleEditStaff('Nurse Rekha')}
                        className="flex-1 sm:flex-none px-3 py-1 text-xs md:text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleRemoveStaff('Nurse Rekha')}
                        className="flex-1 sm:flex-none px-3 py-1 text-xs md:text-sm bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-center py-8 text-gray-500 text-sm md:text-base">
                    No other staff members added
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'branding' && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-gray-900 text-lg md:text-xl">Clinic Branding</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Clinic Logo</Label>
                    <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span className="text-xs text-gray-500">No logo</span>
                      </div>
                      <button 
                        onClick={handleUploadLogo}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm md:text-base"
                      >
                        <Upload className="w-4 h-4" strokeWidth={2} />
                        <span>Upload Logo</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Recommended size: 200x200px, PNG or JPG</p>
                  </div>

                  <div>
                    <Label htmlFor="tagline">Clinic Tagline</Label>
                    <Input id="tagline" placeholder="Your health, our priority" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="letterhead-header">Letterhead Header Text</Label>
                    <Textarea
                      id="letterhead-header"
                      placeholder="Additional text for prescription header..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            {(
              <div className="pt-4 md:pt-6 border-t border-gray-200 mt-6">
                <button 
                  onClick={handleSaveChanges}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all text-sm md:text-base"
                >
                  <Save className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                  <span className="font-medium">Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { CheckCircle2, ArrowRight, User, Building2, DollarSign, Calendar } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { motion } from 'motion/react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    qualification: '',
    registration: '',
    specialization: '',
    clinicName: '',
    clinicAddress: '',
    clinicPhone: '',
    consultationFee: '',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    openingTime: '09:00',
    closingTime: '18:00',
  });

  const steps = [
    {
      title: 'Welcome to SehatNxt+',
      subtitle: 'Your complete clinic management solution',
      icon: CheckCircle2,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Personal Information',
      subtitle: 'Tell us about yourself',
      icon: User,
      color: 'from-teal-500 to-teal-600',
    },
    {
      title: 'Clinic Details',
      subtitle: 'Set up your clinic information',
      icon: Building2,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Fees & Timing',
      subtitle: 'Configure your practice schedule',
      icon: Calendar,
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] via-[#E8F5F3] to-[#E0F2F1] flex items-center justify-center p-4 md:p-6">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-48 h-48 md:w-72 md:h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-48 h-48 md:w-72 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Logo Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="flex justify-center mb-3 md:mb-4">
            <img src="/logo.png" alt="SehatNxt+" className="h-20 md:h-32 w-auto" />
          </div>
          <p className="text-gray-600 text-sm md:text-base">Complete Clinic Management Platform</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between mb-6 md:mb-8 relative px-2"
        >
          {/* Progress Line */}
          <div className="absolute top-4 md:top-5 left-0 right-0 h-0.5 md:h-1 bg-gray-200 -z-10 mx-6 md:mx-8">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1A73E8] to-[#00BFA5]"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={index} className="flex flex-col items-center relative">
                <motion.div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-1 md:mb-2 transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                      : isCompleted
                      ? 'bg-[#00BFA5] text-white'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                  ) : (
                    <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                  )}
                </motion.div>
                <span className={`text-[10px] md:text-xs text-center max-w-[60px] md:max-w-[80px] ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Content Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-100"
        >
          {currentStep === 0 && (
            <div className="text-center py-6 md:py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg border-2 border-blue-100"
              >
                <img src="/logo.png" alt="SehatNxt+" className="h-24 md:h-36 w-auto" />
              </motion.div>
              <h2 className="text-gray-900 mb-3 md:mb-4 text-xl md:text-2xl">Welcome to SehatNxt+</h2>
              <p className="text-gray-600 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
                Your complete offline OPD management platform. Let's set up your clinic in just a few simple steps.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto text-left">
                {[
                  'Manage Appointments',
                  'Track Patient Records',
                  'Create Prescriptions',
                  'Monitor Earnings',
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#00BFA5] flex-shrink-0" strokeWidth={2} />
                    <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className="text-gray-900 mb-2 text-xl md:text-2xl">Personal Information</h2>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Tell us about your medical credentials</p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Dr. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="qualification">Qualification *</Label>
                    <Input
                      id="qualification"
                      placeholder="MBBS, MD"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registration">Registration Number *</Label>
                    <Input
                      id="registration"
                      placeholder="12345"
                      value={formData.registration}
                      onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Specialization *</Label>
                    <Input
                      id="specialization"
                      placeholder="General Medicine"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-gray-900 mb-2 text-xl md:text-2xl">Clinic Details</h2>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Set up your clinic information</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="clinicName">Clinic Name *</Label>
                  <Input
                    id="clinicName"
                    placeholder="Sharma Clinic"
                    value={formData.clinicName}
                    onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="clinicAddress">Clinic Address *</Label>
                  <Textarea
                    id="clinicAddress"
                    placeholder="123 Main Street, Medical District, Mumbai"
                    value={formData.clinicAddress}
                    onChange={(e) => setFormData({ ...formData, clinicAddress: e.target.value })}
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="clinicPhone">Clinic Phone Number *</Label>
                  <Input
                    id="clinicPhone"
                    placeholder="+91 22 1234 5678"
                    value={formData.clinicPhone}
                    onChange={(e) => setFormData({ ...formData, clinicPhone: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-gray-900 mb-2 text-xl md:text-2xl">Fees & Timing</h2>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Configure your consultation fees and working hours</p>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <Label htmlFor="consultationFee">Consultation Fee (₹) *</Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    placeholder="500"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="mb-2 md:mb-3 block">Working Days *</Label>
                  <div className="flex gap-2 flex-wrap">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all text-sm md:text-base ${
                          formData.workingDays.includes(day)
                            ? 'bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="openingTime">Opening Time *</Label>
                    <Input
                      id="openingTime"
                      type="time"
                      value={formData.openingTime}
                      onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="closingTime">Closing Time *</Label>
                    <Input
                      id="closingTime"
                      type="time"
                      value={formData.closingTime}
                      onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 md:gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 md:px-6 py-2.5 md:py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all text-sm md:text-base"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm md:text-base"
            >
              <span>{currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
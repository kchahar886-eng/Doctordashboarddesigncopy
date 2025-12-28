import { useState } from 'react';
import { Gift, Copy, Share2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ReferAndEarn() {
  const [referralCode] = useState('SHARMA2025');

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied to clipboard!');
  };

  const handleShareReferral = () => {
    const message = `Download SehatNxt+ app using my clinic referral code: ${referralCode} and get ₹50 discount on your first appointment!`;
    if (navigator.share) {
      navigator.share({
        title: 'SehatNxt+ Referral',
        text: message,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(message);
      toast.success('Referral message copied to clipboard!');
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 text-2xl md:text-3xl">Refer & Earn</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Share your referral code and earn rewards</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="space-y-6">
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1A73E8] to-[#00BFA5] text-white rounded-2xl mb-4">
              <Gift className="w-10 h-10" />
            </div>
            <h2 className="text-gray-900 text-xl md:text-2xl mb-2">Grow Your Practice</h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Share your clinic referral code and earn rewards when patients download the SehatNxt+ app
            </p>
          </div>

          {/* Referral Code Card */}
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border-2 border-blue-100">
            <p className="text-sm text-gray-600 mb-2">Your Referral Code</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 bg-white rounded-xl px-4 py-3 border-2 border-[#1A73E8]">
                <p className="text-2xl tracking-wider text-[#1A73E8]">{referralCode}</p>
              </div>
              <button
                onClick={handleCopyReferralCode}
                className="p-3 bg-[#1A73E8] text-white rounded-xl hover:shadow-lg transition-all"
                title="Copy code"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={handleShareReferral}
                className="p-3 bg-[#00BFA5] text-white rounded-xl hover:shadow-lg transition-all"
                title="Share referral"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* How it Works */}
          <div className="space-y-4">
            <h3 className="text-gray-900 text-lg">How It Works</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Your Benefits */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">₹</span>
                </div>
                <h4 className="text-gray-900 mb-2">You Earn</h4>
                <p className="text-3xl text-green-600 mb-2">₹50</p>
                <p className="text-sm text-gray-600">For every patient who downloads the app using your referral code</p>
              </div>

              {/* Patient Benefits */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6" />
                </div>
                <h4 className="text-gray-900 mb-2">Patient Gets</h4>
                <p className="text-3xl text-purple-600 mb-2">Up to ₹50</p>
                <p className="text-sm text-gray-600">Discount on bookings up to ₹300 appointment fee</p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-gray-900 text-sm mb-3">Terms & Conditions</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex gap-2">
                <span className="text-[#00BFA5] mt-0.5">•</span>
                <span>Referral reward of ₹50 will be credited after the referred patient completes their first appointment</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#00BFA5] mt-0.5">•</span>
                <span>Patient discount is applicable only on appointments with fees up to ₹300</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#00BFA5] mt-0.5">•</span>
                <span>Discount can be used only once per new user registration</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#00BFA5] mt-0.5">•</span>
                <span>Rewards may take 24-48 hours to reflect in your account</span>
              </li>
            </ul>
          </div>

          {/* Earnings Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Total Referrals</p>
              <p className="text-2xl text-gray-900">0</p>
            </div>
            <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
              <p className="text-2xl text-green-600">₹0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
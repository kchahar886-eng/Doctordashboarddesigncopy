import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/e69f99b7f89c8400a7a65b1e073263c7642e5570.png';
import { toast } from 'sonner@2.0.3';

interface NavbarProps {
  onNavigate?: (page: string) => void;
  onMenuClick?: () => void;
}

export function Navbar({ onNavigate, onMenuClick }: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNotificationClick = () => {
    toast.info('You have 3 new notifications');
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    toast.success('Navigating to Profile');
    onNavigate?.('settings');
  };

  const handleSettingsClick = () => {
    setShowDropdown(false);
    onNavigate?.('settings');
    toast.success('Navigating to Settings');
  };

  const handleLogout = () => {
    setShowDropdown(false);
    toast.success('Logging out...');
    setTimeout(() => {
      localStorage.removeItem('onboarding_complete');
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 md:px-8 z-10">
      {/* Left Section - Mobile Menu + Logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-50 rounded-xl transition-all"
        >
          <Menu className="w-6 h-6 text-gray-700" strokeWidth={2} />
        </button>
        <img src={logo} alt="SehatNxt+" className="h-10 w-auto" />
      </div>
      
      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search patients, appointments..."
            className="w-full pl-12 pr-32 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent transition-all"
            readOnly
            onClick={() => {
              // Trigger global search
              const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
              window.dispatchEvent(event);
            }}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-lg">
            <span className="text-xs text-gray-600">Ctrl+K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification Bell */}
        <button 
          onClick={handleNotificationClick}
          className="relative p-2 hover:bg-gray-50 rounded-xl transition-all"
        >
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-700" strokeWidth={2} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 md:gap-3 p-2 pr-3 md:pr-4 hover:bg-gray-50 rounded-xl transition-all"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#1A73E8] to-[#00BFA5] flex items-center justify-center text-white text-sm md:text-base">
              <span>DS</span>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-sm">Dr. Sharma</div>
              <div className="text-xs text-gray-500">MBBS, MD</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" strokeWidth={2} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <button 
                onClick={handleProfileClick}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
              >
                Profile
              </button>
              <button 
                onClick={handleSettingsClick}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
              >
                Settings
              </button>
              <hr className="my-2 border-gray-100" />
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Home, Calendar, Users, FileText, TrendingUp, Settings, LogOut, MessageCircle, X, Award, Gift, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ currentPage, onNavigate, isMobile = false, isOpen = false, onClose }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
    { id: 'reputation', label: 'Reputation', icon: Award },
    { id: 'communication', label: 'Communication', icon: MessageCircle },
    { id: 'earnings', label: 'Earnings', icon: TrendingUp },
    { id: 'refer-earn', label: 'Refer & Earn', icon: Gift },
    { id: 'data-export', label: 'Data Export', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    toast.success('Logging out...');
    setTimeout(() => {
      localStorage.removeItem('onboarding_complete');
      window.location.reload();
    }, 1000);
  };

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white">
      {/* Header with Close Button for Mobile */}
      {isMobile && (
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="SehatNxt+" className="h-10 w-auto" />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
          </button>
        </div>
      )}

      {/* Logo for Desktop */}
      {!isMobile && (
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="flex items-center justify-center mb-2">
            <img src="/logo.png" alt="SehatNxt+" className="h-40 w-auto" />
          </div>
          <p className="text-xs text-gray-600 text-center mt-2">Clinic Management Platform</p>
        </div>
      )}

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#1A73E8] text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={2} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" strokeWidth={2} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  // Mobile version with Sheet
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Access dashboard sections including appointments, patients, prescriptions, and more
          </SheetDescription>
          {sidebarContent}
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop version
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      {sidebarContent}
    </aside>
  );
}
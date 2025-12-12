import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Appointments } from './components/Appointments';
import { Patients } from './components/Patients';
import { Prescriptions } from './components/Prescriptions';
import { Reputation } from './components/Reputation';
import { Communication } from './components/Communication';
import { Earnings } from './components/Earnings';
import { Settings } from './components/Settings';
import { Onboarding } from './components/Onboarding';
import { ReferralManagement } from './components/ReferralManagement';
import { AppointmentReminders } from './components/AppointmentReminders';
import { GlobalSearch } from './components/GlobalSearch';
import { ReferAndEarn } from './components/ReferAndEarn';
import { DataExportPage } from './components/DataExportPage';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);

  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboarding_complete');
    if (onboardingComplete === 'true') {
      setIsOnboarded(true);
    }

    // Global keyboard shortcut for search (Ctrl/Cmd + K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowGlobalSearch(true);
      }
      // ESC to close search
      if (e.key === 'Escape' && showGlobalSearch) {
        setShowGlobalSearch(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGlobalSearch]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_complete', 'true');
    setIsOnboarded(true);
  };

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setIsMobileSidebarOpen(false); // Close mobile sidebar on navigation
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'appointments':
        return <Appointments />;
      case 'patients':
        return <Patients onNavigate={handleNavigate} />;
      case 'prescriptions':
        return <Prescriptions />;
      case 'reputation':
        return <Reputation />;
      case 'communication':
        return <Communication />;
      case 'earnings':
        return <Earnings />;
      case 'refer-earn':
        return <ReferAndEarn />;
      case 'data-export':
        return <DataExportPage />;
      case 'settings':
        return <Settings />;
      case 'referrals':
        return <ReferralManagement />;
      case 'reminders':
        return <AppointmentReminders />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      </div>
      
      {/* Mobile Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        isMobile={true}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <Navbar 
        onNavigate={handleNavigate}
        onMenuClick={() => setIsMobileSidebarOpen(true)}
      />
      
      <main className="lg:ml-64 pt-28 md:pt-32 lg:pt-36 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>
      
      {/* Global Search Modal */}
      {showGlobalSearch && (
        <GlobalSearch 
          onClose={() => setShowGlobalSearch(false)} 
          onNavigate={handleNavigate}
        />
      )}
      
      <Toaster position="top-right" richColors />
    </div>
  );
}

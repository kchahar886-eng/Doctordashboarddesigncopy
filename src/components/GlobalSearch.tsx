import { useState } from 'react';
import { Search, User, Calendar, FileText, DollarSign, X, ArrowRight } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchResult {
  id: string;
  type: 'patient' | 'appointment' | 'prescription' | 'earning';
  title: string;
  subtitle: string;
  details: string;
  date: string;
}

interface GlobalSearchProps {
  onClose: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function GlobalSearch({ onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mock database for search
  const mockData = [
    {
      id: 'pat1',
      type: 'patient' as const,
      title: 'Rajesh Kumar',
      subtitle: 'PAT001 • Male, 45 years',
      details: 'Hypertension, Diabetes',
      date: 'Last visit: Jan 20, 2024'
    },
    {
      id: 'pat2',
      type: 'patient' as const,
      title: 'Priya Sharma',
      subtitle: 'PAT045 • Female, 32 years',
      details: 'Thyroid disorder',
      date: 'Last visit: Jan 18, 2024'
    },
    {
      id: 'apt1',
      type: 'appointment' as const,
      title: 'Amit Patel - Token #12',
      subtitle: 'Today at 10:30 AM',
      details: 'Follow-up consultation',
      date: 'Confirmed'
    },
    {
      id: 'apt2',
      type: 'appointment' as const,
      title: 'Sunita Rao - Token #15',
      subtitle: 'Today at 2:00 PM',
      details: 'New patient consultation',
      date: 'Pending'
    },
    {
      id: 'prx1',
      type: 'prescription' as const,
      title: 'Prescription for Rajesh Kumar',
      subtitle: 'Jan 20, 2024',
      details: 'Paracetamol, Cetirizine',
      date: 'Common Cold & Fever'
    },
    {
      id: 'ern1',
      type: 'earning' as const,
      title: '₹500 - Consultation Fee',
      subtitle: 'PAT001 - Rajesh Kumar',
      details: 'Cash payment',
      date: 'Jan 20, 2024'
    },
  ];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const filtered = mockData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'patient': return <User className="w-5 h-5 text-[#1A73E8]" />;
      case 'appointment': return <Calendar className="w-5 h-5 text-[#00BFA5]" />;
      case 'prescription': return <FileText className="w-5 h-5 text-purple-500" />;
      case 'earning': return <DollarSign className="w-5 h-5 text-green-500" />;
      default: return <Search className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'patient': return 'Patient';
      case 'appointment': return 'Appointment';
      case 'prescription': return 'Prescription';
      case 'earning': return 'Transaction';
      default: return '';
    }
  };

  const handleResultClick = (result: SearchResult) => {
    const pageMap: Record<string, string> = {
      patient: 'patients',
      appointment: 'appointments',
      prescription: 'prescriptions',
      earning: 'earnings'
    };
    
    onNavigate(pageMap[result.type], { id: result.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-5">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              autoFocus
              placeholder="Search patients, appointments, prescriptions..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-12 h-12 text-base border-none focus:ring-0"
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[500px] overflow-y-auto">
          {query.length < 2 ? (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Type at least 2 characters to search</p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  Try: Patient names
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  Try: Patient IDs
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  Try: Diagnosis
                </span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-1">No results found</h3>
              <p className="text-sm text-gray-600">Try searching with different keywords</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full p-4 hover:bg-gray-50 transition-colors text-left flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-900 truncate">{result.title}</h4>
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                        {getTypeLabel(result.type)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{result.subtitle}</p>
                    <p className="text-xs text-gray-500 mt-1">{result.details} • {result.date}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="p-3 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-500">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

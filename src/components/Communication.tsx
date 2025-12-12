import { useState } from 'react';
import { MessageCircle, Send, Search, Users, User, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import logo from 'figma:asset/e69f99b7f89c8400a7a65b1e073263c7642e5570.png';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  type: 'patient' | 'staff';
  status: 'online' | 'offline';
}

const patientConversations: Conversation[] = [
  { id: 1, name: 'Rajesh Kumar', lastMessage: 'Thank you doctor for the prescription', timestamp: '10:30 AM', unread: 2, avatar: 'RK', type: 'patient', status: 'online' },
  { id: 2, name: 'Priya Sharma', lastMessage: 'Can I reschedule my appointment?', timestamp: '9:45 AM', unread: 1, avatar: 'PS', type: 'patient', status: 'offline' },
  { id: 3, name: 'Amit Patel', lastMessage: 'Feeling much better now', timestamp: 'Yesterday', unread: 0, avatar: 'AP', type: 'patient', status: 'offline' },
  { id: 4, name: 'Sneha Verma', lastMessage: 'What time should I take the medicine?', timestamp: 'Yesterday', unread: 3, avatar: 'SV', type: 'patient', status: 'online' },
];

const staffConversations: Conversation[] = [
  { id: 5, name: 'Nurse Rekha', lastMessage: 'Patient in room 3 needs attention', timestamp: '11:00 AM', unread: 1, avatar: 'NR', type: 'staff', status: 'online' },
  { id: 6, name: 'Receptionist Maya', lastMessage: 'New appointment requests pending', timestamp: '10:15 AM', unread: 0, avatar: 'RM', type: 'staff', status: 'online' },
  { id: 7, name: 'Pharmacist Ravi', lastMessage: 'Stock update for medicines', timestamp: 'Yesterday', unread: 0, avatar: 'PR', type: 'staff', status: 'offline' },
];

const sampleMessages: Message[] = [
  { id: 1, sender: 'Rajesh Kumar', content: 'Good morning doctor!', timestamp: '10:20 AM', isOwn: false },
  { id: 2, sender: 'Dr. Sharma', content: 'Good morning! How are you feeling today?', timestamp: '10:22 AM', isOwn: true },
  { id: 3, sender: 'Rajesh Kumar', content: 'Much better after taking the prescribed medicines.', timestamp: '10:25 AM', isOwn: false },
  { id: 4, sender: 'Dr. Sharma', content: "That's great to hear! Continue the medication as prescribed.", timestamp: '10:28 AM', isOwn: true },
  { id: 5, sender: 'Rajesh Kumar', content: 'Thank you doctor for the prescription', timestamp: '10:30 AM', isOwn: false },
];

export function Communication() {
  const [activeTab, setActiveTab] = useState<'patient' | 'staff'>('patient');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(patientConversations[0]);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [staffHasAccess] = useState(true); // Simulate staff access control

  const conversations = activeTab === 'patient' ? patientConversations : staffConversations;

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast.error('Please type a message');
      return;
    }

    const message: Message = {
      id: messages.length + 1,
      sender: 'Dr. Sharma',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
    toast.success('Message sent');
  };

  const handleTabChange = (tab: 'patient' | 'staff') => {
    setActiveTab(tab);
    if (tab === 'patient') {
      setSelectedConversation(patientConversations[0]);
    } else {
      setSelectedConversation(staffConversations[0]);
    }
  };

  const handleCallPatient = () => {
    if (selectedConversation) {
      toast.success(`Calling ${selectedConversation.name}...`);
    }
  };

  const handleVideoCall = () => {
    if (selectedConversation) {
      toast.success(`Starting video call with ${selectedConversation.name}...`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 text-2xl md:text-3xl">Communication</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Manage patient and staff communications</p>
        </div>
        <div className="hidden md:block">
          <img src={logo} alt="SehatNxt+" className="h-16 w-auto opacity-50" />
        </div>
      </div>

      {/* Main Communication Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-h-[600px] lg:max-h-none">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => handleTabChange('patient')}
                className={`flex-1 px-6 py-4 transition-all ${
                  activeTab === 'patient'
                    ? 'bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <User className="w-5 h-5" strokeWidth={2} />
                  <span className="font-medium">Patients</span>
                </div>
              </button>
              <button
                onClick={() => handleTabChange('staff')}
                className={`flex-1 px-6 py-4 transition-all ${
                  activeTab === 'staff'
                    ? 'bg-gradient-to-r from-[#00BFA5] to-teal-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" strokeWidth={2} />
                  <span className="font-medium">Staff</span>
                </div>
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Access Notice for Staff */}
            {activeTab === 'staff' && staffHasAccess && (
              <div className="p-4 bg-blue-50 border-b border-blue-100">
                <p className="text-xs text-blue-700">
                  ℹ️ Staff members with access can view patient communications
                </p>
              </div>
            )}

            {/* Conversations */}
            <div className="overflow-y-auto max-h-[600px]">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                      conversation.type === 'patient' 
                        ? 'from-[#1A73E8] to-blue-600' 
                        : 'from-[#00BFA5] to-teal-600'
                    } flex items-center justify-center text-white`}>
                      {conversation.avatar}
                    </div>
                    {conversation.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-gray-900 text-sm">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="px-2 py-1 bg-[#1A73E8] text-white text-xs rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[500px] md:h-[600px] lg:h-[700px] flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                          selectedConversation.type === 'patient' 
                            ? 'from-[#1A73E8] to-blue-600' 
                            : 'from-[#00BFA5] to-teal-600'
                        } flex items-center justify-center text-white`}>
                          {selectedConversation.avatar}
                        </div>
                        {selectedConversation.status === 'online' && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-gray-900">{selectedConversation.name}</h3>
                        <p className="text-sm text-gray-600">
                          {selectedConversation.status === 'online' ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedConversation.type === 'patient' && (
                        <>
                          <button
                            onClick={handleCallPatient}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            title="Voice Call"
                          >
                            <Phone className="w-5 h-5 text-gray-700" strokeWidth={2} />
                          </button>
                          <button
                            onClick={handleVideoCall}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            title="Video Call"
                          >
                            <Video className="w-5 h-5 text-gray-700" strokeWidth={2} />
                          </button>
                        </>
                      )}
                      <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-700" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          message.isOwn
                            ? 'bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        } rounded-2xl px-4 py-3 shadow-sm`}
                      >
                        {!message.isOwn && (
                          <p className="text-xs mb-1 opacity-70">{message.sender}</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-500" strokeWidth={2} />
                    </button>
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        rows={1}
                        className="resize-none pr-10"
                      />
                      <button className="absolute right-2 bottom-2 p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <Smile className="w-5 h-5 text-gray-500" strokeWidth={2} />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      className="p-3 bg-gradient-to-r from-[#1A73E8] to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                    >
                      <Send className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-gray-900 mb-2">No conversation selected</h3>
                  <p className="text-gray-600">Choose a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

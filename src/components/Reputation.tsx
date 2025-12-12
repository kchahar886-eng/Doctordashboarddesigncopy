import { Star, TrendingUp, Users, ThumbsUp, MessageSquare, Award, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import logo from 'figma:asset/e69f99b7f89c8400a7a65b1e073263c7642e5570.png';

const ratingTrend = [
  { month: 'Jun', rating: 4.2 },
  { month: 'Jul', rating: 4.3 },
  { month: 'Aug', rating: 4.5 },
  { month: 'Sep', rating: 4.6 },
  { month: 'Oct', rating: 4.7 },
  { month: 'Nov', rating: 4.8 },
];

const reviewsData = [
  { category: 'Excellent', count: 156, color: '#22C55E' },
  { category: 'Good', count: 89, color: '#1A73E8' },
  { category: 'Average', count: 23, color: '#F59E0B' },
  { category: 'Poor', count: 5, color: '#EF4444' },
];

const recentReviews = [
  {
    id: 1,
    patient: 'Rajesh Kumar',
    rating: 5,
    date: '2025-11-28',
    comment: 'Excellent doctor! Very patient and thorough in examination. Explains everything clearly.',
    verified: true
  },
  {
    id: 2,
    patient: 'Priya Sharma',
    rating: 5,
    date: '2025-11-27',
    comment: 'Best doctor in the area. Treatment was very effective and staff is very cooperative.',
    verified: true
  },
  {
    id: 3,
    patient: 'Amit Patel',
    rating: 4,
    date: '2025-11-26',
    comment: 'Good experience overall. Waiting time could be better but treatment is excellent.',
    verified: true
  },
  {
    id: 4,
    patient: 'Sneha Verma',
    rating: 5,
    date: '2025-11-25',
    comment: 'Very professional and caring doctor. Highly recommend to everyone!',
    verified: true
  },
];

const achievements = [
  { icon: Award, label: 'Top Rated Doctor 2024', color: 'from-yellow-500 to-orange-500' },
  { icon: Users, label: '500+ Patients Treated', color: 'from-blue-500 to-cyan-500' },
  { icon: ThumbsUp, label: '95% Positive Reviews', color: 'from-green-500 to-teal-500' },
  { icon: Star, label: '4.8 Average Rating', color: 'from-purple-500 to-pink-500' },
];

export function Reputation() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 text-2xl md:text-3xl">Doctor Reputation</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Your ratings, reviews & achievements</p>
        </div>
        <div className="hidden md:block">
          <img src={logo} alt="SehatNxt+" className="h-16 w-auto opacity-50" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Star className="w-6 h-6 text-yellow-500" strokeWidth={2} fill="currentColor" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" strokeWidth={2} />
              <span className="text-xs">+0.3</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">4.8</div>
          <div className="text-sm text-gray-600">Overall Rating</div>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 text-yellow-500" strokeWidth={2} fill={star <= 4.8 ? 'currentColor' : 'none'} />
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <MessageSquare className="w-6 h-6 text-blue-500" strokeWidth={2} />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" strokeWidth={2} />
              <span className="text-xs">+12</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">273</div>
          <div className="text-sm text-gray-600">Total Reviews</div>
          <div className="text-xs text-blue-600 mt-2">23 this month</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <ThumbsUp className="w-6 h-6 text-green-500" strokeWidth={2} />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" strokeWidth={2} />
              <span className="text-xs">+2%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
          <div className="text-sm text-gray-600">Positive Reviews</div>
          <div className="text-xs text-green-600 mt-2">260 of 273</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Users className="w-6 h-6 text-purple-500" strokeWidth={2} />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" strokeWidth={2} />
              <span className="text-xs">+45</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1,234</div>
          <div className="text-sm text-gray-600">Total Patients</div>
          <div className="text-xs text-purple-600 mt-2">89 this month</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#1A73E8]" strokeWidth={2} />
          Achievements & Badges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="text-sm text-gray-900">{achievement.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-gray-900 mb-4">Rating Trend (6 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis domain={[4.0, 5.0]} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="#1A73E8" 
                strokeWidth={3}
                dot={{ fill: '#1A73E8', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Review Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-gray-900 mb-4">Review Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reviewsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
                label={({ category, count }) => `${category}: ${count}`}
              >
                {reviewsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-gray-900 mb-4">Recent Patient Reviews</h2>
        <div className="space-y-4">
          {recentReviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-gray-900">{review.patient}</div>
                    {review.verified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 text-yellow-500"
                          strokeWidth={2}
                          fill={star <= review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

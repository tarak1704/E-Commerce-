import React, { useState } from 'react';
import { 
  Layout, 
  TrendingUp, 
  Users, 
  FileText, 
  MessageSquare, 
  Image, 
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  const stats = [
    {
      label: 'Total Generations',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Active Users',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Text Generated',
      value: '45.2k',
      change: '+15%',
      changeType: 'positive',
      icon: FileText,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Images Created',
      value: '892',
      change: '+23%',
      changeType: 'positive',
      icon: Image,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const activityData = [
    { date: '2024-01-15', textGen: 45, imageGen: 23, dataAnalysis: 12, chatInteractions: 67 },
    { date: '2024-01-16', textGen: 52, imageGen: 31, dataAnalysis: 18, chatInteractions: 89 },
    { date: '2024-01-17', textGen: 38, imageGen: 28, dataAnalysis: 15, chatInteractions: 72 },
    { date: '2024-01-18', textGen: 67, imageGen: 42, dataAnalysis: 21, chatInteractions: 95 },
    { date: '2024-01-19', textGen: 58, imageGen: 35, dataAnalysis: 19, chatInteractions: 83 },
    { date: '2024-01-20', textGen: 73, imageGen: 48, dataAnalysis: 25, chatInteractions: 108 },
    { date: '2024-01-21', textGen: 81, imageGen: 56, dataAnalysis: 32, chatInteractions: 124 }
  ];

  const featureUsage = [
    { name: 'Text Generation', usage: 35, color: '#3B82F6' },
    { name: 'ChatBot', usage: 28, color: '#8B5CF6' },
    { name: 'Image Generation', usage: 22, color: '#F59E0B' },
    { name: 'Data Analysis', usage: 15, color: '#10B981' }
  ];

  const recentActivity = [
    { type: 'text', user: 'User123', action: 'Generated creative writing content', time: '2 minutes ago' },
    { type: 'image', user: 'Designer_AI', action: 'Created landscape artwork', time: '5 minutes ago' },
    { type: 'chat', user: 'StudentVIT', action: 'Asked about machine learning', time: '8 minutes ago' },
    { type: 'data', user: 'DataScientist', action: 'Analyzed sales dataset', time: '12 minutes ago' },
    { type: 'text', user: 'Writer_Pro', action: 'Generated blog post content', time: '15 minutes ago' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'image': return <Image className="w-4 h-4 text-orange-600" />;
      case 'chat': return <MessageSquare className="w-4 h-4 text-purple-600" />;
      case 'data': return <BarChart3 className="w-4 h-4 text-green-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      timeRange,
      stats: stats.map(stat => ({
        label: stat.label,
        value: stat.value,
        change: stat.change
      })),
      featureUsage,
      activityData,
      summary: {
        totalGenerations: stats[0].value,
        activeUsers: stats[1].value,
        mostUsedFeature: featureUsage[0].name,
        averageDailyUsage: Math.round(
          activityData.reduce((acc, day) => 
            acc + day.textGen + day.imageGen + day.dataAnalysis + day.chatInteractions, 0
          ) / activityData.length
        )
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `genai-dashboard-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl">
            <Layout className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Monitor and analyze AI feature usage and performance</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className={`flex items-center mt-2 text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>{stat.change} from last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Daily Activity</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">Last 7 days</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {activityData.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="font-medium text-gray-900">
                    {day.textGen + day.imageGen + day.dataAnalysis + day.chatInteractions} total
                  </span>
                </div>
                <div className="flex space-x-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full" 
                    style={{ 
                      width: `${(day.textGen / (day.textGen + day.imageGen + day.dataAnalysis + day.chatInteractions)) * 100}%` 
                    }}
                  />
                  <div 
                    className="bg-purple-500 h-full" 
                    style={{ 
                      width: `${(day.chatInteractions / (day.textGen + day.imageGen + day.dataAnalysis + day.chatInteractions)) * 100}%` 
                    }}
                  />
                  <div 
                    className="bg-orange-500 h-full" 
                    style={{ 
                      width: `${(day.imageGen / (day.textGen + day.imageGen + day.dataAnalysis + day.chatInteractions)) * 100}%` 
                    }}
                  />
                  <div 
                    className="bg-green-500 h-full" 
                    style={{ 
                      width: `${(day.dataAnalysis / (day.textGen + day.imageGen + day.dataAnalysis + day.chatInteractions)) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-xs text-gray-600">Text Generation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-xs text-gray-600">ChatBot</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-xs text-gray-600">Image Generation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">Data Analysis</span>
            </div>
          </div>
        </div>

        {/* Feature Usage */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <PieChart className="w-5 h-5 text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-900">Feature Usage</h3>
          </div>
          
          <div className="space-y-4">
            {featureUsage.map((feature, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{feature.name}</span>
                  <span className="text-sm text-gray-600">{feature.usage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${feature.usage}%`,
                      backgroundColor: feature.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Usage Insights</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Text Generation is the most popular feature</li>
              <li>• ChatBot engagement has increased 28% this week</li>
              <li>• Image Generation usage peaks during weekends</li>
              <li>• Data Analysis shows steady growth</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="p-2 bg-gray-100 rounded-lg">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      <span className="text-blue-600">{activity.user}</span> {activity.action}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {activity.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
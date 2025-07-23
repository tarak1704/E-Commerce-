import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  FileText, 
  BarChart3, 
  MessageCircle, 
  Image, 
  Layout,
  ArrowRight,
  Sparkles,
  Code,
  Database,
  Zap
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: 'AI Text Generator',
      description: 'Generate high-quality content, stories, and articles using advanced language models.',
      path: '/text-generator',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Data Analyzer',
      description: 'Upload and analyze datasets with AI-powered insights and visualizations.',
      path: '/data-analyzer',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MessageCircle,
      title: 'Intelligent ChatBot',
      description: 'Chat with an AI assistant for questions, help, and general conversations.',
      path: '/chatbot',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Image,
      title: 'AI Image Generator',
      description: 'Create stunning images from text descriptions using AI image generation.',
      path: '/image-generator',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Layout,
      title: 'Analytics Dashboard',
      description: 'View comprehensive analytics and metrics of all AI operations.',
      path: '/dashboard',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const stats = [
    { label: 'AI Models Integrated', value: '5+' },
    { label: 'Features Available', value: '15+' },
    { label: 'Data Processing', value: 'Real-time' },
    { label: 'User Experience', value: 'Optimized' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
            <Brain className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            GenAI Intern
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              VIT Project
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive AI platform showcasing multiple generative AI capabilities including 
            text generation, data analysis, intelligent chatbots, and image creation.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">AI Powered</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-full">
            <Code className="w-4 h-4" />
            <span className="font-medium">Modern Tech Stack</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full">
            <Database className="w-4 h-4" />
            <span className="font-medium">Real-time Processing</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full">
            <Zap className="w-4 h-4" />
            <span className="font-medium">High Performance</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Features & Capabilities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive suite of AI-powered tools designed to showcase 
            the latest in generative artificial intelligence technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <Link
                key={index}
                to={feature.path}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-8 space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    <span className="text-sm">Explore Feature</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Ready to Explore AI?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Start by trying out any of our AI features. Each tool is designed to demonstrate 
            different aspects of generative AI technology and modern web development.
          </p>
          <Link
            to="/text-generator"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            <Sparkles className="w-5 h-5" />
            <span>Start with Text Generation</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
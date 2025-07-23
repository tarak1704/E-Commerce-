import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import TextGenerator from './pages/TextGenerator';
import DataAnalyzer from './pages/DataAnalyzer';
import ChatBot from './pages/ChatBot';
import ImageGenerator from './pages/ImageGenerator';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/text-generator" element={<TextGenerator />} />
            <Route path="/data-analyzer" element={<DataAnalyzer />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/image-generator" element={<ImageGenerator />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
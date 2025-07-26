import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  const [language, setLanguage] = useState('en');

  // Auto-detect browser language on first visit
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('no') || browserLang.startsWith('nb') || browserLang.startsWith('nn')) {
        setLanguage('no');
      }
    }
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('portfolio-language', newLanguage);
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <BrowserRouter>
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route path="/about" element={<About language={language} />} />
            <Route path="/resume" element={<Resume language={language} />} />
            <Route path="/projects" element={<Projects language={language} />} />
            <Route path="/blog" element={<Blog language={language} />} />
            <Route path="/contact" element={<Contact language={language} />} />
          </Routes>
        </main>
        <Footer language={language} />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
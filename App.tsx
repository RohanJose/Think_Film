import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import ServiceDetail from './pages/ServiceDetail.tsx';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`relative bg-white selection:bg-black selection:text-white ${isHomePage ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Header />
      
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/automotive" 
            element={
              <ServiceDetail 
                category="Automotive"
                title="Automotive"
                subtitle="Collection 2024"
                description="Precision and luxury captured on road. We elevate automotive engineering into cinematic art."
                heroImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
              />
            } 
          />
          <Route 
            path="/corporate" 
            element={
              <ServiceDetail 
                category="Corporate"
                title="Corporate"
                subtitle="Editorial Business"
                description="Scaling brand authority through high-fidelity event documentation and corporate storytelling."
                heroImage="https://images.unsplash.com/photo-1540575861501-7ad058bc382d?auto=format&fit=crop&q=80&w=1920"
              />
            } 
          />
          <Route 
            path="/concerts" 
            element={
              <ServiceDetail 
                category="Concerts"
                title="Concerts"
                subtitle="Live Motion"
                description="The energy of the stage, preserved through visceral cinematography and expert visual editing."
                heroImage="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1920"
              />
            } 
          />
        </Routes>
      </div>
      
      {/* Footer is handled internally on the Home page's snap scroll sections. 
          For other pages, we render it here at the bottom. */}
      {!isHomePage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
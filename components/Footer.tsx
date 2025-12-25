
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 md:py-24 px-8 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-6">Think Films</h4>
          <p className="text-[10px] text-neutral-400 leading-relaxed uppercase tracking-[0.2em] font-medium">
            A global production house focused on luxury and cinematic clarity. Establishing new visual benchmarks.
          </p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-3">Client Services</h4>
          <Link to="/automotive" className="text-[10px] text-neutral-400 uppercase tracking-widest hover:text-black transition-colors">Automotive</Link>
          <Link to="/corporate" className="text-[10px] text-neutral-400 uppercase tracking-widest hover:text-black transition-colors">Corporate</Link>
          <Link to="/concerts" className="text-[10px] text-neutral-400 uppercase tracking-widest hover:text-black transition-colors">Concerts</Link>
        </div>

        <div className="flex flex-col space-y-3">
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-3">Information</h4>
          <Link to="/about" className="text-[10px] text-neutral-400 uppercase tracking-widest hover:text-black transition-colors">About Studio</Link>
          <Link to="/contact" className="text-[10px] text-neutral-400 uppercase tracking-widest hover:text-black transition-colors">Contact Us</Link>
          <Link to="/" className="text-[10px] text-neutral-400 uppercase tracking-widest hover:text-black transition-colors">Legal Notice</Link>
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-3">Newsletter</h4>
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS" 
            className="bg-transparent border-b border-neutral-200 text-[10px] py-2 focus:border-black outline-none uppercase tracking-widest transition-colors"
          />
        </div>
      </div>
      
      <div className="mt-16 md:mt-24 pt-10 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <p className="text-[9px] uppercase tracking-widest font-bold text-neutral-300">© 2025 Think Films / Think Music</p>
        <div className="flex space-x-8">
          <a href="#" className="text-[9px] uppercase tracking-widest font-black text-neutral-300 hover:text-black transition-colors">Instagram</a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

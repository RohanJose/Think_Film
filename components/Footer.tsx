
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-24 px-8 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-8">Think Films</h4>
          <p className="text-[11px] text-neutral-500 leading-relaxed uppercase tracking-widest">
            A global production house focused on luxury and cinematic clarity.
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-4">Client Services</h4>
          <Link to="/automotive" className="text-[10px] text-neutral-500 uppercase tracking-widest hover:text-black">Automotive</Link>
          <Link to="/corporate" className="text-[10px] text-neutral-500 uppercase tracking-widest hover:text-black">Corporate</Link>
          <Link to="/concerts" className="text-[10px] text-neutral-500 uppercase tracking-widest hover:text-black">Concerts</Link>
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-4">Information</h4>
          <Link to="/about" className="text-[10px] text-neutral-500 uppercase tracking-widest hover:text-black">About Studio</Link>
          <Link to="/contact" className="text-[10px] text-neutral-500 uppercase tracking-widest hover:text-black">Contact Us</Link>
          <Link to="/" className="text-[10px] text-neutral-500 uppercase tracking-widest hover:text-black">Legal Notice</Link>
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="text-[11px] font-black uppercase tracking-widest mb-4">Newsletter</h4>
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS" 
            className="bg-transparent border-b border-neutral-300 text-[10px] py-2 focus:border-black outline-none uppercase tracking-widest"
          />
        </div>
      </div>
      
      <div className="mt-20 pt-10 border-t border-neutral-100 flex justify-between items-center">
        <p className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">© 2025 Think Films </p>
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/thinkfilms.in/" className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 hover:text-black">Instagram</a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

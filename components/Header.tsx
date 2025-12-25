import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  // FIXED: Added '?' to children to resolve the TypeScript 'ts(2741)' warning
  const NavLink = ({ to, children }: { to: string; children?: React.ReactNode }) => (
    <Link 
      to={to} 
      onClick={closeMenu}
      className={`text-[10px] font-bold uppercase tracking-[0.15em] hover:opacity-100 transition-opacity ${
        location.pathname === to ? 'opacity-100 border-b border-black pb-0.5' : 'opacity-60'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <>
      {/* Increased header height to h-[80px] to support larger logo */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-neutral-100 h-[80px] flex items-center justify-between px-6 md:px-12">
        
        {/* Left Nav - Desktop Only */}
        <nav className="hidden lg:flex flex-1 items-center space-x-12">
          <NavLink to="/automotive">Automotive</NavLink>
          <NavLink to="/corporate">Corporate</NavLink>
          <NavLink to="/concerts">Concerts</NavLink>
        </nav>

        {/* Logo - Increased sizes: Mobile h-14, Tablet h-16, Desktop h-20 */}
        <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center">
          <Link to="/" onClick={closeMenu} className="inline-block group">
            <img
              src="/colored-logo.png"
              alt="Think Films"
              className="h-14 md:h-16 lg:h-20 w-auto transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Right Nav - Desktop Only */}
        <div className="hidden lg:flex flex-1 justify-end items-center space-x-12">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Mobile Toggle - Pinned Right */}
        <div className="lg:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black p-2 focus:outline-none z-[110]"
          >
            {isMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <div className="space-y-2 flex flex-col items-end">
                <div className="w-8 h-[2px] bg-black"></div>
                <div className="w-5 h-[2px] bg-black"></div>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[90] flex flex-col pt-32 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col space-y-12 px-12">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-black">Expertise</span>
            <div className="flex flex-col space-y-6">
              <Link to="/automotive" onClick={closeMenu} className="text-4xl font-black uppercase tracking-tighter">Automotive</Link>
              <Link to="/corporate" onClick={closeMenu} className="text-4xl font-black uppercase tracking-tighter">Corporate</Link>
              <Link to="/concerts" onClick={closeMenu} className="text-4xl font-black uppercase tracking-tighter">Concerts</Link>
            </div>
          </div>
          
          <div className="space-y-4 pt-8 border-t border-neutral-100">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-black">Archive</span>
            <div className="flex flex-col space-y-6">
              <Link to="/about" onClick={closeMenu} className="text-2xl font-bold uppercase tracking-tighter">About Studio</Link>
              <Link to="/contact" onClick={closeMenu} className="text-2xl font-bold uppercase tracking-tighter">Contact</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-auto p-12 border-t border-neutral-100 bg-[#fafafa]">
          <p className="text-[9px] uppercase tracking-[0.5em] font-black text-neutral-400">Think Films / Think Music</p>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-300">The Future of Storytelling</p>
        </div>
      </div>
    </>
  );
};

export default Header;
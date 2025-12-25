import React, { useState, PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  // FIXED: Using PropsWithChildren is the cleanest way to fix the 'ts(2741)' warning
  const NavLink = ({ to, children }: PropsWithChildren<{ to: string }>) => (
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
      <header className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-neutral-100 h-[90px] flex items-center justify-between px-6 md:px-12">
        
        {/* Left Nav - Desktop */}
        <nav className="hidden lg:flex flex-1 items-center space-x-12">
          <NavLink to="/automotive">Automotive</NavLink>
          <NavLink to="/corporate">Corporate</NavLink>
          <NavLink to="/concerts">Concerts</NavLink>
        </nav>

        {/* Logo - Centered and Enlarged */}
        <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center">
          <Link to="/" onClick={closeMenu} className="inline-block group">
            <img
              src="/colored-logo.png"
              alt="Think Films Logo"
              className="h-16 md:h-20 lg:h-24 w-auto transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Right Nav - Desktop */}
        <div className="hidden lg:flex flex-1 justify-end items-center space-x-12">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Mobile Menu Button - Larger for better UX */}
        <div className="lg:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black p-2 focus:outline-none z-[110]"
          >
            {isMenuOpen ? (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <div className="space-y-2.5 flex flex-col items-end">
                <div className="w-10 h-[2px] bg-black"></div>
                <div className="w-6 h-[2px] bg-black"></div>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[90] flex flex-col pt-40 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col space-y-12 px-12">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-black">Expertise</span>
            <div className="flex flex-col space-y-6">
              <Link to="/automotive" onClick={closeMenu} className="text-5xl font-black uppercase tracking-tighter">Automotive</Link>
              <Link to="/corporate" onClick={closeMenu} className="text-5xl font-black uppercase tracking-tighter">Corporate</Link>
              <Link to="/concerts" onClick={closeMenu} className="text-5xl font-black uppercase tracking-tighter">Concerts</Link>
            </div>
          </div>
          
          <div className="space-y-4 pt-8 border-t border-neutral-100">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-black">Archive</span>
            <div className="flex flex-col space-y-6">
              <Link to="/about" onClick={closeMenu} className="text-3xl font-bold uppercase tracking-tighter">About Studio</Link>
              <Link to="/contact" onClick={closeMenu} className="text-3xl font-bold uppercase tracking-tighter">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
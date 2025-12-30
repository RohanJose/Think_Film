import React, { useEffect, useState } from 'react';

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you. Our studio directors will review your brief shortly.');
  };

  return (
    <main className="pt-40 bg-white min-h-screen px-6 md:px-12">
      <div className="max-w-7xl mx-auto mb-24 md:mb-32">
        <header className="mb-24 border-b border-black pb-12">
           <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-400 mb-6 block">Inquiries</span>
           <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85]">
             Let's Create <br/> The Next.
           </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* LEFT: Info & Social Link */}
          <div className="lg:col-span-5 space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-[9px] uppercase tracking-[0.5em] font-black text-neutral-300 mb-4">India Studio</p>
                <p className="text-sm font-bold uppercase tracking-widest leading-relaxed">
                 {/* _____, _____<br/>*/}
                  Kochi, Kerala
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.5em] font-black text-neutral-300 mb-4">Direct Access</p>
                <p className="text-sm font-bold uppercase tracking-widest">hello@thinkfilms.in</p>
                <p className="text-sm font-bold uppercase tracking-widest mt-1">+91 98479 49045 </p>
              </div>
            </div>

            {/* INSTAGRAM LINK BLOCK */}
            <div className="space-y-6">
              <p className="text-[9px] uppercase tracking-[0.5em] font-black text-neutral-300">Social Presence</p>
              <a 
                href="https://www.instagram.com/thinkfilms.in/" // REPLACE WITH YOUR INSTAGRAM LINK
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-6 border border-neutral-100 p-8 transition-all hover:border-black hover:bg-neutral-50 w-fit"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-black text-white transition-transform group-hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-black">Follow the Process</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">@thinkfilms.in</p>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT: Commission Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-50 p-12 md:p-20 border border-neutral-100">
               <h3 className="text-3xl font-black uppercase tracking-tighter mb-16">Commission Inquiry</h3>
               <form onSubmit={handleSubmit} className="space-y-16">
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-neutral-200 py-4 outline-none focus:border-black transition-colors peer text-sm font-bold tracking-widest uppercase"
                    placeholder=" "
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                  <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest font-black text-neutral-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-black">Your Name</label>
                </div>

                <div className="relative">
                  <input 
                    type="email" 
                    required
                    className="w-full bg-transparent border-b border-neutral-200 py-4 outline-none focus:border-black transition-colors peer text-sm font-bold tracking-widest uppercase"
                    placeholder=" "
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                  <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest font-black text-neutral-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-black">Work Email</label>
                </div>

                <div className="relative">
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-neutral-200 py-4 outline-none focus:border-black transition-colors peer text-sm font-bold tracking-widest uppercase"
                    placeholder=" "
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                  <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest font-black text-neutral-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-black peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-black">Brief Description</label>
                </div>

                <button type="submit" className="action-btn w-full !text-[11px] !tracking-[0.5em]">
                  Send Brief
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Contact;
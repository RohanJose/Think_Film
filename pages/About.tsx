import React, { useEffect } from 'react';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-white min-h-screen pt-40 pb-32 px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-32">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-400 mb-6 block">Heritage</span>
          <h1 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-12">
            The Thinking <br/> Behind The <br/> Motion.
          </h1>
          <div className="w-full h-px bg-black/10"></div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-48 md:mb-64">
          <div className="md:col-span-6 space-y-12">
            <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight">
              Think Films is more than a production house. We are architects of cinematic identity.
            </p>
            <p className="text-sm text-neutral-500 uppercase tracking-widest leading-[2.2] font-medium">
              Based in the vibrant landscape of India but operating on a global frequency, our studio was founded on the belief that luxury is defined by what is removed, not what is added. 
              <br/><br/>
              Our work spans across high-octane automotive films, editorial corporate narratives, and visceral live performance documentation. We treat every pixel as a piece of art, ensuring that the legacy of our clients is preserved through world-class cinematography.
            </p>
            <div className="pt-12 border-t border-neutral-100 flex gap-12">
              <div>
                <p className="text-3xl font-black tracking-tighter">10+</p>
                <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-black tracking-tighter">500+</p>
                <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Global Projects</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="aspect-[4/5] bg-neutral-100 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1600" 
                className="w-full h-full object-cover grayscale transition-transform duration-[5000ms] hover:scale-105" 
                alt="The Studio"
              />
              <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* THE PILLARS SECTION */}
        <section className="mb-48 md:mb-64">
           <div className="text-center mb-32">
             <h2 className="text-[10px] uppercase tracking-[0.8em] font-black text-neutral-300">Our Pillars</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-px bg-neutral-100 border border-neutral-100">
             <div className="bg-white p-12 md:p-16 space-y-8">
                <span className="text-[10px] font-black text-neutral-300">01</span>
                <h3 className="text-3xl font-black uppercase tracking-tighter">Precision</h3>
                <p className="text-xs text-neutral-400 uppercase tracking-[0.2em] leading-relaxed">Clinical focus on frame composition, color balance, and lighting geometry.</p>
             </div>
             <div className="bg-white p-12 md:p-16 space-y-8">
                <span className="text-[10px] font-black text-neutral-300">02</span>
                <h3 className="text-3xl font-black uppercase tracking-tighter">Vision</h3>
                <p className="text-xs text-neutral-400 uppercase tracking-[0.2em] leading-relaxed">Translating brand values into cinematic languages that resonate emotionally.</p>
             </div>
             <div className="bg-white p-12 md:p-16 space-y-8">
                <span className="text-[10px] font-black text-neutral-300">03</span>
                <h3 className="text-3xl font-black uppercase tracking-tighter">Execution</h3>
                <p className="text-xs text-neutral-400 uppercase tracking-[0.2em] leading-relaxed">A relentless drive to deliver uncompressed quality under global deadlines.</p>
             </div>
           </div>
        </section>

        {/* STUDIO CAPABILITIES LIST */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 py-32 border-t border-black">
           <div>
             <h4 className="text-5xl font-black uppercase tracking-tighter mb-12">The Toolkit.</h4>
             <div className="space-y-6">
                {['Directing', 'Cinematography', 'Editorial', 'Color Grading', 'Sound Design', 'VFX & CGI'].map(skill => (
                  <div key={skill} className="flex justify-between items-center group cursor-default">
                    <span className="text-lg uppercase tracking-tighter font-bold opacity-40 group-hover:opacity-100 transition-opacity">{skill}</span>
                    <span className="text-[10px] font-black opacity-0 group-hover:opacity-20 transition-opacity tracking-widest">— IN-HOUSE</span>
                  </div>
                ))}
             </div>
           </div>
           <div className="bg-black p-12 flex flex-col justify-center text-white">
             <p className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-snug mb-8">
               "We don't shoot videos. We craft visual legacies for the world's most ambitious brands."
             </p>
             <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30">Think Films // Studio Mantra</p>
           </div>
        </section>
      </div>
    </main>
  );
};

export default About;
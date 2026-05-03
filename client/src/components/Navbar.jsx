import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const { t, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    ['#home', t('nav.home')],
    ['#services', t('nav.services')],
    ['#portfolio', t('nav.portfolio')],
    ['#testimonials', t('nav.testimonials')],
    ['#team', t('nav.team')],
    ['#blog', t('nav.blog')],
    ['#jobs', t('nav.jobs')],
    ['#faq', t('nav.faq')],
  ];

  const goTo = (href) => {
    setIsOpen(false);
    window.location.href = href;
  };

  return (
    <nav className="sticky top-0 bg-[#0b101e]/85 backdrop-blur-xl z-50 border-b border-white/5">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <a className="flex flex-col items-start" href="/#home" aria-label="IsWeb Studio">
          <div className="flex items-center text-2xl md:text-3xl font-bold" dir="ltr"><span className="text-white">Is</span><span className="bg-gradient-to-r from-[#00b4db] to-[#00b09b] text-transparent bg-clip-text ml-1">Web</span></div>
          <div className="flex items-center" dir="ltr"><div className="h-[1px] w-3 bg-white/40 mr-1" /><span className="text-[10px] tracking-[0.3em] font-light text-gray-300">STUDIO</span></div>
        </a>

        <div className="hidden xl:flex items-center gap-5 bg-white/5 px-6 py-3 rounded-full border border-white/10">
          {links.map(([href, label]) => <a key={href} href={href} className="text-sm hover:text-[#00b4db] transition">{label}</a>)}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleLanguage} className="px-3 py-2 border border-white/20 rounded-xl text-xs font-bold hover:bg-white/10 transition">{t('nav.lang')}</button>
          <a href="#contact" className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00b09b] to-[#00b4db] text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(0,180,219,0.3)] transition">{t('nav.contact')}</a>
          <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center" aria-label={t('nav.menu')}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0b101e]/95 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-5 grid gap-3">
            {links.map(([href, label]) => <button key={href} onClick={() => goTo(href)} className="text-start px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition">{label}</button>)}
            <a onClick={() => setIsOpen(false)} href="#contact" className="text-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#00b09b] to-[#00b4db] font-bold">{t('nav.contact')}</a>
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;

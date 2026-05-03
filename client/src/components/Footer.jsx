import React from 'react';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';

function Footer() {
  const { t } = useLanguage();
  const { content } = useSiteData();
  const first = content.settings.brandName.split(' ')[0] || 'IsWeb';
  const rest = content.settings.brandName.split(' ').slice(1).join(' ') || 'Studio';

  return <footer className="bg-black/40 border-t border-white/5 py-12 relative z-10"><div className="container mx-auto px-6"><div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-start"><div><div className="inline-flex text-3xl font-black items-center" dir="ltr"><span className="text-white">{first}</span><span className="text-[#00b4db] ml-1">{rest}</span></div><p className="text-gray-500 text-sm mt-3 max-w-sm">{t('footer.desc')}</p><div className="flex justify-center md:justify-start gap-3 mt-5"><a href={content.settings.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00b4db]/10 hover:text-[#00b4db] transition"><span className="font-black">f</span></a><a href={content.settings.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00b4db]/10 hover:text-[#00b4db] transition"><span className="font-black">◎</span></a><a href={content.settings.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00b4db]/10 hover:text-[#00b4db] transition"><span className="font-black">⌘</span></a></div></div><div className="flex flex-wrap justify-center gap-5 text-sm text-gray-400"><a href="#services" className="hover:text-[#00b4db]">{t('nav.services')}</a><a href="#portfolio" className="hover:text-[#00b4db]">{t('nav.portfolio')}</a><a href="#jobs" className="hover:text-[#00b4db]">{t('nav.jobs')}</a><a href="#contact" className="hover:text-[#00b4db]">{t('nav.contact')}</a></div><p className="text-gray-600 text-xs md:text-end">© 2026 {content.settings.brandName}. {t('footer.rights')}</p></div></div></footer>;
}
export default Footer;

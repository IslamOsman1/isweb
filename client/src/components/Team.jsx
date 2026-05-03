import React from 'react';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';
function Team() {
  const { t, lang } = useLanguage();
  const { content } = useSiteData();
  return <section id="team" className="py-24 bg-white/[0.02] relative z-10"><div className="container mx-auto px-6"><div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-4xl md:text-5xl font-black mb-4">{t('team.title')}</h2><p className="text-gray-400">{t('team.desc')}</p></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-8">{content.team.map((m) => <div key={m.id} className="text-center group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition"><div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden mb-6 border-2 border-white/10 group-hover:border-[#00b4db] transition duration-500"><img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" /></div><h4 className="font-bold text-lg">{m.name}</h4><p className="text-sm text-gray-500">{lang === 'ar' ? m.roleAr : m.roleEn}</p></div>)}</div></div></section>;
}
export default Team;

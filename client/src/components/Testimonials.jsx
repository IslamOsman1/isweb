import React from 'react';
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';
function Testimonials() {
  const { t, lang } = useLanguage();
  const { content } = useSiteData();
  return <section id="testimonials" className="py-24 bg-gradient-to-b from-transparent to-white/[0.02] relative z-10"><div className="container mx-auto px-6"><div className="text-center max-w-3xl mx-auto mb-16"><h2 className="text-4xl md:text-5xl font-black mb-6 text-white">{t('testimonials.title')}</h2><div className="w-16 h-1 bg-gradient-to-r from-[#00b4db] to-[#00b09b] mx-auto rounded-full mb-6" /><p className="text-gray-400">{t('testimonials.desc')}</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{content.testimonials.map((testi) => <div key={testi.id} className="bg-white/5 border border-white/10 rounded-3xl p-8 relative hover:bg-white/10 transition duration-300"><Quote className="absolute top-6 right-6 text-white/10 w-12 h-12 rotate-180" /><div className="flex text-yellow-400 mb-6 gap-1 relative z-10">{[...Array(5)].map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div><p className="text-gray-300 leading-relaxed mb-8 relative z-10 text-sm">“{lang === 'ar' ? testi.quoteAr : testi.quoteEn}”</p><div className="flex items-center gap-4 border-t border-white/10 pt-6 relative z-10"><div className="w-12 h-12 bg-gradient-to-br from-[#00b4db] to-[#00b09b] rounded-full flex items-center justify-center font-bold text-lg">{(lang === 'ar' ? testi.nameAr : testi.nameEn).charAt(0)}</div><div><h4 className="font-bold">{lang === 'ar' ? testi.nameAr : testi.nameEn}</h4><p className="text-xs text-gray-500">{lang === 'ar' ? testi.roleAr : testi.roleEn}</p></div></div></div>)}</div></div></section>;
}
export default Testimonials;

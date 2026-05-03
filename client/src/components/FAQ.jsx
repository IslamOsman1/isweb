import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';
function FAQ() {
  const { t, lang } = useLanguage();
  const { content } = useSiteData();
  const [openFaq, setOpenFaq] = useState(0);
  return <section id="faq" className="py-24 container mx-auto px-6 relative z-10"><div className="max-w-5xl mx-auto"><div className="flex flex-col md:flex-row gap-12 items-start"><div className="md:w-1/3"><div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6"><HelpCircle className="text-[#00b4db] w-8 h-8" /></div><h2 className="text-4xl font-black mb-4">{t('faq.title')}</h2><p className="text-gray-400 mb-6">{t('faq.desc')}</p><a href="#contact" className="text-[#00b09b] font-bold inline-flex items-center gap-2 hover:gap-3 transition-all text-sm">{t('faq.more')} <ArrowRight className={`${lang === 'ar' ? 'rotate-180' : ''} w-4 h-4`} /></a></div><div className="md:w-2/3 w-full space-y-4">{content.faqs.map((faq, index) => <div key={faq.id} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'bg-white/10 border-[#00b4db]/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full text-start px-6 py-5 flex justify-between items-center focus:outline-none gap-4"><span className="font-bold text-lg">{lang === 'ar' ? faq.qAr : faq.qEn}</span><div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${openFaq === index ? 'bg-[#00b4db] text-white rotate-180' : 'bg-white/10 text-gray-400'}`}><ChevronDown size={18} /></div></button><AnimatePresence>{openFaq === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-5 text-gray-400 leading-relaxed text-sm">{lang === 'ar' ? faq.aAr : faq.aEn}</motion.div>}</AnimatePresence></div>)}</div></div></div></section>;
}
export default FAQ;

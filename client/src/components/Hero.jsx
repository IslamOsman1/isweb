import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';

function Hero() {
  const { lang, t } = useLanguage();
  const { content } = useSiteData();
  const stats = [t('hero.stat1'), t('hero.stat2'), t('hero.stat3')];
  return (
    <section id="home" className="container mx-auto px-6 pt-12 pb-24 md:pt-20 md:pb-32 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className={`lg:w-1/2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <motion.div initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center px-4 py-2 rounded-full bg-[#00b4db]/10 border border-[#00b4db]/20 mb-6"><span className="text-xs font-bold text-[#00b4db]">{t('hero.badge')}</span></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-black mb-8 leading-[1.1]">{t('hero.title1')} <span className="text-[#00b4db]">{t('hero.title2')}</span> <br />{t('hero.title3')} <span className="text-[#00b09b]">{t('hero.title4')}</span></motion.h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">{t('hero.desc')}</p>
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#contact" className="px-8 py-4 rounded-xl bg-[#00b4db] text-white font-black text-lg hover:bg-[#0083b0] transition shadow-lg shadow-[#00b4db]/20 flex items-center gap-3">{t('hero.cta')}<ArrowRight className={`w-6 h-6 ${lang === 'ar' ? 'rotate-180' : ''}`} /></a>
            <a href="#portfolio" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black text-lg hover:bg-white/10 transition">{t('hero.secondary')}</a>
          </div>
          <div className="grid grid-cols-3 gap-3 max-w-xl">
            {stats.map((item, i) => <div key={item} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center text-sm font-bold text-gray-300">{i === 0 && <Zap className="mx-auto mb-2 text-[#00b4db]" size={20} />}{i === 1 && <ShieldCheck className="mx-auto mb-2 text-[#00b09b]" size={20} />}{i === 2 && <Cpu className="mx-auto mb-2 text-[#00b4db]" size={20} />}{item}</div>)}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="lg:w-1/2 relative">
          <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 p-3"><img src={content.settings.heroImage} alt="Web Development" className="w-full h-auto object-cover rounded-[1.5rem]" /></div>
          <div className={`absolute -bottom-10 ${lang === 'ar' ? '-right-6' : '-left-6'} p-6 bg-[#0b101e]/90 backdrop-blur-lg border border-white/10 rounded-2xl z-20 hidden md:block shadow-xl`}><div className="flex items-center gap-4"><div className="bg-gradient-to-br from-[#00b09b] to-[#00b4db] p-3 rounded-lg"><Cpu className="text-white" /></div><div><p className="text-sm font-bold">{t('hero.tech')}</p><p className="text-xs text-gray-400">React, Vite, Node & MongoDB</p></div></div></div>
        </motion.div>
      </div>
    </section>
  );
}
export default Hero;

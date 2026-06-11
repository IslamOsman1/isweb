import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';

function Hero() {
  const { lang, t } = useLanguage();
  const { content } = useSiteData();
  const stats = [t('hero.stat1'), t('hero.stat2'), t('hero.stat3')];
  const align = lang === 'ar' ? 'lg:text-right' : 'lg:text-left';
  const isArabic = lang === 'ar';

  return (
    <section id="home" className="container relative z-10 mx-auto overflow-hidden px-4 pt-6 pb-20 sm:px-6 md:pt-20 md:pb-32">
      <div className="pointer-events-none absolute inset-x-6 top-4 -z-10 h-[28rem] rounded-[3rem] bg-[radial-gradient(circle_at_20%_20%,rgba(0,180,219,0.2),transparent_32%),radial-gradient(circle_at_80%_25%,rgba(0,176,155,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div className={`order-2 lg:order-1 ${align}`}>
          <div className="mb-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <motion.div initial={{ opacity: 0, x: isArabic ? 50 : -50 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 shadow-[0_12px_40px_rgba(4,10,26,0.2)] backdrop-blur-md">
              <Sparkles size={14} className="text-[#7ddff4]" />
              <span className="text-xs font-bold tracking-[0.18em] text-[#9ce7f7]">{t('hero.badge')}</span>
            </motion.div>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-white/0 via-white/10 to-white/0 lg:block" />
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5 text-center text-[2.85rem] font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-7xl lg:text-start">
            {t('hero.title1')} <span className="text-white/75">{t('hero.title2')}</span>
            <br />
            <span className="bg-gradient-to-r from-[#52d9ff] via-[#77e4d2] to-[#00b09b] bg-clip-text text-transparent">
              {t('hero.title3')} {t('hero.title4')}
            </span>
          </motion.h1>
          <p className="mb-8 max-w-xl text-center text-[1rem] leading-8 text-gray-300 sm:text-lg md:text-xl lg:text-start">
            {t('hero.desc')}
          </p>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a href="#contact" className="flex w-full items-center justify-center gap-3 rounded-[1.35rem] bg-white px-6 py-4 text-base font-black text-[#07111f] shadow-[0_22px_40px_rgba(255,255,255,0.12)] transition hover:-translate-y-0.5 sm:w-auto sm:px-8 sm:text-lg">
              {t('hero.cta')}
              <ArrowRight className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} />
            </a>
            <a href="#portfolio" className="w-full rounded-[1.35rem] border border-white/10 bg-[#0f1a2b]/70 px-6 py-4 text-center text-base font-black text-white backdrop-blur-md transition hover:bg-[#152238] sm:w-auto sm:px-8 sm:text-lg">
              {t('hero.secondary')}
            </a>
          </div>
          <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((item, i) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-[#0d1727]/72 p-4 shadow-[0_20px_40px_rgba(2,6,18,0.28)] backdrop-blur-md">
                <div className={`mb-3 flex items-center ${isArabic ? 'justify-end' : 'justify-start'} sm:justify-center`}>
                  {i === 0 && <Zap className="text-[#52d9ff]" size={18} />}
                  {i === 1 && <ShieldCheck className="text-[#77e4d2]" size={18} />}
                  {i === 2 && <Cpu className="text-[#52d9ff]" size={18} />}
                </div>
                <p className="text-sm font-bold text-gray-200 max-sm:text-center sm:text-center">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.15 }} className="order-1 relative lg:order-2">
          <div className="absolute inset-0 translate-y-6 rounded-[2.5rem] bg-gradient-to-br from-[#00b4db]/15 to-[#00b09b]/10 blur-2xl" />
          <div className="relative rounded-[2.3rem] border border-white/10 bg-[#081120]/78 p-3 shadow-[0_30px_100px_rgba(4,10,26,0.6)] backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[1.9rem]">
              <img src={content.settings.heroImage} alt="Web Development" className="aspect-[5/6] w-full object-cover sm:aspect-[4/3] lg:aspect-[5/6]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,32,0.05),rgba(8,17,32,0.75))]" />
            </div>
            <div className={`absolute top-8 ${isArabic ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} rounded-[1.4rem] border border-white/10 bg-[#0f1a2b]/78 px-4 py-3 shadow-xl backdrop-blur-xl`}>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/10 p-2.5">
                  <Sparkles size={16} className="text-[#9ce7f7]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9ce7f7]">Studio</p>
                  <p className="text-sm font-semibold text-white">Creative Build</p>
                </div>
              </div>
            </div>
            <div className={`absolute bottom-4 ${isArabic ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} max-w-[15rem] rounded-[1.5rem] border border-white/10 bg-[#0b101e]/78 p-4 shadow-xl backdrop-blur-xl sm:max-w-xs`}>
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-[#00b09b] to-[#00b4db] p-3">
                  <Cpu className="text-white" size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold">{t('hero.tech')}</p>
                  <p className="text-xs text-gray-400">React, Vite, Node & MongoDB</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {stats.map((item, i) => (
                  <div key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold text-gray-100">
                    {i === 0 && <Zap className="text-[#52d9ff]" size={12} />}
                    {i === 1 && <ShieldCheck className="text-[#77e4d2]" size={12} />}
                    {i === 2 && <Cpu className="text-[#52d9ff]" size={12} />}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default Hero;

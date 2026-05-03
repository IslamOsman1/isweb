import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Code, ShoppingCart, Palette, Wrench } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useSiteData } from '../data/DataContext';

const iconMap = { layout: Layout, smartphone: Smartphone, code: Code, cart: ShoppingCart, palette: Palette, wrench: Wrench };
function Services() {
  const { t, lang } = useLanguage();
  const { content } = useSiteData();
  return (
    <section id="services" className="py-24 bg-white/[0.02] relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16"><span className="text-[#00b4db] text-sm font-black tracking-wide">{t('services.badge')}</span><h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 text-white">{t('services.title')}</h2><p className="text-gray-400 leading-relaxed">{t('services.desc')}</p><div className="w-16 h-1 bg-gradient-to-r from-[#00b4db] to-[#00b09b] mx-auto rounded-full mt-6" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {content.services.map((item, i) => { const Icon = iconMap[item.icon] || Layout; return <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.06 }} viewport={{ once: true }} className="group bg-white/5 rounded-3xl border border-white/10 p-7 hover:bg-white/[0.08] hover:border-[#00b4db]/40 transition"><div className="w-14 h-14 rounded-2xl bg-[#00b4db]/10 border border-[#00b4db]/20 flex items-center justify-center text-[#00b4db] mb-6 group-hover:scale-110 transition"><Icon /></div><h3 className="text-xl font-black mb-3">{lang === 'ar' ? item.titleAr : item.titleEn}</h3><p className="text-gray-400 text-sm leading-relaxed">{lang === 'ar' ? item.descAr : item.descEn}</p></motion.div> })}
        </div>
      </div>
    </section>
  );
}
export default Services;

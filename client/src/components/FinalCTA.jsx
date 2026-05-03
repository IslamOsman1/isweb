import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

function FinalCTA() {
  const { t } = useLanguage();
  return (
    <section className="py-24 container mx-auto px-6">
      <motion.div 
        whileInView={{ scale: [0.95, 1] }}
        className="bg-gradient-to-r from-[#00b4db] to-[#00b09b] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10">{t('finalCta.title')}</h2>
        <a href="#contact" className="inline-block bg-white text-[#0b101e] px-10 py-4 rounded-full font-black text-lg hover:shadow-2xl transition relative z-10">
          {t('finalCta.btn')}
        </a>
      </motion.div>
    </section>
  );
}

export default FinalCTA;
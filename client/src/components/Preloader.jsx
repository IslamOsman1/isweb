import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0b101e] flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl md:text-5xl font-black flex items-center mb-6" dir="ltr"
            >
              <span className="text-white">Is</span>
              <span className="bg-gradient-to-r from-[#00b4db] to-[#00b09b] text-transparent bg-clip-text ml-1">Web</span>
            </motion.div>
            <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-[#00b4db] to-[#00b09b] rounded-full shadow-[0_0_10px_#00b4db]"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
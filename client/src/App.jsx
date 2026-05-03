import React from 'react';
import { LanguageProvider } from './LanguageContext';
import { DataProvider } from './data/DataContext';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Blog from './components/Blog';
import Jobs from './components/Jobs';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import SeoHead from './components/SeoHead';

function Site() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Team />
      <Blog />
      <Jobs />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  const isAdmin = window.location.pathname.startsWith('/admin');

  return (
    <LanguageProvider>
      <DataProvider>
        <SeoHead />
        <CustomCursor />
        <Preloader />
        <ScrollToTop />
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0083b0]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00b09b]/10 blur-[120px] rounded-full" />
        </div>
        {isAdmin ? <Dashboard /> : <Site />}
      </DataProvider>
    </LanguageProvider>
  );
}

export default App;

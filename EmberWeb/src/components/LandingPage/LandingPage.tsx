import { Component } from 'solid-js';
import MainHero from './MainHero';
import Features from './Features';
import Download from './Download';
import Footer from './Footer';
import NavBar from '../MenuBar/Navbar';

const LandingPage: Component = () => {
  return (
    <div class="min-h-screen bg-[#f5f5f7] text-[#232a34]">
      <NavBar />
      <MainHero />
      <Features />
      <Download />
      <Footer />
    </div>
  );
};

export default LandingPage;
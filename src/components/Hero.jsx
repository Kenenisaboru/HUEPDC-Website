import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaTree, FaRecycle, FaUsers } from 'react-icons/fa';
import CountUp from 'react-countup';
import HeroBg from '../Images/photo_2025-02-01_14-31-17.jpg'; // Using one of the provided images

const StatItem = ({ icon, count, label, suffix = "" }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary-light)' }}>{icon}</div>
    <div style={{ fontSize: '2rem', fontWeight: '800' }}>
      <CountUp end={count} duration={2.5} suffix={suffix} />
    </div>
    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{label}</div>
  </div>
);

const Hero = ({ impactData }) => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${HeroBg})` }}></div>
      <div className="hero-overlay"></div>
      
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1rem', 
            background: 'rgba(46, 125, 50, 0.3)', 
            border: '1px solid rgba(76, 175, 80, 0.5)',
            borderRadius: '50px', 
            marginBottom: '1.5rem',
            backdropFilter: 'blur(5px)'
          }}>
            🌱 Protecting Haramaya's Future
          </span>
          <h1 className="hero-title">
            Environmental Protection & <br />
            <span style={{ color: 'var(--primary-light)' }}>Development Club</span>
          </h1>
          <p className="hero-subtitle">
            Join the movement. We are dedicated to sustainable development, 
            environmental education, and community-driven conservation initiatives.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
              Explore Projects
            </button>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid white', backdropFilter: 'blur(5px)' }} onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
          </div>

          <motion.div 
            className="glass"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '2rem', 
              padding: '2rem', 
              borderRadius: '16px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <StatItem icon={<FaTree />} count={impactData.treesPlanted} label="Trees Planted" suffix="+" />
            <StatItem icon={<FaRecycle />} count={impactData.carbonReduced} label="CO₂ Reduced (tons)" />
            <StatItem icon={<FaUsers />} count={impactData.volunteers} label="Active Members" suffix="+" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-down"
        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
      >
        <FaArrowDown />
      </motion.div>
    </section>
  );
};

export default Hero;

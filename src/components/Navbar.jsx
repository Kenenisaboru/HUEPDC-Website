import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon, FaUserPlus } from 'react-icons/fa';
import Logo from '../Images/Logo.jpg';

const Navbar = ({ activeSection, darkMode, toggleDarkMode, setShowRegistration }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container nav-container">
        <a href="#home" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src={Logo} alt="HUEPDC" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--primary)' }}>HUEPDC</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          
          <button 
            onClick={toggleDarkMode} 
            className="btn" 
            style={{ padding: '8px', background: 'transparent', color: 'var(--text-primary)' }}
            aria-label="Toggle Theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button 
            onClick={() => setShowRegistration(true)} 
            className="btn btn-primary"
            style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}
          >
            <FaUserPlus /> Join
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--text-primary)' }}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu Styles injected for simplicity */}
        <style>{`
          @media (max-width: 768px) {
            .nav-links { display: none; }
            .mobile-menu-btn { display: block !important; }
          }
        `}</style>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass"
          style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-color)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}
            >
              {link.label}
            </a>
          ))}
          <button onClick={() => { toggleDarkMode(); setMobileMenuOpen(false); }} className="btn btn-secondary" style={{ width: '100%' }}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={() => { setShowRegistration(true); setMobileMenuOpen(false); }} className="btn btn-primary" style={{ width: '100%' }}>
            Join Club
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

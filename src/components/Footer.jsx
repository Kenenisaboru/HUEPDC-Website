import React from 'react';
import { FaGithub, FaFacebook, FaTwitter, FaInstagram, FaTelegram, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Brand */}
          <div>
            <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>HUEPDC</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Empowering the next generation of environmental leaders at Haramaya University. 
              Together for a greener, sustainable future.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {[FaFacebook, FaTwitter, FaInstagram, FaTelegram].map((Icon, i) => (
                <a key={i} href="#" style={{ color: 'white', fontSize: '1.2rem', opacity: 0.8, transition: 'opacity 0.2s' }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {['Home', 'About Us', 'Projects', 'Events', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '')}`} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Contact Us</h4>
            <p style={{ fontSize: '0.9rem' }}>Haramaya University, Main Campus</p>
            <p style={{ fontSize: '0.9rem' }}>Building 2, Dire Dawa, Ethiopia</p>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>huepdc@haramaya.edu.et</p>
            <p style={{ fontSize: '0.9rem' }}>+251 72365307</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #334155', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <p>© {new Date().getFullYear()} HUEPDC. All rights reserved.</p>
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span>Made with <FaHeart style={{ color: '#ef4444', verticalAlign: 'middle' }} /> by</span>
            <a href="https://github.com/Kenenisaboru" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              Kenenisa Boru
            </a>
            <span>&</span>
            <a href="https://github.com/urjiiko1" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              Gemachis Tesfaye
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

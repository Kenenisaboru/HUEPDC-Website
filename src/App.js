import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

// Styles
import './App.css';

// Images (Imported here to pass down)
import Photo20250201 from "./Images/photo_2025-02-01_14-31-17.jpg";
import Photo20251025_1 from "./Images/photo_2025-10-25_13-50-20.jpg";
import Photo20251025_2 from "./Images/photo_2025-10-25_13-50-52.jpg";
import Photo20251115_1 from "./Images/photo_2025-11-15_19-20-18.jpg";
import Photo20251115_2 from "./Images/photo_2025-11-15_19-20-21.jpg";
import Photo20251115_3 from "./Images/photo_2025-11-15_19-20-25.jpg";
import Photo20251115_4 from "./Images/photo_2025-11-15_19-20-29.jpg";

// Placeholder components for sections I didn't fully extract to save space, 
// but in a real project, these would be in separate files too.
const AboutSection = () => (
  <section id="about" className="section-padding">
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem' }}>Who We Are</h2>
        <p className="gradient-text" style={{ fontWeight: '600' }}>Champions of Sustainability</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="card">
          <h3>Our Mission</h3>
          <p>To champion environmental protection and sustainable development through education, research, and community engagement at Haramaya University and beyond.</p>
        </div>
        <div className="card">
          <h3>Our Vision</h3>
          <p>To become a leading center of excellence for environmental conservation and sustainable development in Ethiopia by 2030.</p>
        </div>
        <div className="card">
          <h3>Core Values</h3>
          <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
            <li>Sustainability</li>
            <li>Community Empowerment</li>
            <li>Innovation</li>
            <li>Integrity</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => (
  <section id="projects" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem' }}>Featured Projects</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {[
          { title: 'Green Campus Initiative', progress: 85, desc: 'Transforming campus infrastructure for sustainability.', impact: 'Reduced campus carbon emissions by 30%' },
          { title: 'Community Awareness', progress: 60, desc: 'Educating local communities on environmental protection.', impact: 'Reached 5,000+ community members' },
          { title: 'Waste Management Research', progress: 75, desc: 'Innovative solutions for circular economy models.', impact: 'Developed 3 sustainable waste solutions' }
        ].map((project, i) => (
          <motion.div 
            key={i} 
            className="card"
            whileHover={{ y: -10 }}
          >
            <div style={{ height: '200px', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '3rem', opacity: 0.2 }}>🌱</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--primary)' }}>Impact:</strong> {project.impact}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px' }}>
                <div style={{ width: `${project.progress}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProTipsSection = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const tips = [
    { id: 1, category: 'daily', icon: '🔌', title: 'Energy Conservation at Home', desc: 'Switch to LED bulbs and unplug devices when not in use to reduce electricity consumption by 20-30%.' },
    { id: 2, category: 'daily', icon: '💧', title: 'Water Saving Tips', desc: 'Fix leaking taps and take shorter showers. One person can save 8,000 gallons annually.' },
    { id: 3, category: 'daily', icon: '♻️', title: 'Reduce Plastic Waste', desc: 'Use reusable bags, bottles, and containers. Plastic takes 500+ years to decompose.' },
    { id: 4, category: 'community', icon: '🌍', title: 'Community Clean-ups', desc: 'Organize or participate in local cleanup drives. Every piece of trash removed protects wildlife.' },
    { id: 5, category: 'community', icon: '🌱', title: 'Tree Planting Initiatives', desc: 'Plant native trees in your area. One tree absorbs 20kg of CO2 in its lifetime.' },
    { id: 6, category: 'community', icon: '🤝', title: 'Educate Your Circle', desc: 'Share environmental knowledge with friends and family. Education drives behavioral change.' },
    { id: 7, category: 'campus', icon: '📚', title: 'Sustainable Campus Practices', desc: 'Use digital notes instead of paper. Advocate for renewable energy on campus.' },
    { id: 8, category: 'campus', icon: '🚴', title: 'Green Transportation', desc: 'Use bikes or public transport. Reduce your carbon footprint by up to 90% compared to driving.' },
    { id: 9, category: 'food', icon: '🥬', title: 'Support Local & Organic', desc: 'Buy from local farmers. Reduces food miles and supports sustainable agriculture.' },
    { id: 10, category: 'food', icon: '🌾', title: 'Reduce Food Waste', desc: 'Plan meals ahead and compost organic waste. Food waste contributes to methane emissions.' },
    { id: 11, category: 'career', icon: '💼', title: 'Green Career Path', desc: 'Consider roles in renewable energy, conservation, or sustainable development.' },
    { id: 12, category: 'career', icon: '📈', title: 'Invest in Sustainability', desc: 'Support businesses and startups focused on environmental solutions.' }
  ];

  const categories = [
    { id: 'all', name: 'All Tips', emoji: '✨' },
    { id: 'daily', name: 'Daily Habits', emoji: '🏠' },
    { id: 'community', name: 'Community', emoji: '🌍' },
    { id: 'campus', name: 'Campus Life', emoji: '🎓' },
    { id: 'food', name: 'Food & Agriculture', emoji: '🥗' },
    { id: 'career', name: 'Career', emoji: '💼' }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  return (
    <section id="tips" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Pro Tips for Sustainability</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            Practical actions you can take today to make a positive environmental impact
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                border: 'none',
                background: selectedCategory === cat.id ? 'var(--primary)' : 'var(--bg-secondary)',
                color: selectedCategory === cat.id ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontWeight: selectedCategory === cat.id ? '600' : '500',
                transition: 'all 0.3s',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap'
              }}
            >
              {cat.emoji} {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Tips Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          <AnimatePresence>
            {filteredTips.map((tip) => (
              <motion.div
                key={tip.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="card"
                whileHover={{ y: -8 }}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{tip.icon}</div>
                <h3 style={{ marginBottom: '0.5rem' }}>{tip.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{tip.desc}</p>
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                  }}>
                    Learn more →
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            Ready to implement these tips? Join our community!
          </p>
          <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Start Your Sustainability Journey
          </button>
        </div>
      </div>
    </section>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showRegistration, setShowRegistration] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('huepdc-theme');
    return savedMode === 'dark';
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('huepdc-theme', !darkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Data
  const impactData = {
    treesPlanted: 28976,
    carbonReduced: 420.8,
    volunteers: 2450
  };

  const galleryImages = [
    { id: 1, title: 'Field Research', src: Photo20250201, category: 'research', description: 'Team conducting environmental impact assessment.' },
    { id: 2, title: 'Solar Workshop', src: Photo20251025_1, category: 'education', description: 'Teaching students about renewable energy.' },
    { id: 3, title: 'Eco Education', src: Photo20251025_2, category: 'education', description: 'Classroom session on biodiversity.' },
    { id: 4, title: 'Waste Management', src: Photo20251115_1, category: 'community', description: 'Community recycling drive.' },
    { id: 5, title: 'Community Meeting', src: Photo20251115_2, category: 'community', description: 'Discussing local environmental issues.' },
    { id: 6, title: 'Sustainable Tech', src: Photo20251115_3, category: 'conservation', description: 'Implementing green technology.' },
  ];

  const galleryCategories = [
    { id: 'all', name: 'All' },
    { id: 'research', name: 'Research' },
    { id: 'education', name: 'Education' },
    { id: 'community', name: 'Community' },
  ];

  return (
    <div className="App">
      <ToastContainer theme={darkMode ? 'dark' : 'light'} />
      
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--primary)',
          transformOrigin: '0%',
          zIndex: 2000
        }}
      />

      <Navbar 
        activeSection={activeSection} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        setShowRegistration={setShowRegistration}
      />

      <Hero impactData={impactData} />
      
      <AboutSection />
      
      <ProjectsSection />

      <ProTipsSection />

      <section id="events" className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Upcoming Events</h2>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
             <h3>📅 2026 Calendar Coming Soon</h3>
             <p>We are planning exciting events for the next academic year.</p>
             <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setShowRegistration(true)}>
               Get Notified
             </button>
          </div>
        </div>
      </section>

      <Gallery images={galleryImages} categories={galleryCategories} />

      <section id="contact" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Ready to Make a Difference?</h2>
          <button className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }} onClick={() => setShowRegistration(true)}>
            Join HUEPDC Today
          </button>
        </div>
      </section>

      <Footer />

      {/* Registration Modal (Simplified for brevity) */}
      {showRegistration && (
        <div className="lightbox-overlay" onClick={() => setShowRegistration(false)}>
          <motion.div 
            className="card" 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ width: '500px', maxWidth: '90%', background: 'var(--bg-primary)' }}
            onClick={e => e.stopPropagation()}
          >
            <h2>Join the Club</h2>
            <p>Enter your details to become a member.</p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }} onSubmit={(e) => { e.preventDefault(); alert('Application Submitted!'); setShowRegistration(false); }}>
              <input type="text" placeholder="Full Name" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} required />
              <input type="email" placeholder="Email" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} required />
              <button type="submit" className="btn btn-primary">Submit Application</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;

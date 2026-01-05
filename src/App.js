import React, { useState, useEffect } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useSpring, animated } from 'react-spring';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Cleaned React Icons imports - only what's actually used
import {
  FaLeaf, FaUsers, FaTree, FaRecycle, FaInstagram, FaFacebook, FaTwitter, FaTelegram,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight, FaHome, FaCompass,
  FaBook, FaGraduationCap, FaMicroscope, FaBrain, FaSeedling, FaShieldAlt, 
  FaHandsHelping, FaNewspaper, FaCalendarCheck, FaChartBar, FaProjectDiagram, 
  FaRocket, FaBullhorn, FaNetworkWired, FaBuilding, FaCalendarAlt, FaGlobeAfrica,
  FaBookOpen, FaCode, FaBars, FaTimes, FaSun, FaMoon, FaSpinner,
  FaCalendarDay, FaUserFriends, FaRegCalendarAlt, FaUserPlus, FaCommentAlt,
  FaGithub
} from 'react-icons/fa';

// Image imports
import Logo from "./Images/Logo.jpg";
import Photo20250201 from "./Images/photo_2025-02-01_14-31-17.jpg";
import Photo20251025_1 from "./Images/photo_2025-10-25_13-50-20.jpg";
import Photo20251025_2 from "./Images/photo_2025-10-25_13-50-52.jpg";
import Photo20251115_1 from "./Images/photo_2025-11-15_19-20-18.jpg";
import Photo20251115_2 from "./Images/photo_2025-11-15_19-20-21.jpg";
import Photo20251115_3 from "./Images/photo_2025-11-15_19-20-25.jpg";
import Photo20251115_4 from "./Images/photo_2025-11-15_19-20-29.jpg";

// Additional images
import ProjectHero from "./Images/photo_2025-02-01_14-31-17.jpg";
import CommunityImage from "./Images/photo_2025-10-25_13-50-20.jpg";
import ResearchImage from "./Images/photo_2025-11-15_19-20-18.jpg";

Chart.register(...registerables);

// Enhanced Image Component
const ImageWithLoader = ({ src, alt, className, style, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  return (
    <div className={`image-container ${!loaded ? 'loading' : ''} ${error ? 'error' : ''}`}>
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          console.error(`Failed to load image: ${src}`);
          setError(true);
          e.currentTarget.onerror = null;
          e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%2300C9A7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Montserrat' font-size='16' font-weight='bold'%3E${encodeURIComponent(alt || 'HUEPDC')}%3C/text%3E%3C/svg%3E`;
          setLoaded(true);
        }}
        {...props}
      />
      {!loaded && (
        <div className="image-skeleton">
          <FaSpinner className="spinner" />
        </div>
      )}
      {error && (
        <div className="image-error">
          <span>Image failed to load</span>
        </div>
      )}
    </div>
  );
};

// Enhanced CountUp Component
const EnhancedCountUp = ({ end, duration, suffix, prefix, decimals, formattingFn, ...props }) => (
  <CountUp
    end={end}
    duration={duration || 3}
    suffix={suffix || ''}
    prefix={prefix || ''}
    decimals={decimals || 0}
    separator=","
    formattingFn={formattingFn || ((value) => {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M${suffix || ''}`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K${suffix || ''}`;
      }
      return `${value.toLocaleString()}${suffix || ''}`;
    })}
    {...props}
  />
);

function App() {
  // State Management
  const [activeSection, setActiveSection] = useState('home');
  const [showRegistration, setShowRegistration] = useState(false);
  const [activeGallery, setActiveGallery] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('huepdc-theme');
    if (savedMode) return savedMode === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Impact Data for Hero Section
  const [impactData] = useState({
    treesPlanted: 28976,
    carbonReduced: 420.8,
    waterSaved: 450000,
    wasteRecycled: 78.5,
    volunteers: 2450,
    speciesProtected: 42,
    communitiesEngaged: 18,
    researchPapers: 67,
    eventsOrganized: 45,
    studentsTrained: 5200
  });

  // Club Details
  const clubDetails = {
    mission: "To champion environmental protection and sustainable development through education, research, and community engagement at Haramaya University and beyond.",
    vision: "To become a leading center of excellence for environmental conservation and sustainable development in Ethiopia by 2030.",
    coreValues: [
      { icon: <FaSeedling />, title: "Sustainability", desc: "Commitment to long-term ecological balance" },
      { icon: <FaHandsHelping />, title: "Community", desc: "Inclusive and participatory approach" },
      { icon: <FaBrain />, title: "Innovation", desc: "Evidence-based and creative solutions" },
      { icon: <FaShieldAlt />, title: "Integrity", desc: "Ethical and transparent practices" },
      { icon: <FaGlobeAfrica />, title: "Impact", desc: "Measurable positive change" }
    ],
    strategicFocus: [
      "Environmental Education & Awareness",
      "Climate Change Mitigation & Adaptation",
      "Biodiversity Conservation",
      "Sustainable Waste Management",
      "Water Resource Protection",
      "Community Empowerment",
      "Research & Innovation",
      "Policy Advocacy"
    ]
  };
  
  const upcomingEvents = [
    { 
      id: 1,
      date: "Coming soon 2026",
      title: "Campus Cleanup Drive",
      description: "Join us for a university-wide cleanup campaign",
      location: "Main Campus",
      organizer: "HUEPDC Clean Team",
      participants: "All Active Members",
      time: "To be announced",
    },
    { 
      id: 2,
      date: "Coming soon 2026",
      title: "Environmental Workshop",
      description: "Learning sustainable waste management practices",
      location: "",
      organizer: "HUEPDC",
      participants: "Open to all students",
      time: "",
    },
    { 
      id: 3,
      date: "",
      title: "Tree Planting Ceremony",
      description: "Annual tree planting in partnership with local community",
      location: "University Green Area",
      organizer: "Green Initiative Team",
      participants: "Volunteers & Community",
      time: "",
    },
    { 
      id: 4,
      date: "",
      title: "Research Symposium",
      description: "Presenting environmental research findings",
      location: "Conference Hall",
      organizer: "Research Committee",
      participants: 120,
      time: " ",
    },
  ];

  // Projects Data with Contact and Events
  const projects = [
    {
      id: 1,
      title: "Green Campus Initiative",
      category: "Infrastructure",
      status: "Active",
      progress: 85,
      description: "Transforming Haramaya University campus through sustainable infrastructure, waste management systems, and environmental education programs.",
      impact: "40% reduction in campus carbon footprint, implementation of recycling stations",
      contact: {
        name: "Gelasa Jarso",
        role: "Project Lead",
        email: "gelasa.jarso@haramaya.edu.et",
        phone: "+251 72365307"
      },
      events: [
        { date: "15 Feb", title: "Campus Audit", type: "Assessment" },
        { date: "1 Mar", title: "Recycling Workshop", type: "Training" },
        { date: "15 Mar", title: "Progress Review", type: "Meeting" }
      ],
      partners: ["University Administration", "Student Union", "Local NGOs"],
      icon: <FaBuilding />,
      images: 12,
      mainImage: ProjectHero,
      imageAlt: "Green Campus Initiative at Haramaya University",
      studentRoles: ["Research Assistant", "Field Coordinator", "Community Liaison", "Data Analyst"],
      timeline: "Announced soon",
      budget: "To be announced"
    },
    {
      id: 2,
      title: "Community Environmental Awareness",
      category: "Education",
      status: "Active",
      progress: 60,
      description: "Educating local communities on environmental protection, sustainable agriculture, and waste management practices through workshops.",
      impact: "Trained 2,500 community members, established 15 environmental clubs in local schools",
      timeline: "Announced soon",
      contact: {
        name: "Firomsa Gizaw",
        role: "Community Coordinator and vice president",
      },
      events: [
        { date: "announced soon", title: "School Workshop", type: "Education" },
        { date: "announced soon", title: "Community Meeting", type: "Outreach" },
        { date: "announced soon", title: "Training Session", type: "Training" }
      ],
      partners: ["Haramaya University Student Council", "Local Schools", "Community Leaders"],
      icon: <FaBookOpen />,
      images: 18,
      mainImage: CommunityImage,
      imageAlt: "Community environmental awareness program",
      studentRoles: ["Workshop Facilitator", "Community Outreach", "Curriculum Developer"],
      budget: "To be announced"
    },
    {
      id: 3,
      title: "Waste Management Research",
      category: "Research",
      status: "Active",
      progress: 75,
      description: "Researching innovative waste management solutions and circular economy models suitable for Ethiopian context.",
      impact: "Published 15 research papers, developed 3 waste management prototypes",
      timeline: "Announced soon",
      contact: {
        name: "Zemzem Geda",
        role: "Secretary",
        email: "zemzem.geda@haramaya.edu.et",
      },
      events: [
        { date: "Announced soon", title: "Lab Tour", type: "Demonstration" },
        { date: "Announced soon", title: "Research Review", type: "Meeting" },
        { date: "Announced soon", title: "Findings Presentation", type: "Seminar" }
      ],
      partners: ["Haramaya University Student union", "Environmental Science Department"],
      icon: <FaMicroscope />,
      images: 15,
      mainImage: ResearchImage,
      imageAlt: "Waste management research laboratory",
      studentRoles: ["Lab Assistant", "Research Analyst", "Field Researcher"],
      budget: "To be announced"
    }
  ];

  // Gallery categories and images
  const galleryCategories = [
    { id: 'all', name: 'All Activities', count: 7 },
    { id: 'conservation', name: 'Conservation', count: 2 },
    { id: 'research', name: 'Research', count: 2 },
    { id: 'community', name: 'Community', count: 2 },
    { id: 'education', name: 'Education', count: 1 }
  ];

  const galleryImages = [
    { 
      id: 2, 
      title: 'Research Field Work', 
      src: Photo20250201, 
      category: 'research', 
      description: 'Environmental research team conducting field studies' 
    },
    { 
      id: 4, 
      title: 'Solar Installation Workshop', 
      src: Photo20251025_1, 
      category: 'education', 
      description: 'Training workshop on renewable energy technologies' 
    },
    { 
      id: 5, 
      title: 'Environmental Education', 
      src: Photo20251025_2, 
      category: 'education', 
      description: 'Environmental education workshop for university students' 
    },
    { 
      id: 6, 
      title: 'Waste Management Training', 
      src: Photo20251115_1, 
      category: 'community', 
      description: 'Community waste separation and recycling training program' 
    },
    { 
      id: 7, 
      title: 'Community Engagement', 
      src: Photo20251115_2, 
      category: 'community', 
      description: 'Engaging with local communities on environmental protection' 
    },
    { 
      id: 8, 
      title: 'Sustainable Solutions', 
      src: Photo20251115_3, 
      category: 'conservation', 
      description: 'Exploring sustainable campus waste management systems' 
    },
    { 
      id: 9, 
      title: 'Research Laboratory', 
      src: Photo20251115_4, 
      category: 'research', 
      description: 'Scientific analysis in environmental research laboratory' 
    }
  ];

  // Animation for Earth rotation
  const earthAnimation = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    loop: true,
    config: { duration: 20000 }
  });

  // Enhanced Theme Toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('huepdc-theme', newMode ? 'dark' : 'light');
    
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    document.body.classList.add('theme-transition');
    
    setTimeout(() => {
      if (newMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      
      toast.info(`${newMode ? '🌙 Dark' : '☀️ Light'} mode activated`, {
        position: "top-right",
        autoClose: 2000,
        theme: newMode ? "dark" : "light",
      });
    }, 50);
    
    setTimeout(() => {
      document.body.style.transition = '';
      document.body.classList.remove('theme-transition');
    }, 550);
  };

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Scroll detection
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'events', 'gallery', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50px 0px -50% 0px',
        threshold: 0.3
      }
    );

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Enhanced form submission
  const handleFormSubmit = async (e, formType = 'membership') => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`🎉 ${formType === 'membership' ? 'Application submitted successfully!' : 'Thank you for your interest!'}`, {
        position: "top-center",
        autoClose: 5000,
        theme: darkMode ? "dark" : "light",
      });
      
      e.target.reset();
      if (formType === 'membership') {
        setShowRegistration(false);
      }
    } catch (error) {
      toast.error('❌ Something went wrong. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle event registration
  const handleEventRegister = (event) => {
    toast.info(`Registering for "${event.title}"...`);
    setTimeout(() => {
      toast.success(`✅ Registered for "${event.title}"! Details sent to your email.`);
    }, 1500);
  };

  // Projects Progress Chart
  const projectsChartData = {
    labels: projects.map(p => p.title),
    datasets: [{
      label: 'Project Progress (%)',
      data: projects.map(p => p.progress),
      backgroundColor: [
        'rgba(46, 125, 50, 0.8)',
        'rgba(21, 101, 192, 0.8)',
        'rgba(255, 152, 0, 0.8)'
      ],
      borderColor: [
        'rgb(46, 125, 50)',
        'rgb(21, 101, 192)',
        'rgb(255, 152, 0)'
      ],
      borderWidth: 2
    }]
  };

  // Developer GitHub links
 // Keep the array and actually use it
const developers = [
  { name: "Kenenisa Boru", github: "https://github.com/Kenenisaboru" },
  { name: "Gemachis Tesfaye", github: "https://github.com/urjiiko1" }
];

// Then in the footer section:
<div className="developer-credits">
  <FaCode /> Website developed by: 
  <div className="developer-links">
    {developers.map((dev, index) => (
      <React.Fragment key={dev.name}>
        {index > 0 && <span className="separator"> & </span>}
        <a href={dev.github} target="_blank" rel="noopener noreferrer">
          <FaGithub /> {dev.name}
        </a>
      </React.Fragment>
    ))}
  </div>
</div>
  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme={darkMode ? 'dark' : 'light'}
      />

      {/* Enhanced Navigation */}
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="nav-container">
          <motion.div
            className="logo-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="logo-main">
              <animated.div style={earthAnimation} className="logo-spinner">
                <ImageWithLoader
                  src={Logo}
                  alt="HUEPDC Logo"
                  className="logo-image"
                />
              </animated.div>
              <div className="logo-text">
                <h1>HUEPDC</h1>
                <p>Environmental Protection & Development Club</p>
              </div>
            </div>
            <div className="logo-subtitle">
              Haramaya University
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''} 
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHome /> Home
            </a>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''} 
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaBook /> About
            </a>
            <a 
              href="#projects" 
              className={activeSection === 'projects' ? 'active' : ''} 
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaProjectDiagram /> Projects
            </a>
            <a 
              href="#events" 
              className={activeSection === 'events' ? 'active' : ''} 
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaCalendarDay /> Events
            </a>
            <a 
              href="#gallery" 
              className={activeSection === 'gallery' ? 'active' : ''} 
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaNewspaper /> Gallery
            </a>
            
            {/* Dark Mode Toggle */}
            <motion.button 
              className="theme-toggle" 
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </motion.button>

            <div className="nav-actions">
              <motion.button
                className="join-btn"
                onClick={() => {
                  setShowRegistration(true);
                  setMobileMenuOpen(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUserPlus /> Join Club
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-content">
                <motion.div
                  className="hero-text"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h1>
                    <span className="gradient-text">Leading Environmental Protection</span><br />
                    at Haramaya University
                  </h1>
                  
                  <p className="hero-subtitle">
                    Advancing environmental awareness, promoting sustainable practices, and strengthening community development through education, innovation, and meaningful action.
                  </p>

                  <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <div className="stat-card">
                      <FaTree />
                      <EnhancedCountUp 
                        end={impactData.treesPlanted} 
                        duration={3} 
                        suffix="+"
                      />
                      <span>Trees Planted</span>
                    </div>
                    <div className="stat-card">
                      <FaRecycle />
                      <EnhancedCountUp 
                        end={impactData.carbonReduced} 
                        duration={3} 
                        suffix=" tons"
                        decimals={1}
                      />
                      <span>CO₂ Reduced</span>
                    </div>
                    <div className="stat-card">
                      <FaUsers />
                      <EnhancedCountUp 
                        end={impactData.volunteers} 
                        duration={3} 
                        suffix="+"
                      />
                      <span>Active Members</span>
                    </div>
                    <div className="stat-card">
                      <FaCalendarDay />
                      <EnhancedCountUp 
                        end={impactData.eventsOrganized} 
                        duration={3} 
                        suffix="+"
                      />
                      <span>Events Organized</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    <motion.button
                      className="btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                    >
                      <FaRocket /> Our Projects
                    </motion.button>
                    <motion.button
                      className="btn-secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
                    >
                      <FaCalendarDay /> Upcoming Events
                    </motion.button>
                    <motion.button
                      className="btn-tertiary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowRegistration(true)}
                    >
                      <FaHandsHelping /> Join HUEPDC
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <motion.div
              className="header-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FaLeaf /> About HUEPDC
            </motion.div>
            <h2>Our Commitment to Environmental Protection</h2>
            <p className="section-subtitle">Student-led initiatives for sustainable development and environmental conservation</p>
          </div>

          <div className="about-grid">
            <div className="about-card mission-card">
              <div className="card-header">
                <FaBullhorn className="card-icon" />
                <h3>Our Mission</h3>
              </div>
              <p className="card-text">{clubDetails.mission}</p>
              <div className="core-values">
                <h4>Our Core Values</h4>
                <div className="values-grid">
                  {clubDetails.coreValues.map((value, idx) => (
                    <div key={idx} className="value-item">
                      <div className="value-icon">{value.icon}</div>
                      <div className="value-content">
                        <h5>{value.title}</h5>
                        <p>{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-card vision-card">
              <div className="card-header">
                <FaBrain className="card-icon" />
                <h3>Our Vision</h3>
              </div>
              <p className="card-text">{clubDetails.vision}</p>
              <div className="strategic-focus">
                <h4>Strategic Focus Areas</h4>
                <ul>
                  {clubDetails.strategicFocus.map((area, idx) => (
                    <li key={idx}>
                      <FaArrowRight /> {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="about-card leadership-card">
              <div className="card-header">
                <FaGraduationCap className="card-icon" />
                <h3>Club Leadership</h3>
              </div>
              <div className="leadership-mini">
                {[
                  { name: 'Gelasa Jarso', role: 'President' },
                  { name: 'Firomsa Gizaw', role: 'Vice President' },
                  { name: 'Zemzem Geda', role: 'Secretary' },
                ].map((member, idx) => (
                  <div key={idx} className="leader-mini">
                    <div className="leader-avatar-mini">
                      <FaGraduationCap />
                    </div>
                    <div className="leader-info-mini">
                      <h5>{member.name}</h5>
                      <p>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className="btn-tertiary"
                onClick={() => setShowRegistration(true)}
              >
                <FaHandsHelping /> Meet the Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Contact and Events */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2>Our Projects & Initiatives</h2>
            <p className="section-subtitle">Student-led environmental projects making a tangible impact</p>
          </div>

          <div className="projects-grid">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="project-image-container">
                  <div className="project-image-wrapper">
                    <ImageWithLoader 
                      src={project.mainImage} 
                      alt={project.imageAlt}
                      className="project-main-image"
                    />
                    <div className="project-category">{project.category}</div>
                  </div>
                </div>

                <div className="project-content-container">
                  <div className="project-header">
                    <div className="project-title-section">
                      <div className="project-icon-title">
                        <div className="project-icon">{project.icon}</div>
                        <h3>{project.title}</h3>
                      </div>
                      <div className="project-status">
                        <span className={`status-badge ${project.status.toLowerCase()}`}>
                          {project.status}
                        </span>
                        <div className="progress-indicator">
                          <span>Progress: {project.progress}%</span>
                          <div className="progress-bar">
                            <motion.div 
                              className="progress-fill" 
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-details-grid">
                    <div className="detail-item">
                      <FaCalendarAlt />
                      <div>
                        <span className="detail-label">Timeline</span>
                        <span className="detail-value">{project.timeline}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FaChartBar />
                      <div>
                        <span className="detail-label">Budget</span>
                        <span className="detail-value">{project.budget}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="project-contact-section">
                    <h4>
                      <FaCommentAlt /> Project Contact
                    </h4>
                    <div className="contact-info">
                      <div className="contact-person">
                        <FaUserFriends />
                        <div>
                          <strong>{project.contact.name}</strong>
                          <span>{project.contact.role}</span>
                        </div>
                      </div>
                      <div className="contact-methods">
                        {project.contact.email && (
                          <a href={`mailto:${project.contact.email}`}>
                            <FaEnvelope /> {project.contact.email}
                          </a>
                        )}
                        {project.contact.phone && (
                          <a href={`tel:${project.contact.phone}`}>
                            <FaPhone /> {project.contact.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Events */}
                  <div className="project-events-section">
                    <h4>
                      <FaRegCalendarAlt /> Upcoming Events
                    </h4>
                    <div className="events-list">
                      {project.events.map((event, eIdx) => (
                        <div key={eIdx} className="event-item">
                          <span className="event-date">{event.date}</span>
                          <span className="event-title">{event.title}</span>
                          <span className="event-type">{event.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="project-actions">
                    <motion.button 
                      className="btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        // Show project details in a toast
                        toast.info(`Loading details for ${project.title}...`);
                        setTimeout(() => {
                          toast.success(`Project details loaded! Contact: ${project.contact.name}`);
                        }, 1000);
                      }}
                    >
                      <FaCompass /> View Details
                    </motion.button>
                    <motion.button 
                      className="btn-secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowRegistration(true);
                        toast.info('Apply to join this project through the registration form');
                      }}
                    >
                      <FaHandsHelping /> Join Project
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Projects Progress Chart */}
          <motion.div 
            className="projects-progress-chart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3>Projects Progress Overview</h3>
            <Bar
              data={projectsChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Completion (%)'
                    }
                  }
                }
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="events">
        <div className="container">
          <div className="section-header">
            <h2>Upcoming Events & Activities</h2>
            <p className="section-subtitle">Join our environmental events and workshops</p>
          </div>

          <div className="events-grid">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                className="event-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="event-date-badge">
                  <div className="event-day">{event.date.split(' ')[0]}</div>
                  <div className="event-month">{event.date.split(' ')[1]}</div>
                  <div className="event-year">{event.date.split(' ')[2]}</div>
                </div>
                
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-details">
                    <div className="detail">
                      <FaMapMarkerAlt />
                      <span>{event.location}</span>
                    </div>
                    <div className="detail">
                      <FaCalendarAlt />
                      <span>{event.time}</span>
                    </div>
                    <div className="detail">
                      <FaUserFriends />
                      <span>{event.organizer}</span>
                    </div>
                    <div className="detail">
                      <FaUsers />
                      <span>{event.participants} participants</span>
                    </div>
                  </div>
                  
                  <div className="event-actions">
                    <motion.button
                      className="btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEventRegister(event)}
                    >
                      <FaUserPlus /> Register Now
                    </motion.button>
                    <button className="btn-tertiary">
                      <FaCalendarCheck /> Add to Calendar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="events-cta">
            <h3>Want to organize an event with us?</h3>
            <p>Partner with HUEPDC for environmental workshops, cleanups, or awareness campaigns</p>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRegistration(true)}
            >
              <FaNetworkWired /> Propose an Event
            </motion.button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-header">
            <h2>Our Activities Gallery</h2>
            <p className="section-subtitle">Documenting our environmental protection journey</p>
          </div>

          <div className="gallery-filters">
            {galleryCategories.map(category => (
              <motion.button
                key={category.id}
                className={`filter-btn ${activeGallery === category.id ? 'active' : ''}`}
                onClick={() => setActiveGallery(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name} <span className="filter-count">({category.count})</span>
              </motion.button>
            ))}
          </div>

          <div className="gallery-grid">
            {galleryImages
              .filter(img => activeGallery === 'all' || img.category === activeGallery)
              .map((image, idx) => (
                <motion.div
                  key={image.id}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="gallery-image">
                    <ImageWithLoader
                      src={image.src}
                      alt={image.title}
                    />
                    <div className="image-overlay">
                      <h4>{image.title}</h4>
                      <p>{image.description}</p>
                      <div className="image-badge">{image.category}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p className="section-subtitle">Join our environmental protection community</p>
          </div>

          <div className="contact-grid">
            <div className="contact-form-section">
              <h3>Student Membership Application</h3>
              <form onSubmit={(e) => handleFormSubmit(e, 'membership')}>
                <div className="form-row">
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div className="form-row">
                  <input type="tel" placeholder="Phone Number" required />
                  <input type="text" placeholder="Student ID" required />
                </div>
                <div className="form-row">
                  <select required>
                    <option value="">Select Faculty/Department</option>
                    <option>Environmental Science</option>
                    <option>Agriculture</option>
                    <option>Natural Resources</option>
                    <option>Social Sciences</option>
                    <option>Engineering</option>
                    <option>Other</option>
                  </select>
                  <select required>
                    <option value="">Year of Study</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>5th Year+</option>
                  </select>
                </div>
                <textarea
                  placeholder="Why do you want to join HUEPDC and what skills can you contribute?"
                  rows="4"
                  required
                />
                <button type="submit" className="btn-primary" disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <FaSpinner className="spinner" /> Processing...
                    </>
                  ) : (
                    <>
                      <FaRocket /> Submit Application
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="contact-info-section">
              <div className="info-card">
                <h4><FaMapMarkerAlt /> Club Location</h4>
                <p>
                  Haramaya University Main Campus<br />
                  Building 2,<br />
                  Dire Dawa, Ethiopia
                </p>
              </div>

              <div className="info-card">
                <h4><FaEnvelope /> Contact Information</h4>
                <div className="contact-methods">
                  <div className="contact-method">
                    <FaPhone />
                    <div>
                      <strong>Club President</strong>
                      <p>+251 72365307</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <FaEnvelope />
                    <div>
                      <strong>Email</strong>
                      <p>huepdc@haramaya.edu.et</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <FaCalendarDay />
                    <div>
                      <strong>Meeting Schedule</strong>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h4>Social Media</h4>
                <p>Follow our environmental protection activities</p>
                <div className="social-links">
                  <button
                    className="social-link facebook"
                    onClick={() => toast.info('Facebook page: @HUEPDCHaramaya')}
                  >
                    <FaFacebook /> Facebook
                  </button>
                  <button
                    className="social-link instagram"
                    onClick={() => toast.info('Instagram: @huepdc_haramaya')}
                  >
                    <FaInstagram /> Instagram
                  </button>
                  <button
                    className="social-link twitter"
                    onClick={() => toast.info('Twitter: @HUEPDC_HU')}
                  >
                    <FaTwitter /> Twitter
                  </button>
                  <button
                    className="social-link telegram"
                    onClick={() => toast.info('Telegram: t.me/hu_environmental')}
                  >
                    <FaTelegram /> Telegram
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col main-col">
              <div className="footer-logo">
                <ImageWithLoader
                  src={Logo}
                  alt="HUEPDC Logo"
                  className="footer-logo-image"
                />
                <div>
                  <h3>HUEPDC</h3>
                  <p className="tagline">Haramaya University Environmental Protection & Development Club</p>
                </div>
              </div>
              <p className="footer-mission">
                A student-led organization committed to environmental protection, 
                sustainable development, and community engagement.
              </p>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <button
                className="footer-link"
                onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}
              >
                Home
              </button>
              <button
                className="footer-link"
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              >
                About Us
              </button>
              <button
                className="footer-link"
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                Projects
              </button>
              <button
                className="footer-link"
                onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
              >
                Events
              </button>
            </div>

            <div className="footer-col">
              <h4>Resources</h4>
              <div className="footer-links">
                <button
                  className="footer-link"
                  onClick={() => toast.info('Project proposals available upon request')}
                >
                  Project Proposals
                </button>
                <button
                  className="footer-link"
                  onClick={() => toast.info('Environmental guidelines available in our library')}
                >
                  Environmental Guidelines
                </button>
                <button
                  className="footer-link"
                  onClick={() => toast.info('Training materials shared during workshops')}
                >
                  Training Materials
                </button>
                <button
                  className="footer-link"
                  onClick={() => toast.info('Event calendar updated monthly')}
                >
                  Event Calendar
                </button>
              </div>
            </div>

            <div className="footer-col">
              <h4>Get Involved</h4>
              <div className="footer-links">
                <button
                  className="footer-link"
                  onClick={() => setShowRegistration(true)}
                >
                  Become a Member
                </button>
                <button
                  className="footer-link"
                  onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
                >
                  Attend Events
                </button>
                <button
                  className="footer-link"
                  onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                >
                  Join Projects
                </button>
                <button
                  className="footer-link"
                  onClick={() => toast.info('Thank you for supporting student environmental initiatives!')}
                >
                  Support Our Work
                </button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              © {new Date().getFullYear()} HUEPDC - Haramaya University Environmental Protection and Development Club.
            </div>
            <div className="developer-credits">
              <FaCode /> Website developed by: 
              <div className="developer-links">
                <a href="https://github.com/Kenenisaboru" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> Kenenisa Boru
                </a>
                <span className="separator"> & </span>
                <a href="https://github.com/urjiiko1" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> Gemachis Tesfaye
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistration && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRegistration(false)}
          >
            <motion.div
              className="modal registration-modal"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Join HUEPDC Club</h2>
                <button className="close-btn" onClick={() => setShowRegistration(false)}>×</button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => handleFormSubmit(e, 'modal-membership')}>
                  <div className="form-section">
                    <h4>Student Information</h4>
                    <div className="form-grid">
                      <input type="text" placeholder="First Name" required />
                      <input type="text" placeholder="Last Name" required />
                      <input type="email" placeholder="University Email" required />
                      <input type="tel" placeholder="Phone Number" required />
                      <input type="text" placeholder="Student ID" required />
                      <select required>
                        <option value="">Faculty/Department</option>
                        <option>Environmental Science</option>
                        <option>Agriculture</option>
                        <option>Natural Resources</option>
                        <option>Social Sciences</option>
                        <option>Engineering</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Area of Interest</h4>
                    <div className="interest-checkboxes">
                      {[
                        'Tree Planting',
                        'Waste Management',
                        'Environmental Education',
                        'Research Projects',
                        'Community Outreach',
                        'Event Organization',
                      ].map((interest, idx) => (
                        <label key={idx} className="checkbox-label">
                          <input type="checkbox" name="interests" value={interest} />
                          <span className="checkmark"></span>
                          {interest}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button type="submit" className="btn-primary" disabled={formLoading}>
                      {formLoading ? (
                        <>
                          <FaSpinner className="spinner" /> Processing...
                        </>
                      ) : (
                        <>
                          <FaRocket /> Submit Application
                        </>
                      )}
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => setShowRegistration(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        className="fab"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowRegistration(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <FaUserPlus />
        <span>Join Now</span>
      </motion.button>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand } from 'react-icons/fa';

const Gallery = ({ images, categories }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Impact Gallery</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Visual stories from our recent activities, field research, and community engagement programs.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="card"
                style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', position: 'relative', height: '280px' }}
                onClick={() => setSelectedImage(img)}
                whileHover={{ y: -5 }}
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '1.5rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white'
                }}>
                  <h4 style={{ margin: 0, color: 'white' }}>{img.title}</h4>
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{img.category}</span>
                </div>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(5px)',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  color: 'white'
                }}>
                  <FaExpand />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                <FaTimes />
              </button>
              <img src={selectedImage.src} alt={selectedImage.title} className="lightbox-img" />
              <div style={{ marginTop: '1rem', color: 'white', textAlign: 'center' }}>
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import HeroBgImage from '../../Images/photo_2025-10-25_13-50-20.jpg';

const HeroSection = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${HeroBgImage})` }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block py-1 px-3 rounded-full bg-brand-green-light/20 border border-brand-green-light/30 text-brand-green-light font-medium text-sm mb-6 mt-16"
                >
                    Haramaya University
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white"
                >
                    Protecting Our <span className="text-brand-green-light">Environment</span>, Ensuring Our Future
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
                >
                    Join the HUEPDC in our mission to create a sustainable and greener campus through action, education, and innovation.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button variant="primary">
                        Join the Club
                    </Button>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 transition-colors rounded-lg font-bold text-white outline-none">
                        Upcoming Events
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;

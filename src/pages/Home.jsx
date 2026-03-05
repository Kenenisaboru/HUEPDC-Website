import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../features/Hero/HeroSection';

const Home = () => {
    return (
        <Layout>
            <HeroSection />
            {/* Additional sections (About, Events, Gallery, Blog) will go here */}
            <section className="py-20 px-4 container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4 text-brand-dark">Our Impact</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We are dedicated to fostering a culture of environmental stewardship within Haramaya University and beyond. Stay tuned for our statistics, events, and latest news!
                </p>
            </section>
        </Layout>
    );
};

export default Home;

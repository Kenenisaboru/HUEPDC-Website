import React from 'react';
import Navbar from './Navbar';
// We'll import a Footer here later

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-brand-light font-sans text-brand-dark overflow-x-hidden">
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow w-full">
                {children}
            </main>

            {/* Placeholder for Footer */}
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;

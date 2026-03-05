import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = "primary", onClick, type = "button", className = "" }) => {
    const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-brand-green text-white hover:bg-brand-green-light shadow-md focus:ring-brand-green-light",
        secondary: "bg-green-100 text-brand-green hover:bg-green-200 focus:ring-brand-green-light",
        outline: "border-2 border-brand-green text-brand-green hover:bg-green-50 focus:ring-brand-green",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default Button;

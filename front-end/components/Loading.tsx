import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="relative w-16 h-16">
            <motion.span
                animate={{ rotate: 360}}
                transition={{ loop: Infinity, duration: 1 }}
                className="block w-16 h-16 border-8 border-gray-400 border-t-gray-600 rounded-full absolute top-0 left-0">
            </motion.span>
        </div>
    )
}
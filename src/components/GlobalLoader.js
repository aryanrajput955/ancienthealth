import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // We want to ensure the loader stays on screen for at least a minimum 
        // amount of time so it doesn't just flash if the user has a fast connection.
        const minimumLoadTime = new Promise(resolve => setTimeout(resolve, 1500));

        // Wait for the window to fully load (assets, images, scripts)
        const windowLoad = new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });

        // Wait for both the minimum time AND the window load event
        Promise.all([minimumLoadTime, windowLoad]).then(() => {
            // Add a tiny extra delay for smoothness before firing the exit animation
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        });

        return () => window.removeEventListener('load', () => { });
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="global-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }}
                    className="fixed inset-0 z-[99999] bg-[#0f1c18] flex items-center justify-center overflow-hidden"
                >
                    {/* Grain Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                    {/* Animated Glow Backdrop */}
                    <motion.div
                        animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-96 h-96 bg-[#d4a574]/10 rounded-full blur-[100px]"
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
                        {/* Logo Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* SVG Leaf Logo Outline (Similar to Navbar) */}
                            <svg className="w-16 h-16 text-[#d4a574]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <motion.path
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v19M12 3c-2.5-1-4-1.5-6 1s-1 4.5 0 6c1.5 2.5 6 4 6 4s4.5-1.5 6-4c1-1.5.5-3.5 0-6s-3.5-2-6-1z"
                                />
                            </svg>
                        </motion.div>

                        {/* Title Animation */}
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                                className="text-2xl md:text-3xl font-serif text-white tracking-widest uppercase"
                            >
                                Ancient Health
                            </motion.h1>
                        </div>

                        {/* Loading Line */}
                        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mt-4">
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-[#d4a574]/60 text-xs tracking-[0.2em] font-light uppercase"
                        >
                            Preparing Your Sanctuary
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalLoader;

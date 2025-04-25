'use client';

import Link from 'next/link';
import Hero from '../../components/sections/Hero';
import ProductGrid from "../../components/sections/ProductGrid";
import Button from "../../components/ui/Button";
import { getFeaturedProducts } from "../../lib/dummyData";
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/animated-section';

export default function Home() {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add performance optimization for smoother animations
    // Pre-load and optimize critical animations
    const body = document.querySelector('body');
    if (body) {
      // Add a class to indicate we're on the home page (for CSS optimizations)
      body.classList.add('home-page');
      
      // Optimize rendering performance
      return () => body.classList.remove('home-page');
    }
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1.8,
          ease: [0.22, 0.03, 0.26, 1.0]
        }}
      >
        <Hero imagePath="/images/landing-page-bg.png" />
      </motion.div>
      
      {/* Main content starts here - this is where we'll scroll to after animation */}
      <div id="main-content">
        {/* Embroidered Collection - Image Right */}
        <AnimatedSection
          as="section"
          className="py-36 px-6 bg-gray-50 min-h-[90vh] flex items-center relative overflow-hidden"
          animation="fade"
          duration={0.8}
          threshold={0.2}
          once={false}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm">
                  <motion.h2 
                    className="text-5xl font-medium mb-8 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    Embroidered Collection
                  </motion.h2>
                  <motion.div 
                    className="w-32 h-1.5 bg-primary mb-10"
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: 128 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
                    viewport={{ once: false, amount: 0.5 }}
                  ></motion.div>
                  <motion.p 
                    className="text-xl mb-10 text-white leading-relaxed text-clip-fix"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    Our Embroidered collection showcases the artistry of traditional craftsmanship
                    with contemporary design. Meticulously hand-embroidered by skilled artisans,
                    each piece features intricate patterns that transform premium fabrics into
                    wearable works of art.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.4 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    <Button href="/embroidered" variant="primary">
                      Explore Collection
                    </Button>
                  </motion.div>
                </div>
              </div>
              <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-lg shadow-xl order-1 md:order-2">
                <motion.div
                  className="w-full h-full"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <img
                    src="/images/embroidered cover.png"
                    alt="Embroidered Collection"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </div>
            </div>
          </div>
          {/* Background image with animation */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
            style={{ backgroundImage: 'url("/images/embroidered.png")' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: false, amount: 0.3, margin: "-10%" }}
          />
        </AnimatedSection>
        
        {/* Animex Collection - Image Left */}
        <AnimatedSection
          as="section"
          className="py-36 px-6 bg-white min-h-[90vh] flex items-center relative overflow-hidden"
          animation="fade"
          duration={0.8}
          threshold={0.2}
          once={false}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-lg shadow-xl">
                <motion.div
                  className="w-full h-full"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <img
                    src="/images/zoro cover.png"
                    alt="Animex Collection"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </div>
              <div>
                <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm">
                  <motion.h2 
                    className="text-5xl font-medium mb-8 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    Animex Collection
                  </motion.h2>
                  <motion.div 
                    className="w-32 h-1.5 bg-accent mb-10"
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: 128 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
                    viewport={{ once: false, amount: 0.5 }}
                  ></motion.div>
                  <motion.p 
                    className="text-xl mb-10 text-white leading-relaxed text-clip-fix"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    Our Animex collection brings a bold artistic vision to luxury fashion. 
                    Featuring unique animal-inspired patterns and motifs, these pieces 
                    combine striking visual elements with superior craftsmanship for 
                    those who appreciate distinctive, statement-making design.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.4 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    <Button href="/animex" variant="accent">
                      Explore Collection
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          {/* Background image with animation */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
            style={{ backgroundImage: 'url("/images/anime bg.jpg")' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: false, amount: 0.3, margin: "-10%" }}
          />
        </AnimatedSection>
        
        {/* Engine Heads Collection - Image Right */}
        <AnimatedSection
          as="section"
          className="py-36 px-6 bg-gray-50 min-h-[90vh] flex items-center relative overflow-hidden"
          animation="fade"
          duration={0.8}
          threshold={0.2}
          once={false}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm">
                  <motion.h2 
                    className="text-5xl font-medium mb-8 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    Engine Heads Collection
                  </motion.h2>
                  <motion.div 
                    className="w-32 h-1.5 bg-primary mb-10"
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: 128 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
                    viewport={{ once: false, amount: 0.5 }}
                  ></motion.div>
                  <motion.p 
                    className="text-xl mb-10 text-white leading-relaxed text-clip-fix"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    Our Engine Heads collection represents the pinnacle of luxury shirt craftsmanship. 
                    Meticulously designed and tailored from premium fabrics, each piece offers 
                    unparalleled comfort and sophisticated style for the modern connoisseur.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.4 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    <Button href="/engine-heads" variant="primary">
                      Explore Collection
                    </Button>
                  </motion.div>
                </div>
              </div>
              <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-lg shadow-xl order-1 md:order-2">
                <motion.div
                  className="w-full h-full"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <img
                    src="/images/engine heads cover.jpg"
                    alt="Engine Heads Collection"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </div>
            </div>
        </div>
          {/* Background image with animation */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
            style={{ backgroundImage: 'url("/images/engine head background.png")' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: false, amount: 0.3, margin: "-10%" }}
          />
        </AnimatedSection>
        
        {/* Structured Collection - Image Left */}
        <AnimatedSection
          as="section"
          className="py-36 px-6 bg-white min-h-[90vh] flex items-center relative overflow-hidden"
          animation="fade"
          duration={0.8}
          threshold={0.2}
          once={false}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-lg shadow-xl">
                <motion.div
                  className="w-full h-full"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <img
                    src="/images/structured cover.png"
                    alt="Structured Collection"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </div>
              <div>
                <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm">
                  <motion.h2 
                    className="text-5xl font-medium mb-8 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    Structured Collection
                  </motion.h2>
                  <motion.div 
                    className="w-32 h-1.5 bg-accent mb-10"
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: 128 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
                    viewport={{ once: false, amount: 0.5 }}
                  ></motion.div>
                  <motion.p 
                    className="text-xl mb-10 text-white leading-relaxed text-clip-fix"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    Our Structured collection features sharp silhouettes with modern cuts and 
                    premium tailoring. Each garment is designed to create a refined, 
                    architectural aesthetic that combines bold lines with flowing shapes for a 
                    distinctly contemporary look.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.4 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    <Button href="/structured" variant="accent">
                      Explore Collection
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          {/* Background image with animation */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
            style={{ backgroundImage: 'url("/images/structured.png")' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: false, amount: 0.3, margin: "-10%" }}
          />
        </AnimatedSection>
        
        {/* Limited Edition Collection - Image Right */}
        <AnimatedSection
          as="section"
          className="py-36 px-6 bg-gray-50 min-h-[90vh] flex items-center relative overflow-hidden"
          animation="fade"
          duration={0.8}
          threshold={0.2}
          once={false}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm">
                  <motion.h2 
                    className="text-5xl font-medium mb-8 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    Limited Edition
                  </motion.h2>
                  <motion.div 
                    className="w-32 h-1.5 bg-primary mb-10"
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: 128 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
                    viewport={{ once: false, amount: 0.5 }}
                  ></motion.div>
                  <motion.p 
                    className="text-xl mb-10 text-white leading-relaxed text-clip-fix"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    Our Limited Edition collection features rare and exclusive designs crafted in small quantities.
                    Each piece is uniquely numbered and represents the pinnacle of luxury craftsmanship,
                    offering discerning customers a truly exclusive ownership experience that stands apart
                    from mainstream fashion.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.4 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    <Button href="/limited-edition" variant="primary">
                      Explore Collection
                    </Button>
                  </motion.div>
                </div>
              </div>
              <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-lg shadow-xl order-1 md:order-2">
                <motion.div
                  className="w-full h-full"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <img
                    src="/images/Limited edition cover.png"
                    alt="Limited Edition Collection"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </div>
            </div>
          </div>
          {/* Background image with animation */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
            style={{ backgroundImage: 'url("/images/limited edition.png")' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: false, amount: 0.3, margin: "-10%" }}
          />
        </AnimatedSection>
        
        {/* Brand Story */}
        <AnimatedSection
          as="section"
          className="py-40 px-6 bg-black text-white min-h-[80vh] flex items-center relative overflow-hidden"
          animation="fade"
          duration={0.8}
          threshold={0.2}
          once={false}
        >
          <div className="container mx-auto text-center max-w-5xl relative z-10">
            <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm inline-block">
              <motion.h2 
                className="text-6xl font-medium mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                viewport={{ once: false, amount: 0.5 }}
              >
                The Imperial Aura Story
              </motion.h2>
              <motion.div 
                className="w-32 h-1.5 bg-accent mx-auto mb-12"
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: 128 }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
              ></motion.div>
              <motion.p 
                className="max-w-4xl mx-auto text-2xl mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                Born from a passion for exquisite craftsmanship and timeless design, Imperial Aura brings together 
                the finest fabrics and meticulous attention to detail to create luxury clothing that transcends trends. 
                Each piece is a celebration of elegance, individuality, and the pursuit of perfection.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.4 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <Button href="/contact" variant="accent">
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </div>
          {/* Background image with animation */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            viewport={{ once: false, amount: 0.3, margin: "-10%" }}
          />
        </AnimatedSection>
    </div>
    </>
  );
}
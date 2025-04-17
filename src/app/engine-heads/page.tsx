import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCollection } from '../../../lib/dummyData';
import ProductGrid from '../../../components/sections/ProductGrid';

export const metadata = {
  title: 'Engine Heads Collection | Imperial Aura',
  description: 'Discover our Engine Heads collection featuring luxurious shirts with exquisite details and premium fabrics.',
  keywords: 'engine heads, luxury shirts, designer shirts, premium fabrics, Imperial Aura',
};

export default function EngineHeadsPage() {
  const products = getProductsByCollection('Engine Heads');

  return (
    <>
      {/* Collection Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="/images/engine head background.png"
          alt="Engine Heads Collection"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Engine Heads Collection
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Luxurious shirts with exquisite details and premium fabrics, designed 
            for those who appreciate sophistication and uncompromising quality.
          </p>
        </div>
      </section>
      
      {/* Collection Description */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/engine head background.png")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-6">About The Collection</h2>
            <p className="text-lg">
              Our Engine Heads collection represents the perfect blend of contemporary design and 
              traditional craftsmanship. Each shirt is meticulously tailored using the finest fabrics 
              and features subtle details that set them apart. From business meetings to special occasions, 
              these pieces embody luxury and sophistication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Craftsmanship</h3>
              <p className="mb-4">
                Every Engine Heads shirt is crafted by skilled artisans with decades of experience in 
                tailoring fine garments. The attention to detail is evident in the perfectly aligned 
                patterns, precision stitching, and immaculate finishes.
              </p>
              <p>
                We select only the highest quality materials, ensuring that each shirt not only looks 
                exceptional but feels remarkable against your skin and stands the test of time.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Design Philosophy</h3>
              <p className="mb-4">
                Our design approach balances classic elegance with contemporary touches. The result 
                is a collection of shirts that feel timeless yet modern, sophisticated yet understated.
              </p>
              <p>
                Each season, we introduce new color palettes and subtle design elements while 
                maintaining the core attributes that define the Engine Heads aesthetic: refinement, 
                quality, and impeccable taste.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/engine head background.png")' }}></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl font-medium mb-12 text-center">Distinctive Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Premium Materials</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We source the finest Egyptian cotton, silk, and performance fabrics from renowned mills around the world.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.055 2.264-.758 3.146a.795.795 0 0 1-.085.09" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Master Tailoring</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Every shirt is hand-cut and expertly constructed with precision stitching and thoughtful detailing.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19 3 14.25h18l-3.115-9.06a2.25 2.25 0 0 0-2.137-1.44h-9.596a2.25 2.25 0 0 0-2.137 1.44Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 18.75h3v-2.25a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v2.25Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Unique Design Elements</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Distinctive collar styles, subtle contrast details, and engineered patterns set our shirts apart.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-3 z-0" style={{ backgroundImage: 'url("/images/engine head background.png")' }}></div>
        <div className="container mx-auto relative z-10">
          <ProductGrid products={products} title="Engine Heads Collection" />
        </div>
      </section>
      
      {/* Care Guide */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/engine head background.png")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-3xl font-medium mb-6 text-center">Care Guide</h2>
          <p className="text-center mb-12">
            To ensure your Engine Heads shirts maintain their exceptional quality and appearance, 
            we recommend following these care instructions:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Washing</h3>
              <p className="text-sm">
                Hand wash or gentle machine wash with similar colors. Use mild detergent 
                and cold water. Avoid bleach.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Drying</h3>
              <p className="text-sm">
                Air dry naturally away from direct sunlight. Hang on a padded hanger to 
                maintain the shirt's shape.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Ironing</h3>
              <p className="text-sm">
                Iron at medium temperature on the reverse side while slightly damp. 
                Avoid ironing decorative elements directly.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-primary/10 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/engine head background.png")' }}></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-medium mb-6">Experience the Difference</h2>
          <p className="max-w-3xl mx-auto text-lg mb-8">
            Add a touch of luxury to your wardrobe with our Engine Heads collection. 
            Each piece is designed to make you look and feel exceptional.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  // This generates the static paths for all engine heads product pages
  return [];
} 
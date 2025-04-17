import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCollection } from '../../../lib/dummyData';
import ProductGrid from '../../../components/sections/ProductGrid';

export const metadata = {
  title: 'Embroidered Collection | Imperial Aura',
  description: 'Discover our Embroidered collection featuring handcrafted designs on premium fabrics with exquisite attention to detail.',
  keywords: 'embroidered clothing, luxury embroidery, handcrafted clothing, premium fashion, Imperial Aura',
};

export default function EmbroideredPage() {
  const products = getProductsByCollection('Embroidered');

  return (
    <>
      {/* Collection Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="/images/embroidered.png"
          alt="Embroidered Collection"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Embroidered Collection
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Meticulously handcrafted embroidery on premium fabrics, combining 
            traditional techniques with contemporary designs for the discerning individual.
          </p>
        </div>
      </section>
      
      {/* Collection Description */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/embroidered.png")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-6">The Art of Embroidery</h2>
            <p className="text-lg">
              Our embroidered collection represents the pinnacle of luxury fashion craftsmanship. 
              Each piece is meticulously created by skilled artisans who have honed their craft over 
              generations, bringing traditional techniques into the contemporary fashion landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Master Artisans</h3>
              <p className="mb-4">
                Our embroidery is executed by skilled craftspeople with decades of experience. 
                Each piece takes 80-100 hours to complete, with master artisans working meticulously 
                to create stunning patterns that balance tradition with contemporary aesthetics.
              </p>
              <p>
                The intricate details, precision stitching, and artistic composition speak to the 
                unparalleled expertise that goes into creating these exceptional garments.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Premium Materials</h3>
              <p className="mb-4">
                We source only the finest fabrics - silks, linens, and premium cottons - to serve 
                as the canvas for our intricate embroidery work. The quality of materials ensures 
                not only luxurious aesthetics but exceptional comfort and durability.
              </p>
              <p>
                Every stitch tells a story, every pattern has meaning, creating garments 
                that are not just clothing but wearable art pieces that celebrate our rich 
                textile heritage and contemporary design sensibility.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Embroidery Techniques */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/embroidered.png")' }}></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl font-medium mb-12 text-center">Our Embroidery Techniques</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Zardozi Embroidery</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Luxurious metallic threadwork with gold and silver accents, creating ornate and royal patterns.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Chikankari</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Delicate and intricate white threadwork on pastel fabrics, creating subtle yet sophisticated textures.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Mirror Work</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Vibrant embellishment using tiny mirrors sewn onto fabric with colorful threads, creating a dazzling effect.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-3 z-0" style={{ backgroundImage: 'url("/images/embroidered.png")' }}></div>
        <div className="container mx-auto relative z-10">
          <ProductGrid products={products} title="Embroidered Collection" />
        </div>
      </section>
      
      {/* Care Guide */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/embroidered.png")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-3xl font-medium mb-6 text-center">Care Guide</h2>
          <p className="text-center mb-12">
            To preserve the beauty and quality of your embroidered garments, we recommend the following care practices:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Gentle Cleaning</h3>
              <p className="text-sm">
                Dry clean only for most embroidered pieces. For hand-washable items, use cold water 
                and mild detergent, avoiding direct scrubbing on embroidered areas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Storage</h3>
              <p className="text-sm">
                Store in a cool, dry place away from direct sunlight. Place tissue paper 
                between folds to prevent crushing delicate embroidery.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Maintenance</h3>
              <p className="text-sm">
                Avoid using harsh chemicals or bleach. For loose threads or mirrors, 
                have them professionally repaired rather than attempting DIY fixes.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-primary/10 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/embroidered.png")' }}></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-medium mb-6">Embrace Artisanal Luxury</h2>
          <p className="max-w-3xl mx-auto text-lg mb-8">
            Our embroidered collection represents the perfect fusion of heritage and innovation. 
            Each piece is more than clothing—it's wearable art that tells a story.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-white font-medium hover:bg-primary-dark transition-colors mr-4"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  return [];
} 
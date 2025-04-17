import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCollection } from '../../../lib/dummyData';
import ProductGrid from '../../../components/sections/ProductGrid';

export const metadata = {
  title: 'Limited Edition Collection | Imperial Aura',
  description: 'Discover our exclusive Limited Edition collection featuring rare designs, numbered pieces, and exceptional craftsmanship for the truly discerning customer.',
  keywords: 'limited edition clothing, exclusive luxury fashion, numbered luxury pieces, rare fashion designs, Imperial Aura limited edition, collectible fashion',
};

export default function LimitedEditionPage() {
  const products = getProductsByCollection('Limited Edition');

  return (
    <>
      {/* Collection Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="/images/limited edition.png"
          alt="Limited Edition Collection"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Limited Edition Collection
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Exclusive luxury pieces crafted in limited quantities, each uniquely numbered and 
            designed for those who demand the extraordinary.
          </p>
        </div>
      </section>
      
      {/* Collection Description */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/limited edition.png")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-6">The Art of Exclusivity</h2>
            <p className="text-lg">
              Our Limited Edition collection represents the pinnacle of Imperial Aura craftsmanship.
              Each piece is meticulously designed, produced in extremely limited quantities, and 
              individually numbered to ensure authenticity and exclusivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Exceptional Rarity</h3>
              <p className="mb-4">
                With production limited to no more than 50 pieces per design, our limited 
                edition items offer a level of exclusivity rarely found in today's fashion world.
                Each garment is individually numbered and comes with a certificate of authenticity.
              </p>
              <p>
                This deliberate scarcity ensures that owners of our Limited Edition pieces possess 
                something truly special - a garment that few others in the world will ever own.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Artisanal Excellence</h3>
              <p className="mb-4">
                Our Limited Edition pieces are handcrafted by master artisans using the finest materials
                available. Many feature techniques that are too time-intensive or specialized for regular 
                production, resulting in pieces of extraordinary beauty and craftsmanship.
              </p>
              <p>
                The creation of each garment involves countless hours of skilled handwork, often 
                using traditional methods that have been perfected over generations, combined with 
                innovative contemporary approaches.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Collection Features */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/limited edition.png")' }}></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl font-medium mb-12 text-center">Collection Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Individually Numbered</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Each piece bears a unique number and comes with a certificate of authenticity, marking its place in a strictly limited production run.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.055 2.264-.22 2.939Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Artisanal Techniques</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Featuring specialized craftsmanship techniques that are too labor-intensive for regular production, creating pieces of extraordinary beauty.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Collector's Value</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                These investment pieces are designed to appreciate in value over time, representing not just fashion but a tangible luxury asset.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-3 z-0" style={{ backgroundImage: 'url("/images/limited edition.png")' }}></div>
        <div className="container mx-auto relative z-10">
          <ProductGrid products={products} title="Limited Edition Collection" />
        </div>
      </section>
      
      {/* Ownership Experience */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/limited edition.png")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-3xl font-medium mb-6 text-center">The Ownership Experience</h2>
          <p className="text-center mb-12">
            When you acquire a Limited Edition piece from Imperial Aura, you're not simply purchasing clothing - you're investing in an exceptional experience:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Premium Packaging</h3>
              <p className="text-sm">
                Each Limited Edition piece arrives in handcrafted packaging, designed to preserve and 
                showcase your investment. The unboxing experience itself is a carefully choreographed 
                ritual, reflecting the exceptional nature of what lies within.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Lifetime Guarantee</h3>
              <p className="text-sm">
                We stand behind every Limited Edition piece with a lifetime guarantee. If any aspect 
                of the garment's construction or materials should fail to meet our exacting standards, 
                we will repair or replace it at no cost to you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Concierge Service</h3>
              <p className="text-sm">
                As an owner of an Imperial Aura Limited Edition piece, you have access to our exclusive 
                concierge service for cleaning, maintenance, and expert advice. Our specialists are available 
                to ensure your investment remains in perfect condition for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-primary/10 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/limited edition.png")' }}></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-medium mb-6">Secure Your Limited Edition Piece</h2>
          <p className="max-w-3xl mx-auto text-lg mb-8">
            Due to the exclusive nature of our Limited Edition collection, many pieces sell out quickly. 
            Contact us directly to inquire about availability or to arrange a private viewing of these 
            exceptional garments.
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
  // This generates the static paths for all limited edition product pages
  return [];
} 
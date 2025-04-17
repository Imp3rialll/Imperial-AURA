import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCollection } from '../../../lib/dummyData';
import ProductGrid from '../../../components/sections/ProductGrid';

export const metadata: Metadata = {
  title: 'Structured Collection | Imperial Aura - Luxury Clothing Brand',
  description: 'Imperial Aura\'s Structured Collection features sophisticated silhouettes with architectural precision. Discover clean lines, superior tailoring, and timeless elegance.',
  keywords: 'structured clothing, luxury tailoring, architectural fashion, precision tailoring, Imperial Aura structured, contemporary silhouettes',
};

export default function StructuredCollection() {
  const products = getProductsByCollection('Structured');

  return (
    <>
      {/* Collection Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="/images/structured.png"
          alt="Structured Collection"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Structured Collection
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Architectural precision meets timeless elegance, with clean lines and superior tailoring for the modern sophisticate.
          </p>
        </div>
      </section>
      
      {/* Collection Description */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/structured.png")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-6">The Art of Structure</h2>
            <p className="text-lg">
              Our Structured Collection embodies the perfect balance of form and function. Inspired by architectural principles, these garments feature clean lines, precise cuts, and thoughtful construction that creates a distinctive silhouette.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Design Philosophy</h3>
              <p className="mb-4">
                Each piece is meticulously tailored to enhance the wearer's form, with careful attention to proportion and balance. The result is clothing that exudes confidence, sophistication, and a timeless elegance that transcends seasonal trends.
              </p>
              <p>
                We draw inspiration from modern architecture, where every line serves a purpose and every detail contributes to the overall aesthetic and functional integrity of the garment.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Master Craftsmanship</h3>
              <p className="mb-4">
                Our structured garments are crafted with an unwavering commitment to precision. From initial pattern making to final stitching, every step in our production process is executed with meticulous attention to detail.
              </p>
              <p>
                The result is clothing that not only looks exceptional but maintains its form and fit through years of wear, becoming a lasting investment in your personal style.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Design Elements */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/structured.png")' }}></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl font-medium mb-12 text-center">Design Elements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Clean Lines</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Precision cutting and expert tailoring create sharply defined silhouettes with architectural elegance.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Form & Proportion</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Carefully balanced design elements create harmony and visual interest through thoughtful proportions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Negative Space</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Strategic use of space and absence creates bold statements in our minimalist, architectural designs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-3 z-0" style={{ backgroundImage: 'url("/images/structured.png")' }}></div>
        <div className="container mx-auto relative z-10">
          <ProductGrid products={products} title="Structured Collection" />
        </div>
      </section>
      
      {/* Material Excellence */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/structured.png")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-3xl font-medium mb-6 text-center">Material Excellence</h2>
          <p className="text-center mb-12">
            Our structured garments are crafted from fabrics selected for their inherent quality and ability to hold form:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Premium Wool</h3>
              <p className="text-sm">
                Italian and Japanese wools with natural structure that maintain shape while providing comfort and breathability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Structured Cotton</h3>
              <p className="text-sm">
                Specially woven cotton fabrics with natural body that maintain their form through multiple wearings and washes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Technical Blends</h3>
              <p className="text-sm">
                Innovative fabric blends incorporating natural and performance fibers for uncompromising structure with modern comfort.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-4 bg-cream dark:bg-gray-800 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/structured.png")' }}></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl font-medium mb-12 text-center">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
              <p className="italic text-gray-600 dark:text-gray-300 mb-6">
                "The tailoring of Imperial Aura's structured collection is impeccable. The attention to fit and form is truly outstanding."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Vikram Mehta</p>
                  <p className="text-sm text-gray-500">Corporate Executive</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
              <p className="italic text-gray-600 dark:text-gray-300 mb-6">
                "Their structured pieces have become the foundation of my professional wardrobe. Timeless, elegant, and perfectly constructed."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Anjali Kapoor</p>
                  <p className="text-sm text-gray-500">Architect</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
              <p className="italic text-gray-600 dark:text-gray-300 mb-6">
                "The clean lines and architectural influence in their designs make Imperial Aura's structured collection truly distinctive."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Rahul Sharma</p>
                  <p className="text-sm text-gray-500">Design Professional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-primary/10 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/structured.png")' }}></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-medium mb-6">Elevate Your Style</h2>
          <p className="max-w-3xl mx-auto text-lg mb-8">
            Experience the perfect balance of form and function with our structured collection. 
            Each piece is designed to enhance your presence with architectural precision and timeless elegance.
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
  // This generates the static paths for all structured product pages
  return [];
} 
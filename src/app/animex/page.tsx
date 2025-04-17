import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCollection } from '../../../lib/dummyData';
import ProductGrid from '../../../components/sections/ProductGrid';

export const metadata: Metadata = {
  title: 'Animex Collection | Imperial Aura - Nature-Inspired Luxury Fashion',
  description: 'Imperial Aura\'s Animex collection draws inspiration from the natural world, featuring sophisticated designs with subtle animal motifs and textures for a unique luxury fashion experience.',
  keywords: 'animal inspired fashion, luxury nature fashion, Animex collection, wild-inspired clothing, Imperial Aura animex, premium animal prints, ethical luxury fashion',
};

export default function AnimexCollection() {
  const products = getProductsByCollection('Animex');

  return (
    <>
      {/* Collection Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="/images/anime bg.jpg"
          alt="Animex Collection"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Animex Collection
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Where nature's beauty meets luxury fashion, combining wild elegance with refined craftsmanship for the discerning individual.
          </p>
        </div>
      </section>
      
      {/* Collection Description */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/anime bg.jpg")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-6">Nature's Elegance</h2>
            <p className="text-lg">
              Our Animex collection is a sophisticated exploration of the natural world. Drawing inspiration from the patterns, textures, and movements found in nature, these pieces combine wild elegance with refined luxury.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Creative Dialogue</h3>
              <p className="mb-4">
                The Animex collection represents our creative dialogue with the natural world. Each piece is designed to evoke the elegance and power of wildlife while maintaining a refined aesthetic suitable for both everyday wear and special occasions.
              </p>
              <p>
                Our designers draw inspiration from the grace, patterns, and movements found in nature, translating them into sophisticated designs that celebrate the beauty of the animal kingdom.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Artisanal Craftsmanship</h3>
              <p className="mb-4">
                Each garment features subtle animal-inspired motifs and organic elements, thoughtfully integrated into contemporary designs through meticulous craftsmanship and attention to detail.
              </p>
              <p>
                The result is a collection that celebrates the beauty of the natural world while maintaining our commitment to sophisticated style and exceptional quality.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Design Inspirations */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/anime bg.jpg")' }}></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl font-medium mb-12 text-center">Design Inspirations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg className="w-12 h-12 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Wilderness Landscapes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Patterns and color schemes inspired by diverse natural habitats, from dense forests to expansive savannas.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg className="w-12 h-12 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Organic Textures</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Fabrics and finishes that mimic the intricate textures found in animal hides, scales, and plumage.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg className="w-12 h-12 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Wild Elegance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Designs that capture the natural grace and power of the animal kingdom in refined, wearable forms.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-3 z-0" style={{ backgroundImage: 'url("/images/anime bg.jpg")' }}></div>
        <div className="container mx-auto relative z-10">
          <ProductGrid products={products} title="Animex Collection" />
        </div>
      </section>
      
      {/* Ethical Approach */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/anime bg.jpg")' }}></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-3xl font-medium mb-6 text-center">Our Ethical Approach</h2>
          <p className="text-center mb-12">
            The Animex collection celebrates the beauty of wildlife through design while maintaining our commitment to ethical and sustainable practices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Responsible Design</h3>
              <p className="text-sm">
                Our designs draw inspiration from wildlife without exploitation, using innovative techniques to create animal-inspired patterns rather than using actual animal products.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Conservation Support</h3>
              <p className="text-sm">
                A portion of proceeds from every Animex piece sold contributes to wildlife conservation efforts in India, supporting organizations working to protect the very creatures that inspire our designs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19 3 14.25h18l-3.115-9.06a2.25 2.25 0 0 0-2.137-1.44h-9.596a2.25 2.25 0 0 0-2.137 1.44Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 18.75h3v-2.25a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v2.25Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Sustainable Production</h3>
              <p className="text-sm">
                We utilize eco-friendly production methods and materials wherever possible, ensuring that our celebration of nature through design extends to our manufacturing practices.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-4 bg-cream dark:bg-gray-800 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/anime bg.jpg")' }}></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h2 className="text-3xl font-medium mb-12 text-center">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
              <p className="italic text-gray-600 dark:text-gray-300 mb-6">
                "The Animex collection perfectly balances wild inspiration with sophisticated design. I've never seen animal motifs incorporated so elegantly into luxury clothing."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Kavita Desai</p>
                  <p className="text-sm text-gray-500">Wildlife Photographer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
              <p className="italic text-gray-600 dark:text-gray-300 mb-6">
                "Imperial Aura's Animex pieces are conversation starters. The subtle yet distinctive patterns draw compliments wherever I go."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Aryan Malhotra</p>
                  <p className="text-sm text-gray-500">Art Curator</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
              <p className="italic text-gray-600 dark:text-gray-300 mb-6">
                "What I love about the Animex collection is how it celebrates nature without being obvious. The designs are sophisticated and the quality is exceptional."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Leela Khanna</p>
                  <p className="text-sm text-gray-500">Environmental Activist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-primary/10 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/images/anime bg.jpg")' }}></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-medium mb-6">Experience Animex</h2>
          <p className="max-w-3xl mx-auto text-lg mb-8">
            Visit our flagship store in Talegaon dabhade, Pune to see and feel the unique textures and designs of our Animex collection in person.
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
  // This generates the static paths for all animex product pages
  return [];
} 
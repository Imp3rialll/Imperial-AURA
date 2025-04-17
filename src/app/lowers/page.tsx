import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCollection } from '../../../lib/dummyData';
import ProductGrid from '../../../components/sections/ProductGrid';

export const metadata = {
  title: 'Lowers Collection | Imperial Aura',
  description: 'Discover our premium Lowers collection featuring exquisite trousers, pants, and shorts crafted with superior materials and expert tailoring.',
  keywords: 'luxury bottoms, premium trousers, designer pants, comfortable lowers, Imperial Aura lowers, high-end bottom wear',
};

export default function LowersPage() {
  const products = getProductsByCollection('Lowers');

  return (
    <>
      {/* Collection Hero */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="/images/lowers-section-placeholder.jpg"
          alt="Lowers Collection"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Lowers Collection
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Premium bottoms crafted with exceptional materials and expert tailoring, 
            designed for the perfect balance of comfort and sophistication.
          </p>
        </div>
      </section>
      
      {/* Collection Description */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-6">Exceptional Comfort, Refined Style</h2>
            <p className="text-lg">
              Our Lowers collection represents the perfect marriage of comfort and sophistication. 
              Each piece is meticulously designed to provide an exceptional fit while maintaining 
              the highest standards of style and luxury.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">Expert Tailoring</h3>
              <p className="mb-4">
                Our bottoms are crafted by skilled tailors who understand the importance 
                of precise measurements and cuts. Each piece is designed to flatter 
                different body types while ensuring maximum comfort throughout the day.
              </p>
              <p>
                The attention to detail in our tailoring process ensures that every pair 
                of trousers, pants, or shorts maintains its shape and fit even after 
                extended wear and multiple washes.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Premium Materials</h3>
              <p className="mb-4">
                We source only the finest fabrics for our Lowers collection - from breathable 
                linens and cottons to luxurious wools and silks. The quality of materials ensures 
                both comfort and durability in every piece.
              </p>
              <p>
                Our commitment to using superior fabrics means that each item in our collection 
                not only looks elegant but feels exceptionally comfortable against the skin, 
                making our bottoms suitable for all-day wear.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Style Categories */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-medium mb-12 text-center">Style Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Formal</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Sophisticated trousers designed for professional settings and formal occasions with impeccable structure and refined details.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Casual</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Relaxed yet refined bottoms for everyday comfort without compromising on style, perfect for weekend outings and leisure activities.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Statement</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Bold designs and unique patterns for those who want to make a distinctive impression at special events or social gatherings.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <ProductGrid products={products} title="Lowers Collection" />
        </div>
      </section>
      
      {/* Care Guide */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-medium mb-6 text-center">Care Guide</h2>
          <p className="text-center mb-12">
            To maintain the quality and appearance of your bottoms, we recommend following these care practices:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 1-.659 1.591L9.5 14.5M9.75 3.104a24.301 24.301 0 0 0-4.5 0M5 14.5v7.5" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Washing</h3>
              <p className="text-sm">
                Always follow the specific care label instructions. Generally, machine wash in cold 
                water with similar colors, using a gentle cycle and mild detergent. Turn inside out 
                before washing to preserve color and prevent abrasion.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Pressing</h3>
              <p className="text-sm">
                Iron on low to medium heat while still slightly damp. For formal trousers, 
                create a sharp crease down the center of each leg. Wool blends may require 
                a press cloth to prevent shine.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Storage</h3>
              <p className="text-sm">
                Hang formal trousers by the cuffs using clips to prevent creasing. For casual 
                bottoms, fold along seams and store flat. Ensure all items are completely dry 
                before storing to prevent mildew.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-4 bg-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-medium mb-6">Complete Your Wardrobe</h2>
          <p className="max-w-3xl mx-auto text-lg mb-8">
            Our Lowers collection pairs perfectly with our Engine Heads and Embroidered pieces, 
            allowing you to create a complete, coordinated wardrobe of exceptional quality.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-white font-medium hover:bg-primary-dark transition-colors mr-4"
          >
            Contact Us
          </Link>
          <Link
            href="/"
            className="inline-block px-8 py-3 border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
          >
            Explore More Collections
          </Link>
        </div>
      </section>
    </>
  );
} 
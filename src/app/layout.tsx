'use client';

import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { CartProvider, useCart } from "@/lib/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { ShopifyAuthProvider } from "../../lib/ShopifyContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

// Metadata is exported from metadata.ts

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCartOpen } = useCart();
  
  return (
    <>
      <Header />
      <main className={`transition-all duration-500 ease-in-out prevent-overflow ${isCartOpen ? 'blur-[6px] scale-[0.99]' : ''}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Ahsing-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize cart in localStorage if it doesn't exist
              if (!localStorage.getItem('cart')) {
                console.log('Initializing cart in localStorage from layout');
                localStorage.setItem('cart', '[]');
              }
              
              // Fix cart if it's not a valid array
              try {
                const storedCart = localStorage.getItem('cart');
                if (storedCart) {
                  const parsed = JSON.parse(storedCart);
                  if (!Array.isArray(parsed)) {
                    console.warn('Cart in localStorage is not an array, resetting');
                    localStorage.setItem('cart', '[]');
                  }
                }
              } catch (e) {
                console.error('Error parsing cart from localStorage, resetting', e);
                localStorage.setItem('cart', '[]');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased`}
      >
        <AuthProvider>
          <ShopifyAuthProvider>
            <CartProvider>
              <RootLayoutContent>
                {children}
              </RootLayoutContent>
            </CartProvider>
          </ShopifyAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

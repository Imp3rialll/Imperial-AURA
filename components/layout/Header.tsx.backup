"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { motion } from 'framer-motion';
import { IconShoppingCart, IconChevronDown, IconMenu2, IconX } from '@tabler/icons-react';
import { 
  Navbar, 
  NavBody, 
  MobileNav, 
  NavLink,
  NavButton
} from '../../src/components/ui/resizable-navbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  ShoppingCart,
  Menu,
  X,
  LogIn,
  Package,
  Heart,
  Search,
  User
} from 'lucide-react';
import { Drawer } from 'vaul';
import Cart from './Cart';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Clean up any border styling that might be added dynamically
    const cleanup = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        headerElement.style.border = 'none';
        headerElement.style.borderBottom = 'none';
        headerElement.style.boxShadow = 'none';
        headerElement.style.outline = 'none';
      }
    };
    
    // Run once on mount
    cleanup();
    
    // Setup interval to keep checking (handles cases where styles are added later)
    const interval = setInterval(cleanup, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Categories for shop dropdown
  const categories = [
    { name: "Embroidered", link: "/embroidered" },
    { name: "Structured", link: "/structured" },
    { name: "Engine Heads", link: "/engine-heads" },
    { name: "Limited Edition", link: "/limited-edition" },
    { name: "Animex", link: "/animex" },
  ];

  return (
    <>
      <Navbar brandName="Imperial Aura" className="top-0">
        <NavBody className="flex items-center justify-between">
          {/* Left navigation items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-black px-1 py-2 hover:text-purple-700 transition-colors"
            >
              Home
            </Link>
            
            {/* Shop Dropdown */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-sm font-medium text-black px-1 py-2 hover:text-purple-700 transition-colors">
                    Shop
                    <IconChevronDown size={14} className="ml-1" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="center" 
                  className="z-50 min-w-[180px] bg-white rounded-none border border-gray-100 p-1"
                >
                  {categories.map((category, idx) => (
                    <DropdownMenuItem key={`category-${idx}`} asChild>
                      <Link
                        href={category.link}
                        className="flex w-full cursor-pointer items-center px-4 py-2 text-sm text-black hover:text-purple-700 hover:bg-gray-50 transition-colors"
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Right side navigation with cart and contact */}
          <div className="hidden md:flex items-center space-6">
            {/* Contact Link */}
            <Link
              href="/contact"
              className="text-sm font-medium text-black px-1 py-2 hover:text-purple-700 transition-colors"
            >
              Contact
            </Link>
            
            {/* Account Link (will connect to Shopify) */}
            <Link
              href="/account"
              className="flex items-center text-sm font-medium text-black px-1 py-2 hover:text-purple-700 transition-colors"
            >
              <User className="w-4 h-4 mr-1" />
              Account
            </Link>
            
            {/* Cart button */}
            <div className="relative">
              <motion.button 
                className="relative flex items-center justify-center w-10 h-10 text-black hover:text-primary p-2 rounded-full"
                onClick={toggleCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconShoppingCart size={22} />
                {mounted && totalItems > 0 && (
                  <motion.span 
                    className="absolute -top-2 -right-2 bg-purple-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
          
          {/* Mobile navigation controls - visible on mobile */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Account Link (Mobile) */}
            <Link
              href="/account"
              className="flex items-center text-sm font-medium text-black p-1 hover:text-purple-700 transition-colors"
            >
              <User className="w-4 h-4" />
            </Link>
          
            {/* Mobile cart button */}
            <motion.button 
              className="relative flex items-center justify-center w-10 h-10 text-black p-2 rounded-full"
              onClick={toggleCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconShoppingCart size={22} />
              {mounted && totalItems > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-purple-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>
          </div>
        </NavBody>

        <MobileNav className="md:hidden">
          {/* Mobile Menu */}
          <div className="flex flex-col w-full gap-4 p-4 bg-white">
            {/* Show Home link */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/"
                className="block py-2 text-base font-medium text-black hover:text-purple-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </motion.div>
            
            {/* Shop category - show as a header with sub-items */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="py-2 text-base font-medium text-black">
                  Shop
                </h3>
              </motion.div>
              
              <div className="ml-4">
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + 0.1 * index }}
                  >
                    <Link
                      href={category.link}
                      className="block py-2 text-sm text-black hover:text-purple-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Contact link */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + 0.1 * categories.length }}
            >
              <Link
                href="/contact"
                className="block py-2 text-base font-medium text-black hover:text-purple-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </motion.div>
          </div>
        </MobileNav>
      </Navbar>
      
      {/* Use our fixed Cart component */}
      <Cart />
      
      {/* Search drawer */}
      {/* Search implementation would go here */}
    </>
  );
};

export default Header; 
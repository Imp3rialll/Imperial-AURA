import { Metadata } from 'next';
import ProductGrid from '../../../../components/sections/ProductGrid';
import { getNewProducts } from '../../../../lib/dummyData';

export const metadata: Metadata = {
  title: 'New Arrivals | Imperial Aura',
  description: 'Discover the latest additions to our luxury collections - be the first to explore our newest designs and seasonal inspirations.',
};

export default function NewArrivalsPage() {
  const newProducts = getNewProducts();
  
  return (
    <>
      {/* Hero section */}
      <section className="py-16 bg-gradient-to-b from-purple-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-medium mb-6">New Arrivals</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-200 mb-8">
            Discover our latest pieces, featuring cutting-edge designs and seasonal inspirations.
            Be the first to experience our newest expressions of luxury craftsmanship.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <span className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              Just Landed
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm">
              Limited Edition
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm">
              Exclusive Designs
            </span>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          {/* Filter options placeholder */}
          <div className="flex flex-wrap gap-4 mb-12 justify-between items-center">
            <h2 className="text-2xl font-medium">Latest Arrivals</h2>
            
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <select className="appearance-none bg-gray-50 border border-gray-200 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                  <option value="">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <select className="appearance-none bg-gray-50 border border-gray-200 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                  <option value="">Filter by: All</option>
                  <option value="structured">Structured</option>
                  <option value="embroidered">Embroidered</option>
                  <option value="engine-heads">Engine Heads</option>
                  <option value="limited-edition">Limited Edition</option>
                  <option value="animex">Animex</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <ProductGrid products={newProducts} />
          
          {/* Pagination placeholder */}
          <div className="mt-16 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a href="#" className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-l-md hover:bg-gray-50">
                Previous
              </a>
              <a href="#" className="px-4 py-2 bg-primary border border-primary text-white text-sm font-medium">
                1
              </a>
              <a href="#" className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50">
                2
              </a>
              <a href="#" className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50">
                3
              </a>
              <a href="#" className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-r-md hover:bg-gray-50">
                Next
              </a>
            </nav>
          </div>
        </div>
      </section>
      
      {/* Newsletter signup */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-medium mb-4">Be the First to Know</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to receive notifications when new products arrive. Stay ahead of the curve with 
            Imperial Aura's latest releases and exclusive offers.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
} 
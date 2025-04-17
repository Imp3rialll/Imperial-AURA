import ProductList from '@/components/products/product-list';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Collection</h1>
      <ProductList />
    </div>
  );
} 
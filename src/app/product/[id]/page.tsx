import { Metadata } from 'next';
import { getProductById, getRelatedProducts, products, ProductData } from '../../../../lib/dummyData';
import { notFound } from 'next/navigation';
import ProductDetails from '../../../../components/product/ProductDetails';

type ProductProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {
  const id = params.id;
  const product = getProductById(id);
  
  if (!product) {
    console.log(`Product not found in metadata generation for ID: ${id}`);
    console.log(`Available product IDs: ${products.map(p => p.id).join(', ')}`);
    
    return {
      title: 'Product Not Found | Imperial Aura',
      description: 'The requested product could not be found.'
    };
  }
  
  return {
    title: `${product.name} | Imperial Aura`,
    description: product.description,
    keywords: [product.collection, product.category, 'luxury clothing', 'Imperial Aura']
  };
}

export default async function Product({ params }: ProductProps) {     
  const id = params.id;
  console.log(`Rendering product page for ID: ${id}`);
  
  const product = getProductById(id);
  
  if (!product) {
    console.log(`Product not found in page component for ID: ${id}`);
    console.log(`Available product IDs: ${products.map(p => p.id).join(', ')}`);
    notFound();
  }
  
  // Get related products from the same collection
  const relatedProducts = getRelatedProducts(product.id, product.collection, 4);
  
  return (
    <ProductDetails 
      product={product} 
      relatedProducts={relatedProducts}
    />
  );
} 
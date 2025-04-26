import { GraphQLClient } from 'graphql-request';

// Initialize Shopify Storefront client
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Define types for Shopify API responses
interface ShopifyImage {
  node: {
    originalSrc: string;
  }
}

interface ShopifyVariant {
  node: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    availableForSale: boolean;
  }
}

interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    handle: string;
    description: string;
    images: {
      edges: ShopifyImage[];
    };
    variants: {
      edges: ShopifyVariant[];
    };
  }
}

interface ShopifyCollection {
  collectionByHandle: {
    title: string;
    products: {
      edges: ShopifyProduct[];
    };
  };
}

export interface ShopifyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  defaultAddress?: ShopifyAddress;
  addresses: {
    edges: { node: ShopifyAddress }[];
  };
  orders: {
    edges: { node: ShopifyOrder }[];
  };
}

export interface ShopifyAddress {
  id: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone?: string;
}

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: {
      node: {
        title: string;
        quantity: number;
        variant: {
          price: {
            amount: string;
            currencyCode: string;
          };
          image: {
            originalSrc: string;
          };
        };
      };
    }[];
  };
}

// Validate environment variables
if (typeof window === 'undefined' && (!domain || !accessToken)) {
  console.warn('Missing Shopify API configuration.');
}

// Create GraphQL client for Shopify Storefront API
export const shopifyClient = new GraphQLClient(
  `https://${domain}/api/2023-10/graphql.json`,
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': accessToken as string,
      'Content-Type': 'application/json',
    },
    // Remove fetch and mode options as they can cause issues in Vercel
  }
);

// Customer authentication 
export async function customerLogin(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      password,
    },
  };

  try {
    const data = await shopifyClient.request(query, variables);
    const { customerAccessTokenCreate } = data as any;
    
    if (customerAccessTokenCreate.customerUserErrors.length > 0) {
      throw new Error(customerAccessTokenCreate.customerUserErrors[0].message);
    }
    
    return customerAccessTokenCreate.customerAccessToken;
  } catch (error) {
    console.error('Error logging in Shopify customer:', error);
    throw error;
  }
}

export async function customerSignup(
  firstName: string, 
  lastName: string, 
  email: string, 
  password: string,
  phone?: string
) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          firstName
          lastName
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      firstName,
      lastName,
      email,
      password,
      phone,
      acceptsMarketing: true,
    },
  };

  try {
    const data = await shopifyClient.request(query, variables);
    const { customerCreate } = data as any;
    
    if (customerCreate.customerUserErrors.length > 0) {
      throw new Error(customerCreate.customerUserErrors[0].message);
    }
    
    return customerCreate.customer;
  } catch (error) {
    console.error('Error creating Shopify customer:', error);
    throw error;
  }
}

export async function getCustomerProfile(customerAccessToken: string) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        defaultAddress {
          id
          address1
          address2
          city
          province
          zip
          country
          phone
        }
        addresses(first: 10) {
          edges {
            node {
              id
              address1
              address2
              city
              province
              zip
              country
              phone
            }
          }
        }
        orders(first: 5) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 5) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        originalSrc
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    customerAccessToken,
  };

  try {
    const data = await shopifyClient.request(query, variables);
    return (data as any).customer;
  } catch (error) {
    console.error('Error getting Shopify customer profile:', error);
    throw error;
  }
}

export async function customerRecoverPassword(email: string) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    email,
  };

  try {
    const data = await shopifyClient.request(query, variables);
    const { customerRecover } = data as any;
    
    if (customerRecover.customerUserErrors.length > 0) {
      throw new Error(customerRecover.customerUserErrors[0].message);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sending password recovery email:', error);
    throw error;
  }
}

export async function customerResetPassword(resetToken: string, password: string) {
  const query = `
    mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
      customerResetByUrl(resetUrl: $resetUrl, password: $password) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    resetUrl: resetToken,
    password,
  };

  try {
    const data = await shopifyClient.request(query, variables);
    const { customerResetByUrl } = data as any;
    
    if (customerResetByUrl.customerUserErrors.length > 0) {
      throw new Error(customerResetByUrl.customerUserErrors[0].message);
    }
    
    return customerResetByUrl.customerAccessToken;
  } catch (error) {
    console.error('Error resetting customer password:', error);
    throw error;
  }
}

// Fetch collection by handle
export async function getCollectionByHandle(handle: string) {
  // Skip API calls during build if environment variables aren't available
  if (!domain || !accessToken) {
    console.warn('Shopify API not configured. Using fallback data.');
    return null;
  }

  const query = `
    query getCollectionByHandle($handle: String!) {
      collectionByHandle(handle: $handle) {
        title
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = { handle };
  
  try {
    const data = await shopifyClient.request<ShopifyCollection>(query, variables);
    return data.collectionByHandle;
  } catch (error) {
    console.error('Error fetching Shopify collection:', error);
    return null;
  }
}

// Transform Shopify products to match your app's ProductData format
export function transformProducts(collection: any) {
  if (!collection || !collection.products || !collection.products.edges) {
    return [];
  }
  
  return collection.products.edges.map(({ node }: any) => {
    // Extract variants info
    const variants = node.variants?.edges || [];
    const firstVariant = variants[0]?.node || {};
    
    // Extract price info safely
    const price = firstVariant.price?.amount 
      ? parseFloat(firstVariant.price.amount) 
      : 0;
      
    // Get image safely
    const image = node.images?.edges?.[0]?.node?.originalSrc || '';
    
    // Try to extract sizes and colors from variant titles
    const variantTitles = variants.map((v: any) => v.node.title || '');
    const sizes = [...new Set(variantTitles
      .map((t: string) => t.includes(' / ') ? t.split(' / ')[0] : null)
      .filter(Boolean))];
      
    const colors = [...new Set(variantTitles
      .map((t: string) => {
        const parts = t.split(' / ');
        return parts.length > 1 ? parts[1] : null;
      })
      .filter(Boolean))];

    return {
      id: node.id.replace('gid://shopify/Product/', ''),
      name: node.title || 'Product Name',
      description: node.description || 'No description available',
      price: price || 0,
      image: image || '/images/placeholder.png',
      category: 'Apparel', // Default category
      collection: collection.title || 'Collection',
      sizes: sizes.length ? sizes : ['S', 'M', 'L', 'XL'],
      colors: colors.length ? colors : ['Default'],
      featured: false,
      new: false,
      bestseller: false,
    };
  });
} 
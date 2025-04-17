/**
 * Custom cache handler for Incremental Static Regeneration (ISR)
 * This handler manages how Next.js caches and revalidates static pages
 */

const defaultCacheTtl = 60 * 60; // 1 hour default ttl

class CacheHandler {
  constructor(options) {
    this.options = options || {};
    this.cache = new Map();
    // Set reasonable defaults if not provided
    this.ttl = this.options.ttl || defaultCacheTtl;
    
    // Log cache initialization
    console.log(`Initialized custom ISR cache handler with TTL: ${this.ttl}s`);
  }

  async get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    // Check if the item has expired
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  async set(key, value, options = {}) {
    const ttl = options.ttl || this.ttl;
    const expiresAt = Date.now() + ttl * 1000;
    
    this.cache.set(key, {
      value,
      expiresAt
    });
    
    return true;
  }

  async revalidateTag(tag) {
    // For tagged cache invalidation
    // We iterate over all cache items and invalidate items with matching tags
    const keysToInvalidate = [];
    
    for (const [key, item] of this.cache.entries()) {
      if (item.value && item.value.tags && item.value.tags.includes(tag)) {
        keysToInvalidate.push(key);
      }
    }
    
    // Delete invalidated keys
    for (const key of keysToInvalidate) {
      this.cache.delete(key);
    }
    
    return keysToInvalidate.length;
  }
}

module.exports = CacheHandler; 
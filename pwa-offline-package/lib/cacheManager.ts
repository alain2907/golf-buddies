/**
 * Gestionnaire de cache pour PWA
 */

export class CacheManager {
  private cacheName: string;

  constructor(cacheName: string = 'app-cache-v1') {
    this.cacheName = cacheName;
  }

  /**
   * Mise en cache de ressources
   */
  async cacheResources(urls: string[]): Promise<void> {
    if (!('caches' in window)) {
      console.warn('Cache API not supported');
      return;
    }

    try {
      const cache = await caches.open(this.cacheName);
      await cache.addAll(urls);
      console.log('Resources cached successfully');
    } catch (error) {
      console.error('Error caching resources:', error);
    }
  }

  /**
   * Récupération depuis le cache
   */
  async getCached(url: string): Promise<Response | undefined> {
    if (!('caches' in window)) {
      return undefined;
    }

    try {
      const cache = await caches.open(this.cacheName);
      return await cache.match(url);
    } catch (error) {
      console.error('Error getting cached resource:', error);
      return undefined;
    }
  }

  /**
   * Mise à jour du cache
   */
  async updateCache(url: string, response: Response): Promise<void> {
    if (!('caches' in window)) {
      return;
    }

    try {
      const cache = await caches.open(this.cacheName);
      await cache.put(url, response.clone());
    } catch (error) {
      console.error('Error updating cache:', error);
    }
  }

  /**
   * Suppression du cache
   */
  async clearCache(): Promise<void> {
    if (!('caches' in window)) {
      return;
    }

    try {
      await caches.delete(this.cacheName);
      console.log('Cache cleared');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  /**
   * Stratégie Network First (réseau puis cache)
   */
  async networkFirst(url: string): Promise<Response> {
    try {
      const response = await fetch(url);
      await this.updateCache(url, response);
      return response;
    } catch (error) {
      const cached = await this.getCached(url);
      if (cached) {
        return cached;
      }
      throw error;
    }
  }

  /**
   * Stratégie Cache First (cache puis réseau)
   */
  async cacheFirst(url: string): Promise<Response> {
    const cached = await this.getCached(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    await this.updateCache(url, response);
    return response;
  }
}

// Export singleton
export const cacheManager = new CacheManager();

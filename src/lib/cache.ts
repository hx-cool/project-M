import { createClient } from 'redis';

// Redis Cache Configuration
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 500),
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

// Connect to Redis
if (process.env.NODE_ENV !== 'test') {
  redisClient.connect().catch(console.error);
}

export class CacheService {
  private client = redisClient;
  private defaultTTL = 3600; // 1 hour

  // Get cached data
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  // Set cache data
  async set(key: string, value: any, ttl: number = this.defaultTTL): Promise<void> {
    try {
      await this.client.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  // Delete cache
  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  // Clear pattern
  async clearPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      console.error('Cache clear pattern error:', error);
    }
  }

  // Cache movie page
  async cacheMoviePage(slug: string, data: any, ttl: number = 7200): Promise<void> {
    await this.set(`movie:${slug}`, data, ttl);
  }

  // Get cached movie page
  async getCachedMoviePage(slug: string): Promise<any> {
    return await this.get(`movie:${slug}`);
  }

  // Cache movie list
  async cacheMovieList(key: string, data: any, ttl: number = 1800): Promise<void> {
    await this.set(`movies:${key}`, data, ttl);
  }

  // Get cached movie list
  async getCachedMovieList(key: string): Promise<any> {
    return await this.get(`movies:${key}`);
  }

  // Cache search results
  async cacheSearchResults(query: string, data: any, ttl: number = 3600): Promise<void> {
    await this.set(`search:${query}`, data, ttl);
  }

  // Get cached search results
  async getCachedSearchResults(query: string): Promise<any> {
    return await this.get(`search:${query}`);
  }

  // Increment view count (for trending)
  async incrementViews(movieId: string): Promise<number> {
    try {
      return await this.client.incr(`views:${movieId}`);
    } catch (error) {
      console.error('Cache increment error:', error);
      return 0;
    }
  }

  // Get trending movies from cache
  async getTrendingMovies(): Promise<string[]> {
    try {
      const keys = await this.client.keys('views:*');
      const scores = await Promise.all(
        keys.map(async (key) => ({
          movieId: key.replace('views:', ''),
          views: parseInt(await this.client.get(key) || '0'),
        }))
      );
      return scores
        .sort((a, b) => b.views - a.views)
        .slice(0, 20)
        .map((s) => s.movieId);
    } catch (error) {
      console.error('Get trending error:', error);
      return [];
    }
  }

  // Clear all cache
  async flushAll(): Promise<void> {
    try {
      await this.client.flushAll();
    } catch (error) {
      console.error('Cache flush error:', error);
    }
  }
}

export const cacheService = new CacheService();
export default cacheService;

// CDN Configuration and Helper Functions

export const CDN_CONFIG = {
  baseUrl: process.env.CDN_URL || 'https://cdn.movieswala.com',
  buckets: {
    posters: '/posters',
    banners: '/banners',
    thumbnails: '/thumbs',
    screenshots: '/screenshots',
  },
  providers: {
    cloudflare: process.env.CLOUDFLARE_CDN,
    cloudinary: process.env.CLOUDINARY_URL,
    aws: process.env.AWS_CLOUDFRONT_URL,
  },
};

export class CDNService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = CDN_CONFIG.baseUrl;
  }

  // Generate CDN URL for poster
  getPosterUrl(slug: string, size: 'small' | 'medium' | 'large' = 'medium'): string {
    const sizes = {
      small: 'w300',
      medium: 'w500',
      large: 'w780',
    };
    return `${this.baseUrl}${CDN_CONFIG.buckets.posters}/${sizes[size]}/${slug}.jpg`;
  }

  // Generate CDN URL for banner
  getBannerUrl(slug: string): string {
    return `${this.baseUrl}${CDN_CONFIG.buckets.banners}/${slug}.jpg`;
  }

  // Generate CDN URL for thumbnail
  getThumbnailUrl(slug: string): string {
    return `${this.baseUrl}${CDN_CONFIG.buckets.thumbnails}/${slug}.jpg`;
  }

  // Generate CDN URL for screenshot
  getScreenshotUrl(slug: string, index: number): string {
    return `${this.baseUrl}${CDN_CONFIG.buckets.screenshots}/${slug}-${index}.jpg`;
  }

  // Generate optimized image URL with transformations
  getOptimizedImageUrl(
    path: string,
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'jpg' | 'webp' | 'avif';
    } = {}
  ): string {
    const { width, height, quality = 80, format = 'webp' } = options;
    const params = new URLSearchParams();

    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', quality.toString());
    params.append('f', format);

    return `${this.baseUrl}${path}?${params.toString()}`;
  }

  // Upload to CDN (placeholder - implement with your CDN provider)
  async uploadImage(
    file: File | Buffer,
    path: string,
    options?: { contentType?: string }
  ): Promise<string> {
    // Implement actual upload logic based on your CDN provider
    // Example: AWS S3, Cloudflare R2, Cloudinary, etc.
    console.log('Upload to CDN:', path);
    return `${this.baseUrl}${path}`;
  }

  // Delete from CDN
  async deleteImage(path: string): Promise<boolean> {
    // Implement actual delete logic
    console.log('Delete from CDN:', path);
    return true;
  }

  // Purge CDN cache for specific URL
  async purgeCacheUrl(url: string): Promise<boolean> {
    // Implement cache purge based on CDN provider
    console.log('Purge CDN cache:', url);
    return true;
  }

  // Purge all CDN cache
  async purgeCacheAll(): Promise<boolean> {
    console.log('Purge all CDN cache');
    return true;
  }
}

export const cdnService = new CDNService();
export default cdnService;

// Helper function to get external file host icon
export function getFileHostIcon(host: string): string {
  const icons: Record<string, string> = {
    'mega.nz': '🔷',
    'drive.google.com': '📁',
    'mediafire.com': '🔥',
    'dropbox.com': '📦',
    'onedrive.live.com': '☁️',
  };
  return icons[host] || '🔗';
}

// Helper function to get file host name
export function getFileHostName(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    if (hostname.includes('mega')) return 'Mega';
    if (hostname.includes('google')) return 'Google Drive';
    if (hostname.includes('mediafire')) return 'MediaFire';
    if (hostname.includes('dropbox')) return 'Dropbox';
    if (hostname.includes('onedrive')) return 'OneDrive';
    return 'Direct Link';
  } catch {
    return 'Unknown';
  }
}

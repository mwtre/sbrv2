/**
 * Get the correct image path with basePath for GitHub Pages
 * For static exports with basePath, we need to manually prepend the basePath
 * Next.js Image component should handle this, but for static exports we need to be explicit
 */
export function getImagePath(path: string): string {
  // If path is already absolute (starts with http/https), return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Ensure path starts with /
  let normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // For GitHub Pages with basePath, detect it from window location or use environment
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;
    
    // Check if we're on GitHub Pages (github.io domain or pathname contains /sbrv2)
    const isGitHubPages = hostname.includes('github.io') || pathname.startsWith('/sbrv2');
    
    if (isGitHubPages) {
      // Extract basePath from pathname or use default
      const segments = pathname.split('/').filter(Boolean);
      const basePath = segments.length > 0 && segments[0] === 'sbrv2' ? '/sbrv2' : '';
      
      // Only add basePath if it's not already in the path
      if (basePath && !normalizedPath.startsWith(basePath)) {
        normalizedPath = `${basePath}${normalizedPath}`;
      }
    }
  } else {
    // SSR: Use environment variable if available
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || '';
    if (basePath && !normalizedPath.startsWith(basePath)) {
      normalizedPath = `${basePath}${normalizedPath}`;
    }
  }
  
  return normalizedPath;
}


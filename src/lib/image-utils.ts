/**
 * Get the correct image path with basePath for GitHub Pages
 * Next.js Image component should handle basePath automatically, but for static exports
 * we need to ensure paths work correctly
 */
export function getImagePath(path: string): string {
  // If path is already absolute (starts with http/https), return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // For static export on GitHub Pages, Next.js should handle basePath automatically
  // But we ensure the path is correct
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // In production with basePath, Next.js Image component will automatically prepend basePath
  // So we just return the normalized path
  return normalizedPath;
}


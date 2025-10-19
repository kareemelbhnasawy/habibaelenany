export interface ResponsiveImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export function generateSrcSet(src: string, widths: number[]): string {
  // For now, return the original image
  // In production, you'd generate different sizes
  return widths.map(w => `${src} ${w}w`).join(', ');
}

export function generateSizes(breakpoints: Record<string, string>): string {
  return Object.entries(breakpoints)
    .map(([bp, size]) => `(min-width: ${bp}) ${size}`)
    .join(', ');
}

export function getAspectRatio(width: number, height: number): number {
  return height / width;
}

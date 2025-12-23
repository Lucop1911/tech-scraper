import type { Technology } from '../../shared/types';
import { TECH_CATEGORIES } from '../../shared/constants';

export const detectLibraries = (): Technology[] => {
  const libraries: Technology[] = [];

  // Detect jQuery
  if ((window as any).jQuery) {
    libraries.push({
      name: 'jQuery',
      category: TECH_CATEGORIES.LIBRARY,
      version: (window as any).jQuery.fn.jquery,
      confidence: 'high',
    });
  }

  // Detect Lodash
  if ((window as any)._ && (window as any)._.VERSION) {
    libraries.push({
      name: 'Lodash',
      category: TECH_CATEGORIES.LIBRARY,
      version: (window as any)._.VERSION,
      confidence: 'high',
    });
  }

  // Detect Three.js
  if ((window as any).THREE) {
    libraries.push({
      name: 'Three.js',
      category: TECH_CATEGORIES.LIBRARY,
      confidence: 'high',
    });
  }

  return libraries;
};
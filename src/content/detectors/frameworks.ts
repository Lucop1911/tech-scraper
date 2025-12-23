import type { Technology } from '../../shared/types';
import { TECH_CATEGORIES } from '../../shared/constants';

export const detectFrameworks = (): Technology[] => {
  const frameworks: Technology[] = [];

  // Detect React
  if (
    document.querySelector('[data-reactroot], [data-reactid]') ||
    (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__
  ) {
    frameworks.push({
      name: 'React',
      category: TECH_CATEGORIES.FRAMEWORK,
      confidence: 'high',
    });
  }

  // Detect Vue
  if ((window as any).__VUE__) {
    frameworks.push({
      name: 'Vue.js',
      category: TECH_CATEGORIES.FRAMEWORK,
      confidence: 'high',
    });
  }

  // Detect Angular
  const ngVersion = document.querySelector('[ng-version]');
  if (ngVersion) {
    frameworks.push({
      name: 'Angular',
      category: TECH_CATEGORIES.FRAMEWORK,
      version: ngVersion.getAttribute('ng-version') || undefined,
      confidence: 'high',
    });
  }

  // Detect Next.js
  if (document.getElementById('__next')) {
    frameworks.push({
      name: 'Next.js',
      category: TECH_CATEGORIES.FRAMEWORK,
      confidence: 'high',
    });
  }

  // Detect Nuxt
  if (document.getElementById('__nuxt')) {
    frameworks.push({
      name: 'Nuxt.js',
      category: TECH_CATEGORIES.FRAMEWORK,
      confidence: 'high',
    });
  }

  return frameworks;
};
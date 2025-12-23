import type { Technology } from '../../shared/types';
import { TECH_CATEGORIES } from '../../shared/constants';

export const detectCMS = (): Technology[] => {
  const cms: Technology[] = [];

  // Check meta generator tag
  const generator = document.querySelector('meta[name="generator"]');
  if (generator) {
    const content = generator.getAttribute('content');
    if (content) {
      cms.push({
        name: content,
        category: TECH_CATEGORIES.CMS,
        confidence: 'high',
      });
    }
  }

  // Detect WordPress
  if (
    document.querySelector('link[href*="wp-content"]') ||
    document.querySelector('script[src*="wp-includes"]')
  ) {
    cms.push({
      name: 'WordPress',
      category: TECH_CATEGORIES.CMS,
      confidence: 'high',
    });
  }

  // Detect Shopify
  if ((window as any).Shopify) {
    cms.push({
      name: 'Shopify',
      category: TECH_CATEGORIES.CMS,
      confidence: 'high',
    });
  }

  return cms;
};
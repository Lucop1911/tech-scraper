interface Technology {
  name: string;
  category: 'framework' | 'library' | 'cms' | 'analytics' | 'other';
  version?: string;
  confidence: 'high' | 'medium' | 'low';
}

interface TechDetectionResponse {
  success: boolean;
  technologies: Technology[];
  error?: string;
}

console.log('Tech-Scraper content script loaded');

const detectFrameworks = (): Technology[] => {
  const frameworks: Technology[] = [];

  // Detect React
  if (
    (window as any).React ||
    (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ ||
    document.querySelector('[data-reactroot], [data-reactid], [data-react-helmet]') ||
    document.querySelector('*[data-reactroot], *[data-reactid]') ||
    document.querySelector('[data-react-checksum]')
  ) {
    frameworks.push({
      name: 'React',
      category: 'framework',
      confidence: 'high',
    });
  }

  // Detect Vue
  if ((window as any).__VUE__ || (window as any).Vue) {
    frameworks.push({
      name: 'Vue.js',
      category: 'framework',
      confidence: 'high',
    });
  }

  // Detect Angular
  const ngVersion = document.querySelector('[ng-version]');
  if (ngVersion || (window as any).ng || (window as any).angular) {
    frameworks.push({
      name: 'Angular',
      category: 'framework',
      version: ngVersion?.getAttribute('ng-version') || undefined,
      confidence: 'high',
    });
  }

  // Detect Next.js
  if (document.getElementById('__next') || (window as any).__NEXT_DATA__) {
    frameworks.push({
      name: 'Next.js',
      category: 'framework',
      confidence: 'high',
    });
  }

  // Detect Nuxt
  if (document.getElementById('__nuxt') || (window as any).$nuxt) {
    frameworks.push({
      name: 'Nuxt.js',
      category: 'framework',
      confidence: 'high',
    });
  }

  // Additional framework detection for major platforms
  if ((window as any).Polymer) {
    frameworks.push({
      name: 'Polymer',
      category: 'framework',
      confidence: 'high',
    });
  }

  if ((window as any).Ember) {
    frameworks.push({
      name: 'Ember.js',
      category: 'framework',
      confidence: 'high',
    });
  }

  return frameworks;
};

const detectLibraries = (): Technology[] => {
  const libraries: Technology[] = [];

  // Detect jQuery
  if ((window as any).jQuery || (window as any).$) {
    const version = (window as any).jQuery?.fn?.jquery || (window as any).$?.fn?.jquery;
    libraries.push({
      name: 'jQuery',
      category: 'library',
      version: version,
      confidence: 'high',
    });
  }

  // Detect Lodash
  if ((window as any)._ && (window as any)._.VERSION) {
    libraries.push({
      name: 'Lodash',
      category: 'library',
      version: (window as any)._.VERSION,
      confidence: 'high',
    });
  }

  // Detect Three.js
  if ((window as any).THREE) {
    libraries.push({
      name: 'Three.js',
      category: 'library',
      confidence: 'high',
    });
  }

  // Detect Moment.js
  if ((window as any).moment) {
    libraries.push({
      name: 'Moment.js',
      category: 'library',
      confidence: 'high',
    });
  }

  // Detect Axios
  if ((window as any).axios) {
    libraries.push({
      name: 'Axios',
      category: 'library',
      confidence: 'high',
    });
  }

  return libraries;
};

const detectCMS = (): Technology[] => {
  const cms: Technology[] = [];

  // Check meta generator tag
  const generator = document.querySelector('meta[name="generator"]');
  if (generator) {
    const content = generator.getAttribute('content');
    if (content) {
      cms.push({
        name: content,
        category: 'cms',
        confidence: 'high',
      });
    }
  }

  // Detect WordPress
  if (
    document.querySelector('link[href*="wp-content"]') ||
    document.querySelector('script[src*="wp-includes"]') ||
    document.querySelector('meta[name="generator"][content*="WordPress"]')
  ) {
    cms.push({
      name: 'WordPress',
      category: 'cms',
      confidence: 'high',
    });
  }

  // Detect Shopify
  if ((window as any).Shopify || document.querySelector('meta[name="generator"][content*="Shopify"]')) {
    cms.push({
      name: 'Shopify',
      category: 'cms',
      confidence: 'high',
    });
  }

  // Detect Squarespace
  if (document.querySelector('meta[name="generator"][content*="Squarespace"]') || (window as any).Squarespace) {
    cms.push({
      name: 'Squarespace',
      category: 'cms',
      confidence: 'high',
    });
  }

  return cms;
};

const detectAnalytics = (): Technology[] => {
  const analytics: Technology[] = [];

  // Detect Google Analytics
  if (
    (window as any).ga ||
    (window as any).gtag ||
    document.querySelector('script[src*="google-analytics.com"]') ||
    document.querySelector('script[src*="googletagmanager.com"]')
  ) {
    analytics.push({
      name: 'Google Analytics',
      category: 'analytics',
      confidence: 'high',
    });
  }

  // Detect Facebook Pixel
  if (
    (window as any).fbq ||
    document.querySelector('script[src*="connect.facebook.net"]')
  ) {
    analytics.push({
      name: 'Facebook Pixel',
      category: 'analytics',
      confidence: 'high',
    });
  }

  return analytics;
};

const detectByPatterns = (): Technology[] => {
  const technologies: Technology[] = [];

  // Helper function to check if a script/link element matches a pattern
  const checkElementPattern = (selector: string, attr: string, patterns: string[], tech: Omit<Technology, 'confidence'>) => {
    const elements = document.querySelectorAll(selector);
    console.log(`Checking ${selector} for ${tech.name}, found ${elements.length} elements`);
    for (const element of elements) {
      const value = element.getAttribute(attr);
      if (value && patterns.some(pattern => value.includes(pattern))) {
        console.log(`Found ${tech.name} via pattern: ${value}`);
        technologies.push({ ...tech, confidence: 'medium' });
        break; // Only add once per technology
      }
    }
  };

  // Helper function to check HTML content for patterns
  const checkHTMLPattern = (patterns: string[], tech: Omit<Technology, 'confidence'>) => {
    const html = document.documentElement.outerHTML;
    if (patterns.some(pattern => html.includes(pattern))) {
      console.log(`Found ${tech.name} via HTML pattern`);
      technologies.push({ ...tech, confidence: 'medium' });
    }
  };

  // JavaScript Libraries - Script sources
  checkElementPattern('script[src]', 'src', [
    'jquery', 'jquery.min.js', 'jquery.js'
  ], { name: 'jQuery', category: 'library' });

  checkElementPattern('script[src]', 'src', [
    'react', 'react.min.js', 'react.production.min.js', 'react.development.js'
  ], { name: 'React', category: 'framework' });

  checkElementPattern('script[src]', 'src', [
    'vue', 'vue.min.js', 'vue.runtime.min.js'
  ], { name: 'Vue.js', category: 'framework' });

  checkElementPattern('script[src]', 'src', [
    'angular', 'angular.min.js'
  ], { name: 'Angular', category: 'framework' });

  checkElementPattern('script[src]', 'src', [
    'lodash', 'lodash.min.js'
  ], { name: 'Lodash', category: 'library' });

  checkElementPattern('script[src]', 'src', [
    'moment', 'moment.min.js'
  ], { name: 'Moment.js', category: 'library' });

  checkElementPattern('script[src]', 'src', [
    'axios', 'axios.min.js'
  ], { name: 'Axios', category: 'library' });

  checkElementPattern('script[src]', 'src', [
    'three', 'three.min.js'
  ], { name: 'Three.js', category: 'library' });

  // Major platform patterns
  checkElementPattern('script[src]', 'src', [
    'youtube.com', 'googlevideo.com', 'ytimg.com'
  ], { name: 'YouTube', category: 'other' });

  checkElementPattern('script[src]', 'src', [
    'twitter.com', 't.co', 'x.com', 'abs.twimg.com'
  ], { name: 'Twitter/X', category: 'other' });

  checkElementPattern('script[src]', 'src', [
    'netflix.com', 'nflxvideo.net', 'nflximg.net'
  ], { name: 'Netflix', category: 'other' });

  checkElementPattern('script[src]', 'src', [
    'chat.openai.com', 'cdn.openai.com', 'oaiusercontent.com'
  ], { name: 'ChatGPT', category: 'other' });

  // Additional React patterns for major sites
  checkElementPattern('script[src]', 'src', [
    'static.xx.fbcdn.net', 'connect.facebook.com', 'facebook.com'
  ], { name: 'React', category: 'framework' });

  // Check for inline scripts containing framework code
  const inlineScripts = document.querySelectorAll('script:not([src])');
  for (const script of inlineScripts) {
    const content = script.textContent || '';
    if (content.includes('React') || content.includes('react')) {
      console.log('Found React in inline script');
      technologies.push({ name: 'React', category: 'framework', confidence: 'medium' });
      break;
    }
    if (content.includes('Vue') || content.includes('vue')) {
      console.log('Found Vue in inline script');
      technologies.push({ name: 'Vue.js', category: 'framework', confidence: 'medium' });
      break;
    }
  }

  // Check for common CDN patterns
  checkElementPattern('script[src]', 'src', [
    'cdn.jsdelivr.net', 'unpkg.com', 'cdnjs.cloudflare.com'
  ], { name: 'CDN (jsDelivr/Unpkg/Cloudflare)', category: 'other' });

  // Check for Google services
  checkElementPattern('script[src]', 'src', [
    'apis.google.com', 'www.google.com/recaptcha', 'www.gstatic.com'
  ], { name: 'Google APIs', category: 'other' });

  // Check for common analytics patterns in HTML
  checkHTMLPattern([
    'gtag(', 'ga(', 'analytics.js', '_gaq.push'
  ], { name: 'Google Analytics', category: 'analytics' });

  checkHTMLPattern([
    'fbq(', 'facebook-pixel'
  ], { name: 'Facebook Pixel', category: 'analytics' });

  // CSS Frameworks - Link sources
  checkElementPattern('link[rel="stylesheet"][href]', 'href', [
    'bootstrap', 'bootstrap.min.css'
  ], { name: 'Bootstrap', category: 'library' });

  checkElementPattern('link[rel="stylesheet"][href]', 'href', [
    'font-awesome', 'fontawesome'
  ], { name: 'Font Awesome', category: 'library' });

  checkElementPattern('link[rel="stylesheet"][href]', 'href', [
    'bulma', 'bulma.min.css'
  ], { name: 'Bulma', category: 'library' });

  checkElementPattern('link[rel="stylesheet"][href]', 'href', [
    'tailwind', 'tailwind.min.css'
  ], { name: 'Tailwind CSS', category: 'library' });

  // Analytics - Script sources
  checkElementPattern('script[src]', 'src', [
    'google-analytics.com', 'googletagmanager.com'
  ], { name: 'Google Analytics', category: 'analytics' });

  checkElementPattern('script[src]', 'src', [
    'connect.facebook.net'
  ], { name: 'Facebook Pixel', category: 'analytics' });

  checkElementPattern('script[src]', 'src', [
    'hotjar.com'
  ], { name: 'Hotjar', category: 'analytics' });

  // CMS patterns
  checkElementPattern('script[src]', 'src', [
    'wp-includes', 'wp-content'
  ], { name: 'WordPress', category: 'cms' });

  checkElementPattern('link[href]', 'href', [
    'wp-content'
  ], { name: 'WordPress', category: 'cms' });

  // HTML Content patterns
  checkHTMLPattern(['<!-- This site is optimized with the Yoast SEO plugin'], { name: 'Yoast SEO', category: 'other' });
  checkHTMLPattern(['<!-- BEGIN Squarespace'], { name: 'Squarespace', category: 'cms' });

  // Meta tag patterns
  const metaTags = document.querySelectorAll('meta[name], meta[property]');
  for (const meta of metaTags) {
    const name = meta.getAttribute('name') || meta.getAttribute('property');
    const content = meta.getAttribute('content') || '';

    if (name === 'generator') {
      if (content.includes('WordPress')) {
        technologies.push({ name: 'WordPress', category: 'cms', confidence: 'high' });
      } else if (content.includes('Shopify')) {
        technologies.push({ name: 'Shopify', category: 'cms', confidence: 'high' });
      } else if (content.includes('Squarespace')) {
        technologies.push({ name: 'Squarespace', category: 'cms', confidence: 'high' });
      } else if (content.includes('Wix.com')) {
        technologies.push({ name: 'Wix', category: 'cms', confidence: 'high' });
      }
    }
  }

  // Remove duplicates
  return technologies.filter(
    (tech, index, self) =>
      index === self.findIndex((t) => t.name === tech.name)
  );
};

const detectAllTechnologies = (): Technology[] => {
  const allTechs = [
    ...detectFrameworks(),
    ...detectLibraries(),
    ...detectCMS(),
    ...detectAnalytics(),
    ...detectByPatterns(),
  ];

  // Remove duplicates based on name
  return allTechs.filter(
    (tech, index, self) =>
      index === self.findIndex((t) => t.name === tech.name)
  );
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log('Content script received message:', message);
  if (message.action === 'detectTech') {
    console.log('Detecting technologies...');

    // First, try immediate detection
    const immediateTech = detectAllTechnologies();
    console.log('Immediate detection found:', immediateTech.length, 'technologies');

    if (immediateTech.length > 0) {
      // If we found technologies immediately, return them
      const response: TechDetectionResponse = {
        success: true,
        technologies: immediateTech,
      };
      sendResponse(response);
      return true;
    }

    // If nothing found immediately, wait for dynamic loading
    setTimeout(() => {
      try {
        const technologies = detectAllTechnologies();
        console.log('Delayed detection found:', technologies.length, 'technologies');

        // If still nothing found, add some basic detections
        if (technologies.length === 0) {
          console.log('No technologies detected, adding fallback detections...');

          // Check for basic HTML5 features
          if (document.querySelector('canvas')) {
            technologies.push({ name: 'HTML5 Canvas', category: 'other', confidence: 'low' });
          }

          // Check for basic web technologies
          if (document.querySelector('video')) {
            technologies.push({ name: 'HTML5 Video', category: 'other', confidence: 'low' });
          }

          if (document.querySelector('svg')) {
            technologies.push({ name: 'SVG', category: 'other', confidence: 'low' });
          }

          // Check for service worker (common in modern sites)
          if ('serviceWorker' in navigator) {
            technologies.push({ name: 'Service Worker', category: 'other', confidence: 'low' });
          }

          // Check for web components
          const firstElement = document.querySelector('*');
          if (firstElement && 'shadowRoot' in firstElement) {
            technologies.push({ name: 'Web Components', category: 'other', confidence: 'low' });
          }
        }

        const response: TechDetectionResponse = {
          success: true,
          technologies,
        };
        sendResponse(response);
      } catch (error) {
        console.error('Error in technology detection:', error);
        const response: TechDetectionResponse = {
          success: false,
          technologies: [],
          error: error instanceof Error ? error.message : 'Unknown error',
        };
        sendResponse(response);
      }
    }, 3000); // Wait 3 seconds for dynamic loading

    return true; // Keep the message channel open for async response
  }
  return true;
});
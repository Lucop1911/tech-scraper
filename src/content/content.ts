import type { Technology, TechDetectionResponse } from "../shared/types";

const injectPageDiscovery = () => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('injected.js');
  script.onload = () => script.remove();
  (document.head || document.documentElement).appendChild(script);
};

class TechDetector {
  private detectedTechs: Map<string, Technology> = new Map();
  private versionRegex = /(?:@|v|(?:\/))(\d+\.\d+\.\d+(?:-[a-z]+\.\d+)?)/i;
  private checkedOnce = false;

  constructor() {
    this.setupListeners();
    this.observeChanges();
    this.setupDynamicPolling();
  }

  private setupListeners() {
    window.addEventListener('TECH_SCRAPER_GLOBALS', (event: any) => {
      const globals = event.detail as Technology[];
      globals.forEach(g => this.addSignal(g, 3));
    });
  }

  private observeChanges() {
    const observer = new MutationObserver((mutations) => {
      const shouldRecheck = mutations.some(mutation =>
        Array.from(mutation.addedNodes).some(node =>
          ['SCRIPT', 'LINK', 'META', 'STYLE'].includes(node.nodeName)
        )
      );
      if (shouldRecheck && this.checkedOnce) {
        this.runDOMDetection();
      }
    });

    observer.observe(document.documentElement, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['data-reactroot', 'data-react-helmet', 'ng-version']
    });
  }

  private setupDynamicPolling() {
    let pollCount = 0;
    const maxPolls = 10;
    
    const dynamicCheck = () => {
      pollCount++;
      
      if (window.__NEXT_DATA__) this.addSignal({ name: 'Next.js', category: 'framework' }, 1);
      if (window.$nuxt || window.__NUXT__) this.addSignal({ name: 'Nuxt.js', category: 'framework' }, 1);
      if (window.React || window.__REACT_DEVTOOLS_GLOBAL_HOOK__) this.addSignal({ name: 'React', category: 'framework' }, 1);
      if (window.Vue || window.__VUE__) this.addSignal({ name: 'Vue.js', category: 'framework' }, 1);
      if (window.angular || document.querySelector('[ng-version]')) this.addSignal({ name: 'Angular', category: 'framework' }, 1);
      
      if (pollCount >= maxPolls) {
        clearInterval(interval);
      }
    };

    const interval = setInterval(dynamicCheck, 500);
    setTimeout(() => clearInterval(interval), 5000);
  }

  public addSignal(tech: Partial<Technology> & { name: string }, weight: number) {
    const existing = this.detectedTechs.get(tech.name);
    const newSignals = (existing?.signals || 0) + weight;

    let confidence: 'low' | 'medium' | 'high' = 'low';
    if (newSignals >= 4) confidence = 'high';
    else if (newSignals >= 2) confidence = 'medium';

    this.detectedTechs.set(tech.name, {
      name: tech.name,
      category: tech.category || existing?.category || 'other',
      version: tech.version || existing?.version,
      signals: newSignals,
      confidence
    });
  }

  private extractVersion(str: string): string | undefined {
    const match = str.match(this.versionRegex);
    return match ? match[1] : undefined;
  }

  public runDOMDetection() {
    this.checkedOnce = true;
    
    // Check tags and script
    const elements = document.querySelectorAll('script[src], link[rel="stylesheet"], link[href]');
    elements.forEach(el => {
      const url = el.nodeName === 'SCRIPT' 
        ? (el as HTMLScriptElement).src 
        : (el as HTMLLinkElement).href;

      if (!url) return;

      const urlLower = url.toLowerCase();
      
      const mappings: Record<string, { name: string, cat: Technology['category'] }> = {
        'react': { name: 'React', cat: 'framework' },
        'react-dom': { name: 'React', cat: 'framework' },
        'vue': { name: 'Vue.js', cat: 'framework' },
        'angular': { name: 'Angular', cat: 'framework' },
        'jquery': { name: 'jQuery', cat: 'library' },
        'bootstrap': { name: 'Bootstrap', cat: 'library' },
        'tailwind': { name: 'Tailwind CSS', cat: 'library' },
        'lodash': { name: 'Lodash', cat: 'library' },
        'underscore': { name: 'Underscore.js', cat: 'library' },
        'axios': { name: 'Axios', cat: 'library' },
        'd3': { name: 'D3.js', cat: 'library' },
        'three': { name: 'Three.js', cat: 'library' },
        'gsap': { name: 'GSAP', cat: 'library' },
        'webpack': { name: 'Webpack', cat: 'build-tool' },
        'vite': { name: 'Vite', cat: 'build-tool' },
        'googletagmanager': { name: 'Google Tag Manager', cat: 'analytics' },
        'google-analytics': { name: 'Google Analytics', cat: 'analytics' },
        'analytics.js': { name: 'Google Analytics', cat: 'analytics' },
        'gtag': { name: 'Google Analytics', cat: 'analytics' },
        'facebook.net': { name: 'Facebook Pixel', cat: 'analytics' },
        'hotjar': { name: 'Hotjar', cat: 'analytics' },
        'segment': { name: 'Segment', cat: 'analytics' },
        'wp-content': { name: 'WordPress', cat: 'cms' },
        'wp-includes': { name: 'WordPress', cat: 'cms' },
        'shopify': { name: 'Shopify', cat: 'cms' },
        'wix.com': { name: 'Wix', cat: 'cms' },
        'squarespace': { name: 'Squarespace', cat: 'cms' },
        'webflow': { name: 'Webflow', cat: 'cms' }
      };

      for (const [key, val] of Object.entries(mappings)) {
        if (urlLower.includes(key)) {
          this.addSignal({
            name: val.name,
            category: val.cat,
            version: this.extractVersion(url)
          }, 2);
        }
      }
    });

    // Meta tag detection
    const generator = document.querySelector('meta[name="generator"]')?.getAttribute('content');
    if (generator) {
      const genLower = generator.toLowerCase();
      let name = generator;
      let category: Technology['category'] = 'cms';
      
      if (genLower.includes('wordpress')) name = 'WordPress';
      else if (genLower.includes('drupal')) name = 'Drupal';
      else if (genLower.includes('joomla')) name = 'Joomla';
      else if (genLower.includes('wix')) name = 'Wix';
      
      this.addSignal({ name, category }, 3);
    }

    // Framework specific detection
    if (document.querySelector('[ng-version]')) {
      const ver = document.querySelector('[ng-version]')?.getAttribute('ng-version');
      this.addSignal({ name: 'Angular', category: 'framework', version: ver || undefined }, 3);
    }
    
    if (document.getElementById('__next')) {
      this.addSignal({ name: 'Next.js', category: 'framework' }, 3);
    }
    
    if (document.getElementById('__nuxt')) {
      this.addSignal({ name: 'Nuxt.js', category: 'framework' }, 3);
    }
    
    if (document.querySelector('[data-reactroot], [data-reactid]')) {
      this.addSignal({ name: 'React', category: 'framework' }, 2);
    }
    
    if (document.querySelector('[data-react-helmet]')) {
      this.addSignal({ name: 'React Helmet', category: 'library' }, 2);
    }
    
    if (document.querySelector('[data-v-]')) {
      this.addSignal({ name: 'Vue.js', category: 'framework' }, 2);
    }

    // CSS frameworks via class patterns check
    const bodyClasses = document.body?.className || '';
    if (/\b(container|row|col-|btn-)\b/.test(bodyClasses)) {
      this.addSignal({ name: 'Bootstrap', category: 'library' }, 1);
    }
    if (/\b(flex|grid|p-|m-|text-)\b/.test(bodyClasses)) {
      this.addSignal({ name: 'Tailwind CSS', category: 'library' }, 1);
    }

    // Build tool artifacts check
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const hasChunks = scripts.some(s => {
      const src = (s as HTMLScriptElement).src;
      return /chunk|bundle|vendor/.test(src);
    });
    
    if (hasChunks) {
      const hasVite = scripts.some(s => (s as HTMLScriptElement).src.includes('/@vite'));
      if (hasVite) {
        this.addSignal({ name: 'Vite', category: 'build-tool' }, 2);
      } else {
        this.addSignal({ name: 'Webpack', category: 'build-tool' }, 1);
      }
    }

    // Meta powered tags check
    const poweredBy = document.querySelector('meta[name="powered-by"]')?.getAttribute('content');
    if (poweredBy) {
      this.addSignal({ name: poweredBy, category: 'cms' }, 2);
    }
  }

  public getResults(): Technology[] {
    return Array.from(this.detectedTechs.values())
      .sort((a, b) => {
        // Sorting by confidence first then by signals
        if (a.confidence !== b.confidence) {
          const order = { high: 0, medium: 1, low: 2 };
          return order[a.confidence] - order[b.confidence];
        }
        return b.signals - a.signals;
      });
  }
}

const detector = new TechDetector();
injectPageDiscovery();

// Running initial detection after a short delay to let page load
setTimeout(() => {
  detector.runDOMDetection();
}, 100);

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === 'detectTech') {
    detector.runDOMDetection();

    setTimeout(() => {
      sendResponse({
        success: true,
        technologies: detector.getResults()
      } as TechDetectionResponse);
    }, 200);
    return true;
  }
});
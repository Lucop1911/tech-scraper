export interface Technology {
  name: string;
  category: 'framework' | 'library' | 'cms' | 'analytics' | 'build-tool' | 'state-management' | 'other';
  version?: string;
  confidence: 'high' | 'medium' | 'low';
  signals: number;
}

export interface DetectionResult {
  technologies: Technology[];
  url: string;
  timestamp: number;
}

export interface Message {
  action: string;
  payload?: any;
}

export interface TechDetectionResponse {
  success: boolean;
  technologies: Technology[];
  error?: string;
}

declare global {
  interface Window {
    // React
    React?: any;
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
    
    // Vue
    Vue?: any;
    __VUE__?: any;
    __VUE_DEVTOOLS_GLOBAL_HOOK__?: any;
    
    // Angular
    ng?: any;
    angular?: any;
    getAllAngularRootElements?: () => any[];
    
    // Next.js
    __NEXT_DATA__?: any;
    
    // Nuxt
    $nuxt?: any;
    __NUXT__?: any;
    
    // jQuery
    jQuery?: any;
    $?: any;
    
    // Other libraries
    _?: any;
    THREE?: any;
    moment?: any;
    axios?: any;
    Shopify?: any;
    ga?: any;
    gtag?: any;
    fbq?: any;
    _paq?: any; // Matomo
    dataLayer?: any[]; // Google Tag Manager
    
    // SPA frameworks
    Ember?: any;
    Backbone?: any;
    Svelte?: any;
    
    // Analytics
    amplitude?: any;
    mixpanel?: any;
    
    // State management
    __REDUX_DEVTOOLS_EXTENSION__?: any;
    __MOBX_DEVTOOLS_GLOBAL_HOOK__?: any;
  }
}
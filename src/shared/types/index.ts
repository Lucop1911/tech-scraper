export interface Technology {
  name: string;
  category: 'framework' | 'library' | 'cms' | 'analytics' | 'other';
  version?: string;
  confidence: 'high' | 'medium' | 'low';
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
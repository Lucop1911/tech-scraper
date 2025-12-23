export const MESSAGE_ACTIONS = {
  DETECT_TECH: 'detectTech',
  GET_TECH_DATA: 'getTechData',
  SAVE_RESULTS: 'saveResults',
} as const;

export const TECH_CATEGORIES = {
  FRAMEWORK: 'framework',
  LIBRARY: 'library',
  CMS: 'cms',
  ANALYTICS: 'analytics',
  OTHER: 'other',
} as const;
import { detectFrameworks } from './detectors/frameworks';
import { detectLibraries } from './detectors/libraries';
import { detectCMS } from './detectors/cms';
import { MESSAGE_ACTIONS } from '../shared/constants';
import type { Technology, TechDetectionResponse } from '../shared/types';

console.log('Tech-Scraper content script loaded');

const detectAllTechnologies = (): Technology[] => {
  const allTechs = [
    ...detectFrameworks(),
    ...detectLibraries(),
    ...detectCMS(),
  ];

  // Remove duplicates based on name
  return allTechs.filter(
    (tech, index, self) =>
      index === self.findIndex((t) => t.name === tech.name)
  );
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === MESSAGE_ACTIONS.DETECT_TECH) {
    try {
      const technologies = detectAllTechnologies();
      const response: TechDetectionResponse = {
        success: true,
        technologies,
      };
      sendResponse(response);
    } catch (error) {
      const response: TechDetectionResponse = {
        success: false,
        technologies: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      sendResponse(response);
    }
  }
  return true;
});
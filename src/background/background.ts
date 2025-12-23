import type { DetectionResult } from '../shared/types';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Tech-Scraper extension installed');
});

// Store detection results
const detectionCache = new Map<string, DetectionResult>();

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === 'saveResults') {
    const { url, technologies } = message.payload;
    detectionCache.set(url, {
      technologies,
      url,
      timestamp: Date.now(),
    });
    sendResponse({ success: true });
  }

  if (message.action === 'getResults') {
    const { url } = message.payload;
    const results = detectionCache.get(url);
    sendResponse({ results });
  }

  return true;
});
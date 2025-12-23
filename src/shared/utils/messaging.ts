import type { Message } from '../types';

export const sendMessageToTab = async (tabId: number, message: Message) => {
  try {
    return await chrome.tabs.sendMessage(tabId, message);
  } catch (error) {
    console.error('Error sending message to tab:', error);
    throw error;
  }
};

export const sendMessageToBackground = async (message: Message) => {
  try {
    return await chrome.runtime.sendMessage(message);
  } catch (error) {
    console.error('Error sending message to background:', error);
    throw error;
  }
};
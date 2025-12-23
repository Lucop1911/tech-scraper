import { ref } from 'vue';
import type { Technology, TechDetectionResponse } from '../../shared/types';
import { MESSAGE_ACTIONS } from '../../shared/constants';

export const useTechDetection = () => {
  const technologies = ref<Technology[]>([]);
  const loading = ref(false);
  const scanned = ref(false);
  const error = ref('');

  const detectTechnologies = async () => {
    loading.value = true;
    error.value = '';
    scanned.value = false;
    technologies.value = [];

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab?.id) {
        throw new Error('No active tab found');
      }

      const response: TechDetectionResponse = await chrome.tabs.sendMessage(
        tab.id,
        { action: MESSAGE_ACTIONS.DETECT_TECH }
      );

      if (response.success && response.technologies) {
        technologies.value = response.technologies;
        scanned.value = true;

        // Save to background
        await chrome.runtime.sendMessage({
          action: 'saveResults',
          payload: {
            url: tab.url,
            technologies: response.technologies,
          },
        });
      } else {
        throw new Error(response.error || 'Unknown error');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error detecting technologies';
      console.error('Detection error:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    technologies,
    loading,
    scanned,
    error,
    detectTechnologies,
  };
};
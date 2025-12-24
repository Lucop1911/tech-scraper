<template>
  <div class="tech-list">
    <div class="tech-header">
      <h2>Detected Technologies</h2>
      <div class="tech-count">
        <span class="count">{{ technologies.length }}</span>
      </div>
    </div>

    <div class="tech-grid">
      <div
        v-for="(tech, index) in technologies"
        :key="tech.name"
        class="tech-card"
        :class="`confidence-${tech.confidence}`"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="tech-card-content">
          <div class="tech-icon">
            <component :is="getTechIcon(tech.category)" />
          </div>

          <div class="tech-info">
            <div class="tech-name">{{ tech.name }}</div>
            <div class="tech-category">{{ formatCategory(tech.category) }}</div>
            <div v-if="tech.version" class="tech-version">
              <span class="version-badge">v{{ tech.version }}</span>
            </div>
          </div>

          <div class="confidence-indicator">
            <div class="confidence-dot"></div>
          </div>
        </div>

        <div class="tech-card-glow"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Technology } from '../../shared/types';
import FrameworkIcon from '../../shared/icons/FrameworkIcon.vue';
import LibraryIcon from '../../shared/icons/LibraryIcon.vue';
import CmsIcon from '../../shared/icons/CmsIcon.vue';
import AnalyticsIcon from '../../shared/icons/AnalyticsIcon.vue';
import OtherIcon from '../../shared/icons/OtherIcon.vue';
import BuiltToolsIcon from '../../shared/icons/BuiltToolsIcon.vue';
import StateManagementIcon from '../../shared/icons/StateManagementIcon.vue';

defineProps<{
  technologies: Technology[];
}>();

const getTechIcon = (category: string) => {
  const icons = {
    framework: FrameworkIcon,
    library: LibraryIcon,
    cms: CmsIcon,
    analytics: AnalyticsIcon,
    'build-tool': BuiltToolsIcon,
    'state-management': StateManagementIcon,
    other: OtherIcon
  };
  return icons[category as keyof typeof icons] || OtherIcon;
};

const formatCategory = (category: string) => {
  return category.replace(/-/g, ' ');
};
</script>

<style scoped>
.tech-list {
  margin-top: var(--spacing-lg);
}

.tech-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
}

.tech-header h2 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.025em;
}

.tech-count {
  background: var(--gradient-primary);
  color: var(--text-inverse);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 20px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  min-width: 32px;
  text-align: center;
}

.count {
  display: block;
  line-height: 1;
}

.tech-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  max-height: 400px;
  overflow-y: auto;
  padding-right: var(--spacing-xs);
}

.tech-grid::-webkit-scrollbar {
  width: 4px;
}

.tech-grid::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
  border-radius: 2px;
}

.tech-grid::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 2px;
}

.tech-card {
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.tech-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.tech-card-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  position: relative;
  z-index: 2;
}

.tech-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  color: var(--primary-color);
  flex-shrink: 0;
}

.tech-info {
  flex: 1;
  min-width: 0;
}

.tech-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-xs);
  word-break: break-word;
}

.tech-category {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  font-weight: 500;
}

.tech-version {
  margin-top: var(--spacing-xs);
}

.version-badge {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 2px var(--spacing-xs);
  border-radius: 4px;
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.confidence-indicator {
  flex-shrink: 0;
}

.confidence-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
}

.confidence-high .confidence-dot {
  background: var(--success-color);
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
}

.confidence-medium .confidence-dot {
  background: var(--warning-color);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
}

.confidence-low .confidence-dot {
  background: var(--text-muted);
}

.tech-card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.tech-card:hover .tech-card-glow {
  opacity: 1;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
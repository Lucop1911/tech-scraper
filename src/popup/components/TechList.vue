<template>
  <div class="tech-list">
    <h2>Detected Technologies ({{ technologies.length }})</h2>
    <div class="tech-grid">
      <div 
        v-for="tech in technologies" 
        :key="tech.name"
        class="tech-item"
        :class="`confidence-${tech.confidence}`"
      >
        <div class="tech-header">
          <span class="tech-name">{{ tech.name }}</span>
          <span class="tech-category">{{ tech.category }}</span>
        </div>
        <div v-if="tech.version" class="tech-version">
          v{{ tech.version }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Technology } from '../../shared/types';

defineProps<{
  technologies: Technology[];
}>();
</script>

<style scoped>
.tech-list {
  margin-top: var(--spacing-md);
}

h2 {
  font-size: 14px;
  margin-bottom: var(--spacing-md);
  color: var(--text-color);
  font-weight: 600;
}

.tech-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.tech-item {
  padding: 12px;
  background: var(--bg-light);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--primary-color);
  transition: transform 0.2s ease;
}

.tech-item:hover {
  transform: translateX(4px);
}

.tech-item.confidence-high {
  border-left-color: #4CAF50;
}

.tech-item.confidence-medium {
  border-left-color: #FF9800;
}

.tech-item.confidence-low {
  border-left-color: #9E9E9E;
}

.tech-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tech-name {
  font-weight: 600;
  color: var(--text-color);
}

.tech-category {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}

.tech-version {
  margin-top: 4px;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
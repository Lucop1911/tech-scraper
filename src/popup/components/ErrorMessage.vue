<template>
  <div v-if="message" class="error-message">
    <div class="error-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    </div>
    <div class="error-content">
      <div class="error-title">Error</div>
      <div class="error-text">{{ message }}</div>
    </div>
    <div class="error-glow"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<style scoped>
.error-message {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--error-bg);
  color: var(--error-color);
  border-radius: var(--border-radius);
  border: 1px solid rgba(239, 68, 68, 0.2);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  animation: slideIn 0.3s ease-out;
}

.error-icon {
  width: 24px;
  height: 24px;
  color: var(--error-color);
  flex-shrink: 0;
  margin-top: 2px;
}

.error-icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 2.5;
}

.error-content {
  flex: 1;
  min-width: 0;
}

.error-title {
  font-weight: 600;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
  color: var(--error-color);
}

.error-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.4;
}

.error-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%);
  pointer-events: none;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
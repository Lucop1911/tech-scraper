<template>
  <button
    class="scan-button"
    :class="{ loading }"
    :disabled="loading"
    @click="$emit('click')"
  >
    <div class="button-content">
      <svg v-if="!loading" class="scan-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <div v-else class="spinner-container">
        <div class="spinner"></div>
      </div>
      <span class="button-text">{{ loading ? 'Scanning...' : 'Detect Technologies' }}</span>
    </div>
    <div class="button-glow"></div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>

<style scoped>
.scan-button {
  width: 100%;
  padding: 0;
  background: var(--gradient-primary);
  color: var(--text-inverse);
  border: none;
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  min-height: 56px;
}

.scan-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.scan-button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-md);
}

.scan-button:disabled {
  background: var(--text-muted);
  cursor: not-allowed;
  transform: none;
  box-shadow: var(--shadow-sm);
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  position: relative;
  z-index: 2;
}

.scan-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2.5;
}

.button-text {
  font-weight: 600;
  letter-spacing: 0.025em;
}

.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--text-inverse);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left var(--transition-slow);
}

.scan-button:hover:not(:disabled) .button-glow {
  left: 100%;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.scan-button.loading {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
</style>
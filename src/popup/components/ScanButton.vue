<template>
  <button 
    class="scan-button" 
    :class="{ loading }" 
    :disabled="loading"
    @click="$emit('click')"
  >
    <span v-if="loading" class="spinner"></span>
    {{ loading ? 'Scanning...' : 'Detect Technologies' }}
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
  padding: 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.scan-button:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.scan-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
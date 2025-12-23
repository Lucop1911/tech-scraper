<template>
  <div v-if="message" class="error-message">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM7 4h2v5H7V4zm0 6h2v2H7v-2z"/>
    </svg>
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<style scoped>
.error-message {
  margin-top: var(--spacing-md);
  padding: 12px;
  background: var(--error-bg);
  color: var(--error-color);
  border-radius: var(--border-radius);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-left: 3px solid var(--error-color);
}
</style>
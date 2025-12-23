<template>
  <div class="popup-container">
    <header class="popup-header">
      <div class="header-content">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <h1>Tech Scraper</h1>
      </div>
      <div class="header-accent"></div>
    </header>

    <main class="popup-main">
      <div class="scan-section">
        <ScanButton
          :loading="loading"
          @click="detectTechnologies"
        />

        <div v-if="!loading && !scanned" class="scan-hint">
          <svg class="hint-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          <span>Click to scan the current website for technologies</span>
        </div>
      </div>

      <TechList
        v-if="technologies.length > 0"
        :technologies="technologies"
      />

      <div v-else-if="scanned && !loading" class="no-results">
        <div class="no-results-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <path d="m15 9-6 6"/>
            <path d="m9 9 6 6"/>
          </svg>
        </div>
        <div class="no-results-content">
          <h3>No technologies detected</h3>
          <p>This website might be using custom frameworks or the technologies may load dynamically.</p>
        </div>
      </div>

      <ErrorMessage :message="error" />
    </main>
  </div>
</template>

<script setup lang="ts">
import ScanButton from './components/ScanButton.vue';
import TechList from './components/TechList.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import { useTechDetection } from './composables/useTechDetection';

const {
  technologies,
  loading,
  scanned,
  error,
  detectTechnologies,
} = useTechDetection();
</script>

<style scoped>
.popup-container {
  width: 400px;
  min-height: 550px;
  max-height: 750px;
  background: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
}

.popup-header {
  background: var(--gradient-primary);
  color: var(--text-inverse);
  padding: var(--spacing-xl);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  position: relative;
  z-index: 2;
}

.logo-icon {
  width: 28px;
  height: 28px;
  stroke-width: 2;
}

.popup-header h1 {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.025em;
}

.header-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.popup-main {
  padding: var(--spacing-xl);
  background: var(--bg-secondary);
  min-height: calc(100% - 120px);
}

.scan-section {
  margin-bottom: var(--spacing-xl);
}

.scan-hint {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  animation: fadeIn 0.5s ease-out;
}

.hint-icon {
  width: 16px;
  height: 16px;
  color: var(--primary-color);
  flex-shrink: 0;
}

.no-results {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  border: 2px dashed var(--border-color);
  margin-top: var(--spacing-lg);
  animation: fadeIn 0.5s ease-out;
}

.no-results-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-md);
  color: var(--text-muted);
  opacity: 0.6;
}

.no-results-icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.5;
}

.no-results-content h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-sm);
}

.no-results-content p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
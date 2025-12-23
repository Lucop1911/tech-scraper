<template>
  <div class="popup-container">
    <header class="popup-header">
      <h1>Tech Scraper</h1>
    </header>
    
    <main class="popup-main">
      <ScanButton 
        :loading="loading" 
        @click="detectTechnologies"
      />

      <TechList 
        v-if="technologies.length > 0" 
        :technologies="technologies"
      />

      <div v-else-if="scanned" class="no-results">
        No technologies detected on this page
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
@import './styles/popup.css';

.no-results {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-light);
  border-radius: var(--border-radius);
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
}
</style>
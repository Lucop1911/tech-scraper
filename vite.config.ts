import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { copyFileSync } from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    {
      name: "build-extension",
      closeBundle() {
        // Copy manifest
        copyFileSync("src/manifest.json", "dist/manifest.json");
        
        // Move popup.html to root if it's nested
        const nestedPopupPath = "dist/src/popup/popup.html";
        const rootPopupPath = "dist/popup.html";
        
        try {
          if (require("fs").existsSync(nestedPopupPath)) {
            copyFileSync(nestedPopupPath, rootPopupPath);
            console.log("✓ Moved popup.html to dist root");
          }
        } catch (e) {
          console.log("popup.html already in correct location");
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, "src/popup/popup.html"),
        background: path.resolve(__dirname, "src/background/background.ts"),
        content: path.resolve(__dirname, "src/content/content.ts")
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
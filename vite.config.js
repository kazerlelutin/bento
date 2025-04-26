import FullReload from 'vite-plugin-full-reload'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [FullReload(['**/*.html']), tailwindcss()],
  public: './public',
  preserveSymlinks: true,
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html', 'json-summary'],
      exclude: ['node_modules', 'dist', 'build', 'public', 'vite.config.js', 'coverage'],

    },
  },
})

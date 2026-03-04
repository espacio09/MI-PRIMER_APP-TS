
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',     // para tu app CLI
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});

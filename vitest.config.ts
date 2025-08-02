import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        '.next/',
        'dist/',
        'coverage/',
        'src/{app,constants,lib/supabase,types,middleware.ts}/',
        'src/{hooks/useStore.ts,store,features}',
        'src/components/ui/*.{ts,tsx}', // Shadcn components
        '*config*.{ts,mts}',
      ],
    },
  },
});

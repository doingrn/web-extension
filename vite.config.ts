import { crx } from '@crxjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import manifest from './manifest';

export default defineConfig({
  plugins: [tailwindcss(), react(), tsconfigPaths(), crx({ manifest })],
  server: {
    port: 3000,
    strictPort: true
  }
});

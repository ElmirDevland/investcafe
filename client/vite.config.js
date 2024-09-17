import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: 'https://elmirdevland.github.io/investcafe/',
  plugins: [react()],
  server: {
    host: true,
  },
});

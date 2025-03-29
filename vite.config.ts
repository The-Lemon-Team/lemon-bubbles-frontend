import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      global: 'window',
      'process.env': env,
    },
    envPrefix: 'VITE',
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3133',
        },
      },
    },
  };
});

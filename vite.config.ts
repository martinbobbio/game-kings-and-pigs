import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import dotenv from 'dotenv';

export default defineConfig(() => {
  const env = dotenv.config({
    path: `.env`,
  }).parsed;

  return {
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
    define: {
      'process.env': Object.keys(env || {}).reduce((acc, key) => {
        acc[key] = JSON.stringify(env[key])?.replace(/"/g, '');
        return acc;
      }, {}),
    },
  };
});

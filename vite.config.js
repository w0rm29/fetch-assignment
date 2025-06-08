import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ghPages from 'vite-plugin-gh-pages';

// Replace 'your-username' and 'your-repo' accordingly
export default defineConfig({
  base: 'fetch-assignment',
  plugins: [react(), ghPages()],
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@calypso/ui': path.resolve(__dirname, '../../packages/ui/src'),
            '@calypso/core': path.resolve(__dirname, '../../packages/core/src'),
            '@calypso/services': path.resolve(__dirname, '../../packages/services/src'),
        },
    },
    server: {
        port: 31415,
        proxy: {
            '/api': {
                target: 'http://localhost:31415',
                changeOrigin: true,
            },
        },
    },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
    appType: 'spa',
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        },
    },
    base: '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false, // Disable sourcemaps for production performance
        minify: 'esbuild', // Use esbuild for faster minification
        cssCodeSplit: true, // Enable CSS code splitting
        chunkSizeWarningLimit: 600, // Increase chunk size warning threshold
        assetsInlineLimit: 4096, // Inline small assets for fewer requests
        target: 'esnext', // Ensure modern JS output for Cloudflare compatibility
        manifest: true,   // Generate manifest for Cloudflare integrations
        emptyOutDir: true, // Clean output directory before build
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    bootstrap: ['react-bootstrap', 'bootstrap']
                }
            }
        }
    },
    server: {
        port: 5173,
        open: true
    }
})

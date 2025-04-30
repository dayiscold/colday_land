import {CommonServerOptions, defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            "#root": resolve(__dirname),
        },
    },
    server: {
        port: 5173,
        cors: false,
        proxy: setupProxy(),
    },
})

function setupProxy(): CommonServerOptions["proxy"] {
    return {
        "/api": {
            target: "http://localhost:5000",
            secure: false,
            changeOrigin: true,
        }
    };
}

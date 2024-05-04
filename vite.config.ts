import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJSX from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader'
import dotenv from "dotenv";
import path from "path";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueJSX(),
        svgLoader({
            defaultImport: 'url'
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        manifest: true,
        rollupOptions: {
            output: {
                entryFileNames: '[name].js', // Настройка имени выходного файла js
                chunkFileNames: '[name].js', // Настройка имени выходного файла для чанков js
                assetFileNames: '[name].[ext]' // Настройка имени выходного файла для ресурсов (css, изображения и т.д.)
            }
        }
    },
    base: '/app/matrix/v'
})

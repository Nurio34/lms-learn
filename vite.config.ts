// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "My LMS Learn App",
                short_name: "LMS Learn",
                description: "My Vite + React LMS Learn application",
                theme_color: "#000000",
                background_color: "#000000",
                display: "standalone",
                start_url: "/?source=pwa",
                scope: "/",
                icons: [
                    {
                        src: "icons/icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icons/icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
            workbox: {
                // Optional Workbox configurations
                globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg}"],
            },
        }),
    ],
});

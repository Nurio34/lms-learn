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
                short_name: "PWA",
                description: "Bring instructors and students together",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                display: "standalone",
                orientation: "portrait",
                start_url: "/",
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

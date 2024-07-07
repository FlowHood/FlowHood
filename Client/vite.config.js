import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      devOptions: {
        enabled: true
      },
      manifest: {
        short_name: "Flow Hood",
        name: "Sistema de control de acceso Flow Hood",
        theme_color: "#ffffff",
        description:
          "Flow Hood es una solución tecnológica para mejorar el control de acceso y la seguridad en comunidades residenciales.",
        icons: [
          {
            src: "/android-chrome-192x192",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});

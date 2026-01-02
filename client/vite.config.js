import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/therapists": "http://localhost:4000",
      "/clients": "http://localhost:4000",
    },
  },
});

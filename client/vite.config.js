import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../dist", // Adjust the output directory if needed
  },
  server: {
    port: 3000, // Ensure the port matches your deployment configuration
  },
});

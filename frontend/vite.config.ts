import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    base: "",
    build: {
        reportCompressedSize: false,
        outDir: "../client_packages/package2/dist",
        emptyOutDir: true,
        minify: "esbuild",
        chunkSizeWarningLimit: 5000
    },
    plugins: [react(), viteTsconfigPaths()],
    server: {
        open: true,
        port: 3000
    },
    resolve: {
        alias: {}
    }
});

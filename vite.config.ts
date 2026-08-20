/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project from /client-menu/, so the build needs
  // that as its base path. The dev server keeps using "/".
  base: command === "build" ? "/client-menu/" : "/",
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
}));

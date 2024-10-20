import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import graphqlLoader from "vite-plugin-graphql-loader";

export default defineConfig({
  plugins: [
    react(),
  graphqlLoader()
  ]
});

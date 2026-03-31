import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "dist/extension.js",
  },
  external: ["vscode", "child_process"],
});

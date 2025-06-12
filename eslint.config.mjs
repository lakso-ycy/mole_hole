import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
  ignores: [
    "instrumented/**",
    "coverage/**",
    "node_modules/**"
  ]
},
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["cypress/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,     // untuk describe, it, before, after, dll
        ...globals.chai,      // untuk expect, assert, should
        Cypress: "readonly",  // Cypress class
        cy: "readonly",       // cy object
      },
    },
  },
]);
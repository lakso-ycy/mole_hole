// ini untuk ambil aturan standar atau default dari eslint, jadi ga perlu atur manual, emang udah disediakan
import js from "@eslint/js";

// ini untuk deklarasi variabel" yang kita gunakan seperti : 
// {cy.visit("/"), cy nya itu variabel yang harus kita kasih tau ke eslint supaya gadianggap error
import globals from "globals";

//ini itu hanya untuk pembantu saja seperti auto-completion dan auto-correct
import { defineConfig } from "eslint/config";

// untuk membungkus semua aturan dalam 1 wadah yakni "lint", 
// jadi ketika nanti jalan npm run lint, semua nya sudah masuk dalam lint
export default defineConfig([

// mengatur lint khusus file-file javascript
  {
    // (**/*) ini maksudnya adalah select all directory atau sub-directory yang mengandung js
    files: ["**/*.{js,mjs,cjs}"], 
    // ini untuk ambil aturan js agar dipahami juga oleh eslint
    plugins: { js },
    // ini untuk masukkan aturan eslint ke js, kebalikan yg atas
    extends: ["js/recommended"],
    // ini untuk deklarasi import globals diatas, deklarasinya sesuai kebutuhan dari projeknya
    languageOptions: {
      globals: { //ini seperti kamus: berisi semua variabel global dari environment browser, Node, mocha, chai, dsb.
        ...globals.browser, //untuk file javascript yang berjalan di browser, seperti script.js
        ...globals.node, //untuk file javascript yang berjalan di node.js, seperti cypress.config.js
      },
    },
  },

// mengatur lint khusus file-file cypress
  {
    // (**/*) ini maksudnya adalah select all directory atau sub-directory dalam cypress yang mengandung js
    files: ["cypress/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,   
        ...globals.node,      
        ...globals.mocha,     // untuk variable describe, it, before, after, dll
        ...globals.chai,      // untuk variable expect, assert, should
        Cypress: "readonly",  // cypress class
        cy: "readonly",       // cy object
      },
    },
  },
]);
  
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // config lainnya...
      return config; // pastikan config dikembalikan jika dimodifikasi
    },
  },
  reporter: "junit",
  reporterOptions: {
    mochaFile: "results/cypress-results-[hash].xml",
    toConsole: false,
  },
});

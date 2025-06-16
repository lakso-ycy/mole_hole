const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080", // ✅ Perlu agar `cy.visit('/')` bisa berjalan

    setupNodeEvents(on, config) {
      // ✅ Aktifkan plugin code coverage
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },

  reporter: "junit",
  reporterOptions: {
    mochaFile: "results/cypress-results-[hash].xml",
    toConsole: false
  },
});

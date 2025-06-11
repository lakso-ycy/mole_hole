const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },
  reporter: "junit",
  reporterOptions: {
    mochaFile: "results/cypress-results-[hash].xml",
    toConsole:false,
},
});

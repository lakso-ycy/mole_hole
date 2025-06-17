const { defineConfig } = require("cypress");
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
  e2e: {
    // DI SINI tambahkan parameter on, config lalu panggil codeCoverageTask
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config); // <-- INI WAJIB
      return config;
    },
  },
  reporter: "junit",
  reporterOptions: {
    mochaFile: "results/cypress-results-[hash].xml",
    toConsole: false,
  },
});

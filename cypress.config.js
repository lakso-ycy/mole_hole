const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents() {},
  },
  reporter: "junit",
  reporterOptions: {
    mochaFile: "results/cypress-results-[hash].xml",
    toConsole:false,
},
});

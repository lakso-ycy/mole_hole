const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Konfigurasi untuk End-to-End (E2E) testing
  e2e: {
    // Kunci 'baseUrl' DIHAPUS atau DIKOMENTARI.
    // Dengan menghapus baseUrl, Cypress akan memuat file lokal secara langsung.
    // baseUrl: 'http://localhost:8080',

    setupNodeEvents(on, config) {
      // Konfigurasi ini penting untuk mengaktifkan task code coverage.
      // Pastikan Anda sudah menginstal @cypress/code-coverage
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },

  // Konfigurasi reporter untuk menghasilkan laporan hasil tes
  // dalam format JUnit XML untuk Azure DevOps.
  reporter: "junit",
  reporterOptions: {
    mochaFile: "results/cypress-results-[hash].xml",
    toConsole: false, // Set ke `true` jika ingin lihat output di terminal saat tes berjalan
  },
});

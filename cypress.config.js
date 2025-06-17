// const ini adalah konstan jadi nilainya bakal sama terus
// require ini nambah modul eksternal atau library dari cypress
const { defineConfig } = require("cypress");

// untuk baca apapun yang akan di export oleh modul cypress untuk menunjukkan hasil test
module.exports = defineConfig({
  // jenis test disini adalah test end-to-end
  e2e: {
    baseUrl: "http://localhost:8080",
    // tetap perlu di setup meskipun kosong karena default untuk deklarasi e2e test nya
    // fungsinya sebagai wadah plugin /event handler
    // plugin disini seperti mau nambah hasil coverage dll diaturnya disini
    // event handler disini task tambahan yang di deklarasikan seperti console.log("Testing dimulai..."); 
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },
  // ini adalah jenis file output yang mengeluarkan hasil test
  // ada banyak jenis lain seperti json, html, dot, mochasome, pilih sesuai kebutuhan
  // junit atau xml ini cocok dengan pipeline di azure devops karena mudah terintegrasi
  reporter: "junit",
  //
  reporterOptions: {
    // mochafile adalah jenis format atau report yang digunakan dari hasil test
    mochaFile: "results/cypress-results-[hash].xml", // ini adalah directory dan format nama filenya
    // merupakan pilihan apakah hasil test mau ditampilkan di terminal atau tidak
    toConsole:false,
},
});
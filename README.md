# mole-and-hole-game

this is a simple mole and hole a web based game built using html css js. <br/>
where you have to catch the mole, whenever you click on mole you will get points.

### Let's chase your friend in the game. LINK ASLI
https://dhruv35m.github.io/hole-and-mole-game/

### Let's chase your friend in the game. LINK FORKING MODIFY KELOMPOK 3 PSO B
https://jolly-cliff-0ae134710.6.azurestaticapps.net 

### DOCUMENTATION
https://docs.google.com/document/d/1muQ75_4PL82zoag7IrQ0igZpU4Zt5Yr5yIuV0tJnsMU/edit?usp=sharing

## 🛡️ Testing & Quality Assurance
Pipeline proyek ini secara otomatis menjalankan beberapa tahap pengujian dan analisis kualitas kode setiap kali ada perubahan kode, yaitu:

- **Linting**  
  Menggunakan ESLint dan Stylelint untuk memastikan konsistensi code style serta mendeteksi error lebih awal.

- **End-to-End (E2E) Testing**  
  Menggunakan Cypress untuk menguji fungsi aplikasi secara otomatis. Test ini memastikan seluruh fitur utama berjalan sesuai harapan.

- **Static Code Analysis (SonarQube)**  
  Semua kode dianalisis menggunakan SonarQube untuk mendeteksi bugs, code smells, dan potensi masalah keamanan. Proses ini juga menggunakan Quality Gate—build akan gagal jika terdapat issue blocker atau critical.

- **Build & Deploy Test**  
  Proses build dan deployment diuji otomatis di pipeline.

### 💻 Menjalankan Testing Secara Lokal

```bash
npm ci
npm run lint
npx cypress run
# (SonarQube bisa dijalankan via pipeline, atau lokal jika punya server SonarQube)

## 📁 Struktur Folder Cypress (Testing)

Berikut penjelasan file dan folder penting di dalam `cypress/`:

- **e2e/**
  - Berisi seluruh skenario end-to-end test.
  - `mole_and_hole.cy.js`: Test utama aplikasi, menguji fitur-fitur seperti mulai game, ganti gambar mole, skor, reset skor, dsb.
  ### 📄 Penjelasan Test Case Cypress
Setiap perubahan kode akan diuji secara otomatis menggunakan Cypress, dengan skenario sebagai berikut:

    - **Initial Load**: Mengecek apakah seluruh elemen penting (judul, input, tombol, skor) muncul dengan benar saat halaman dibuka.
    - **Validasi Nama Kosong**: Pastikan user tidak bisa memulai permainan tanpa mengisi nama, dan pesan error tampil.
    - **Pengaturan Game**: Test input nama, pilihan durasi & level, lalu memulai game dan memverifikasi perubahan UI.
    - **Skor Bertambah**: Simulasi klik pada mole dan pastikan skor bertambah.
    - **Akhir Permainan & High Score**: Setelah waktu habis, skor akhir dan high score diperbarui.
    - **Cancel Game**: Fitur membatalkan game berjalan dan memunculkan pesan pembatalan.
    - **Ganti/Hapus Gambar Mole**: Test upload & hapus gambar mole, serta pesan sukses.
    - **Reset High Score**: Test tombol reset skor dan pastikan high score kembali ke awal.
    - **Tampilan Tombol**: Mengecek label dan tampilan tombol Start serta Reset Score.

    Semua skenario di atas berjalan otomatis di pipeline untuk memastikan aplikasi selalu dalam kondisi baik.

- **fixtures/**
  - Menyimpan data statis/mock yang digunakan untuk pengujian otomatis.
  - `test-mole.png`: Gambar dummy untuk testing upload.
  - `users.json`, `profile.json`: Data user mock untuk pengujian.

- **screenshots/**
  - Otomatis terisi screenshot ketika ada test yang gagal, memudahkan debugging.

- **support/**
  - **cypress/support/commands.js**
    - Digunakan untuk menulis custom command Cypress (saat ini masih kosong).
  - **cypress/support/e2e.js**
    - File konfigurasi global untuk Cypress. Di sini, seluruh custom command diimpor dan plugin `cypress-file-upload` diaktifkan untuk mendukung fitur upload file saat testing.

- **downloads/**
  - Akan terisi file yang didownload selama pengujian jika test case melakukan download file.

  ### 📁 Struktur Folder (Aset & Dependensi)

- **img/**  
  Menyimpan aset gambar yang digunakan di game, seperti background, gambar lubang, dan karakter mole.

- **sounds/**  
  Menyimpan file suara efek (contoh: `punch.mp3`) yang dimainkan ketika user melakukan aksi tertentu, seperti memukul mole.

- **node_modules/**  
  Berisi semua library dependency aplikasi yang ter-*install* secara otomatis lewat NPM. Folder ini sangat besar dan **tidak pernah dimasukkan ke repository** (sudah ada di .gitignore).

📄 Penjelasan .gitignore
File .gitignore berfungsi untuk mengatur file/folder apa saja yang diabaikan oleh Git, sehingga tidak akan di-commit atau di-push ke repository.
Hal ini penting agar repository tetap ringan, rapi, dan hanya berisi source code atau aset penting.

Isi .gitignore pada project ini:
gitignore
Salin
# Cypress artifacts
cypress/screenshots/
cypress/videos/

# Node modules
node_modules/

# Build output
dist/
build/

# VSCode settings
.vscode/

# System files
.DS_Store
Thumbs.db
Penjelasan Setiap Baris:
cypress/screenshots/, cypress/videos/
⮞ Mengabaikan screenshot dan video otomatis hasil testing Cypress, karena ukurannya bisa besar dan hanya untuk debugging lokal.

node_modules/
⮞ Mengabaikan seluruh dependency NPM yang di-install secara otomatis. Folder ini sangat besar dan tidak perlu disimpan di repo (cukup install ulang dengan npm install).

dist/, build/
⮞ Mengabaikan hasil build/output production, agar repo hanya berisi source code.

.vscode/
⮞ Setting khusus editor VS Code (personal), tidak penting untuk semua pengguna.

.DS_Store, Thumbs.db
⮞ File sistem otomatis dari MacOS (DS_Store) dan Windows (Thumbs.db), tidak berkaitan dengan project.

Kenapa File/Folder Ini Di-ignore?
Agar repo tetap kecil dan ringan.

Dependency, hasil build, dan file sementara tidak perlu disimpan, bisa dibuat ulang kapan saja.

Memudahkan kolaborasi—developer lain cukup clone repo dan jalankan npm install untuk mendapatkan semua dependency.

Aset penting seperti gambar, suara, dan file source tetap ada di repo (tidak di-ignore).

- **.stylelintrc.json**
  - File konfigurasi Stylelint untuk memastikan seluruh kode CSS mengikuti aturan best practice. Menggunakan standar `stylelint-config-standard` agar style sheet tetap konsisten, bebas error, dan mudah dirawat.

- **azure-pipelines.yml**
  - File ini mengatur seluruh proses otomatisasi CI/CD project:
    - Pipeline akan otomatis berjalan setiap ada perubahan di branch utama.
    - Tahapan yang dilakukan:
      1. **Install dependency**, linting, dan analisis kualitas kode dengan SonarQube.
      2. **Testing otomatis** dengan Cypress (end-to-end test).
      3. **Build dan copy file hasil build** ke artifact.
      4. **Deploy** artifact ke Azure Static Web App.
    - Dengan pipeline ini, aplikasi selalu dicek kualitas dan diuji sebelum dideploy otomatis ke server.
#### 📦 Detail Tahapan Pipeline (`azure-pipelines.yml`)

1. **Build, Test, and Analyze**
   - Install dependency dengan `npm ci`
   - Lakukan linting (ESLint & Stylelint)
   - Analisa kualitas kode dengan SonarQube
   - Jalankan HTTP server lokal untuk testing
   - Lakukan E2E testing otomatis (Cypress)
   - Publish hasil test ke dashboard

2. **Staging (Prepare Artifact)**
   - Checkout source code
   - Copy semua file aplikasi ke folder staging
   - Publish artifact hasil build agar siap di-deploy

3. **Deploy ke Azure Static Web App**
   - Download artifact hasil build
   - Deploy aplikasi ke Azure Static Web App secara otomatis

- **cypress.config.js**
  - File konfigurasi utama Cypress untuk end-to-end testing.
  - Menggunakan reporter JUnit, sehingga hasil test otomatis dapat di-export dalam format XML dan dibaca oleh pipeline CI/CD (misal Azure DevOps).
  - Semua hasil test akan tersimpan di folder `results/`, siap untuk dianalisis dan dipantau oleh tim.

- **eslint.config.mjs**
  - File konfigurasi utama untuk ESLint. Memastikan seluruh kode JavaScript (baik aplikasi maupun testing) mengikuti standar penulisan yang baik.
  - Secara otomatis mengenali lingkungan browser, Node.js, dan testing (Mocha, Chai, Cypress) sehingga meminimalkan error palsu pada kode pengujian.
  - Membantu menjaga kualitas dan konsistensi seluruh kode di project.
  
- **eslint.config.mjs**
  - File konfigurasi utama untuk ESLint. Memastikan seluruh kode JavaScript (baik aplikasi maupun testing) mengikuti standar penulisan yang baik.
  - Secara otomatis mengenali lingkungan browser, Node.js, dan testing (Mocha, Chai, Cypress) sehingga meminimalkan error palsu pada kode pengujian.
  - Membantu menjaga kualitas dan konsistensi seluruh kode di project.

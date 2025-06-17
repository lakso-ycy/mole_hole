# mole-and-hole-game

Hole and Mole adalah permainan web sederhana yang terinspirasi dari game klasik "Whack-a-Mole", sebuah permainan arkade populer di mana pemain harus memukul boneka tikus tanah (mole) yang muncul secara acak dari lubang-lubang sebelum mereka menghilang kembali

# TUJUAN

Menerapkan CI/CD pipeline untuk game Hole and Mole menggunakan Azure Devops (otomasi build dan testing) dan Azure Static Web Apps (deployment) dengan kriteria:
  - Build otomatis di-trigger oleh commit ke branch main,
  - Testing otomatis dengan Cypress dan lint (coverage ≥80%),
  - Deployment tanpa downtime ke lingkungan produksi,

# PENAMBAHAN FITUR

semua penambahan fitur kita implementasikan *CRUD*
  - Kursor diubah menjadi gambar palu
  - Fitur Upload Gambar untuk target (tikus) menjadi sesuai apa yg user input
  - Fitur Highscore
  - Create Username
  - Reset score
  - Fitur Sound Effect
  - Fitur Durasi Permainan


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

## 🚀 CI/CD Pipeline Flow
Berikut rangkuman proses pipeline yang berjalan setiap ada commit atau pull request ke branch main, mengikuti urutan step di pipeline YAML:

**1. Install Node.js**
Menginstall Node.js versi yang sudah ditentukan (misal: 20.x) ke dalam environment pipeline, agar sesuai dengan versi pengembangan project.

**2. Install Dependencies**
Menggunakan perintah npm ci untuk menginstall semua dependency dari package-lock.json secara cepat dan konsisten.

**3. Fix File Permissions**
Memastikan semua file binary di node_modules/.bin dapat dieksekusi di environment Ubuntu/Linux (chmod +x).

**4. Linting (ESLint & Stylelint)**
Menjalankan npm run lint untuk melakukan pemeriksaan kualitas kode JavaScript dan CSS.
Build akan gagal jika ada error linting.

**5. Instrumentasi & Penyalinan File**
Menjalankan proses instrumentasi dengan nyc, lalu menyalin file penting ke folder instrumented untuk pengujian dan pelaporan coverage.

**6. Debug Folder Instrumented**
Mengecek isi folder instrumented untuk memastikan file sudah ter-copy dengan benar.

**7. Start HTTP Server**
Menjalankan server lokal (http-server) pada port 8080 agar aplikasi bisa diakses untuk keperluan pengujian E2E (End-to-End).

**8. Jalankan Cypress E2E Tests**
Menjalankan Cypress untuk menguji fitur aplikasi secara end-to-end secara otomatis di browser.
Semua fitur utama diuji agar tidak ada bug sebelum dideploy.

**9. Debug Coverage**
Memastikan folder coverage dan file lcov.info sudah terbentuk setelah pengujian.

**10. Publish Cypress Test Results**
Mengupload hasil tes otomatis Cypress (format JUnit XML) ke dashboard Azure DevOps agar tim bisa memantau hasil pengujian.

**11. Prepare SonarQube Analysis**
Menyiapkan konfigurasi untuk analisis kualitas kode menggunakan SonarQube (termasuk include/exclude path & coverage report).

**12. Jalankan SonarQube Analysis**
Melakukan proses analisis kode secara otomatis menggunakan SonarQube untuk mendeteksi bug, code smell, duplikasi, dan masalah keamanan.

**13. Publish SonarQube Quality Gate Result**
Mengirim hasil analisis ke dashboard SonarQube dan memastikan build fail jika Quality Gate tidak lolos.

**14. Staging - Prepare Deploy Artifact**
Semua source code, aset, dan hasil build disalin ke folder staging ($(Build.ArtifactStagingDirectory)/game-files) lalu dipublish sebagai artifact build.

**15. Publish Build Artifact**
Artifact hasil build (game-files) dipublish sebagai artifact pipeline yang siap dideploy ke production.

**16. Download Build Artifact**
Mengambil artifact hasil build dari stage sebelumnya untuk diproses lebih lanjut.

**17. Deploy to Azure Static Web App**
Artifact hasil build di-deploy otomatis ke Azure Static Web App.
Website akan selalu up-to-date setiap ada perubahan kode di branch utama.


# ERROR YANG TEMUKAN DAN SOLUSI

*NPM Tidak Dikenali di PowerShell*
  - Masalah: 'npm' is not recognized...
  - Solusi: Install Node.js + update PATH + set execution policy PowerShell.

*Linting JavaScript & CSS*
  - Masalah: Parsing error, variabel tidak dikenal, gaya penulisan salah.
  - Solusi: Gunakan npx, fokus lint .js saja, perbaiki struktur CSS dan nama keyframes.

*Error Testing Cypress*
  - Masalah: Spec tidak ditemukan, base URL gagal konek, error hanya di pipeline.
  - Solusi: Jalankan server http-server, pastikan Cypress di-root, gunakan port 8080.

*Coverage SonarQube 0%*
  - Masalah: Report coverage tidak terbaca.
  - Solusi: Jalankan Cypress sebelum Sonar, gunakan folder instrumented/, ignore folder di linting.

*SonarQube Gagal Jalan*
  - Masalah: Versi Sonar terlalu lama.
  - Solusi: Upgrade ke versi 7.
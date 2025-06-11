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


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

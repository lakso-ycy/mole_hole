describe('Mole and Hole Game Functionality', () => {
  const playerName = 'Cypress Tester';
  const defaultDuration = '20'; // Sesuai dengan tombol durasi default yang aktif di HTML Anda
  const shortDuration = '15';

  beforeEach(() => {
    cy.visit('/'); // Mengunjungi baseUrl (http://localhost:8080)
  });

  it('should load the game page with initial elements visible', () => {
    cy.get('h1').should('contain.text', 'Catch me, If you can'); //
    cy.get('#player-name').should('be.visible'); //
    cy.get('.start-btn').should('be.visible'); //
    cy.get('.cancel-btn').should('not.be.visible'); //
    cy.get('.score-block').should('contain.text', 'Score: 0'); //
    cy.get('#time-left-display').should('contain.text', defaultDuration); //
    cy.get('.levels input#easy').should('be.checked'); //
    cy.get('.mole-image-selector').should('be.visible'); //
    cy.get('.highscore-section').should('be.visible'); //
    cy.get('#highscore-display').should('contain.text', 'Belum ada skor'); //
  });

  it('should not start game if player name is empty and show message', () => {
    cy.get('.start-btn').click(); //
    cy.get('#messageBoxText').should('contain.text', 'Masukkan nama dulu ya!'); //
    cy.get('#messageBoxOverlay').should('be.visible'); //
    cy.get('#messageBoxButton').click(); //
    cy.get('#messageBoxOverlay').should('not.be.visible'); //
    cy.get('.start-btn').should('be.visible'); //
  });

  it('should allow typing player name, select duration, select level, and start the game', () => {
    cy.get('#player-name').type(playerName); //
    // Pilih durasi 15 detik
    cy.get(`.duration-btn[data-duration="${shortDuration}"]`).click(); //
    cy.get('#time-left-display').should('contain.text', shortDuration); //
    // Pilih level medium
    cy.get('#medium').click(); //
    cy.get('#medium').should('be.checked'); //

    cy.get('.start-btn').click(); //

    // Verifikasi UI setelah game dimulai
    cy.get('.start-btn').should('not.be.visible'); //
    cy.get('.cancel-btn').should('be.visible'); //
    cy.get('#player-name').should('be.disabled'); //
    cy.get('.levels').should('not.be.visible'); //
    cy.get('.duration-btn').each(($btn) => cy.wrap($btn).should('be.disabled')); //
    cy.get('#mole-image-upload').should('be.disabled'); //
    cy.get('#remove-mole-image-btn').should('be.disabled'); //
    cy.get('#countdown-area').should('be.visible'); //
    cy.get('#time-left-display').should('contain.text', shortDuration); //
  });

  it('should increase score when a mole is hit', () => {
    cy.get('#player-name').type(playerName); //
    cy.get('.start-btn').click(); //

    // Tunggu mole muncul dan klik
    // Karena kemunculan acak, kita beri timeout dan coba klik yang pertama terlihat
    cy.get('.hole.up .mole', { timeout: 10000 }).first().click({ force: true }); //

    // Verifikasi skor bertambah
    cy.get('.score-block .score').invoke('text').then(parseInt).should('be.gt', 0); //
  });

  it('should end the game when time is up and update high score', () => {
    cy.get('#player-name').type(playerName); //
    cy.get(`.duration-btn[data-duration="${shortDuration}"]`).click(); //
    cy.get('.start-btn').click(); //

    // Tunggu hingga waktu habis (durasi game + sedikit buffer)
    cy.wait((parseInt(shortDuration) * 1000) + 2000); // Tunggu durasi + 2 detik buffer

    // Verifikasi game berakhir
    cy.get('#messageBoxText').should('contain.text', `Waktu habis, ${playerName}! Skor akhir kamu:`); //
    cy.get('#messageBoxOverlay').should('be.visible'); //
    cy.get('#messageBoxButton').click(); // Tutup pesan

    cy.get('.start-btn').should('be.visible'); //
    cy.get('.cancel-btn').should('not.be.visible'); //
    cy.get('#player-name').should('not.be.disabled'); //
    cy.get('.levels').should('be.visible'); //
    cy.get('.duration-btn').each(($btn) => cy.wrap($btn).should('not.be.disabled')); //

    // Verifikasi high score diperbarui (asumsi setidaknya ada 1 skor)
    cy.get('#highscore-display').should('not.contain.text', 'Belum ada skor'); //
    cy.get('#highscore-display').should('contain.text', playerName); //
  });

  it('should allow cancelling the game', () => {
    cy.get('#player-name').type(playerName); //
    cy.get('.start-btn').click(); //
    cy.get('.cancel-btn').should('be.visible'); //

    // Tunggu sebentar agar game benar-benar berjalan
    cy.wait(1000);
    cy.get('.cancel-btn').click(); //

    // Verifikasi game dibatalkan
    cy.get('#messageBoxText').should('contain.text', `Permainan dibatalkan oleh ${playerName}. Skor tidak dicatat.`); //
    cy.get('#messageBoxOverlay').should('be.visible'); //
    cy.get('#messageBoxButton').click(); // Tutup pesan

    cy.get('.start-btn').should('be.visible'); //
    cy.get('.cancel-btn').should('not.be.visible'); //
  });

  it('should change mole image on upload and remove image', () => {
    // Upload gambar
    // Cypress tidak bisa berinteraksi langsung dengan dialog file browser asli.
    // Kita perlu 'menipu' input file dengan melampirkan file fixture.
    // Buat folder 'fixtures' di dalam folder 'cypress', lalu taruh file gambar (misal 'test-mole.png') di sana.
    cy.fixture('test-mole.png').then(fileContent => {
      cy.get('#mole-image-upload').attachFile({ //
        fileContent: fileContent.toString(),
        fileName: 'test-mole.png',
        mimeType: 'image/png'
      });
    });

    // Beri waktu untuk gambar diproses dan diterapkan
    cy.wait(500);
    // Verifikasi gambar tikus berubah (sulit diverifikasi langsung url background, tapi kita bisa cek console.log dari game Anda)
    // Untuk verifikasi yang lebih baik, Anda mungkin perlu cara lain atau memodifikasi game untuk mempermudah tes ini.
    // Di sini kita hanya memastikan tidak ada error.

    // Hapus gambar
    cy.get('#remove-mole-image-btn').click(); //
    cy.get('#messageBoxText').should('contain.text', 'Gambar tikus telah dikembalikan ke default.'); //
    cy.get('#messageBoxOverlay').should('be.visible'); //
    cy.get('#messageBoxButton').click(); //
    // Verifikasi lagi (misalnya, dengan membandingkan style background, jika memungkinkan dan konsisten)
  });


  it('should reset high scores', () => {
    // Mainkan game sekali untuk mendapatkan skor
    cy.get('#player-name').type("SkorUntukDireset"); //
    cy.get(`.duration-btn[data-duration="${shortDuration}"]`).click(); //
    cy.get('.start-btn').click(); //
    cy.wait((parseInt(shortDuration) * 1000) + 1000); // Tunggu game selesai
    cy.get('#messageBoxButton').click(); // Tutup pesan waktu habis

    // Pastikan ada skor
    cy.get('#highscore-display').should('contain.text', "SkorUntukDireset"); //

    // Klik tombol reset skor
    cy.get('#reset-scores-btn').click(); //

    // Verifikasi pesan reset
    cy.get('#messageBoxText').should('contain.text', 'Semua skor telah di-reset.'); //
    cy.get('#messageBoxOverlay').should('be.visible'); //
    cy.get('#messageBoxButton').click(); //

    // Verifikasi high score kembali ke "Belum ada skor"
    cy.get('#highscore-display').should('contain.text', 'Belum ada skor'); //
  });
});
// Select DOM elements
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector(".start-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const levelsContainer = document.querySelector(".levels");
const playerNameInput = document.getElementById("player-name");
const playerScores = {}; // Stores scores: { playerName: score }

const durationButtons = document.querySelectorAll(".duration-btn");
const timeLeftDisplay = document.getElementById("time-left-display");
const countdownArea = document.getElementById("countdown-area");

const messageBoxOverlay = document.getElementById("messageBoxOverlay");
const messageBoxText = document.getElementById("messageBoxText");
const messageBoxButton = document.getElementById("messageBoxButton");

const moleImageUpload = document.getElementById("mole-image-upload");
const removeMoleImageBtn = document.getElementById("remove-mole-image-btn");

// Default mole image URL (ensure this path is correct if you have a default image in CSS)
// const defaultMoleImageUrl = 'url("img/mole.png")'; // Not directly used if CSS handles default

let lastHole;
let timeUp = false;
let score = 0;
let countdownInterval;
let selectedDuration = 20; // Default duration: 1 minute (60 seconds)
let activeDuration = 20;
// let gameStarted = false;

document.querySelectorAll(".duration-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".duration-btn").forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    selectedDuration = parseInt(this.getAttribute("data-duration"));
    document.getElementById("time-left-display").textContent = selectedDuration;
    // Reset atau lakukan hal lain jika perlu
    updateHighScoreDisplay(); // Tampilkan highscore sesuai durasi
  });
});

/**
 * Shows a custom message box.
 * @param {string} message - The message to display.
 */
function showCustomMessage(message) {
  if (messageBoxText) {
    messageBoxText.textContent = message;
  }
  if (messageBoxOverlay) {
    messageBoxOverlay.classList.add("visible");
  }
}

function playHitSound() {
  const sound = document.getElementById("hit-sound");
  if (sound) {
    sound.pause();
    sound.currentTime = 0;  // Supaya bisa diputar ulang kalau klik cepat
    sound.play();
  }
}

// Event listener for the custom message box's OK button
if (messageBoxButton && messageBoxOverlay) {
  messageBoxButton.addEventListener("click", () => {
    messageBoxOverlay.classList.remove("visible");
  });
}

/**
 * Sets the active state for the selected duration button and updates the initial countdown display.
 * @param {HTMLElement} selectedBtn - The button element that was clicked.
 */
function setActiveDurationButton(selectedBtn) {
  document.querySelectorAll(".duration-btn").forEach((button) => {
    button.classList.remove("active");
  });
  if (selectedBtn) {
    selectedBtn.classList.add("active");
    selectedDuration = parseInt(selectedBtn.getAttribute("data-duration"));
    const timeLeftDisplay = document.getElementById("time-left-display");
    if (timeLeftDisplay) {
      timeLeftDisplay.textContent = selectedDuration;
    }
  }
}

// Add event listeners to duration buttons
durationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Allow duration change only if the game is not currently running
    if (
      startBtn.style.display === "none" &&
      cancelBtn.style.display !== "none"
    ) {
      console.log("Cannot change duration while game is in progress.");
      // Optionally show a custom message to the user
      // showCustomMessage("Tidak dapat mengubah durasi saat permainan berlangsung.");
      return;
    }
    selectedDuration = parseInt(button.dataset.duration);
    setActiveDurationButton(button);
    console.log("Durasi dipilih:", selectedDuration, "detik");
  });
});

/**
 * Gets the selected difficulty level.
 * @returns {string} The ID of the selected difficulty.
 */
function getDifficultyLevel() {
  const selectedLevel = document.querySelector('input[name="level"]:checked');
  return selectedLevel ? selectedLevel.id : "easy"; // Default to easy
}

/**
 * Generates a random time between a min and max value.
 * @param {number} min - Minimum time.
 * @param {number} max - Maximum time.
 * @returns {number} Random integer.
 */
function getRandomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Selects a random hole, ensuring it's not the same as the last one.
 * @param {NodeListOf<Element>} holesNodeList - List of hole elements.
 * @returns {Element} A random hole element.
 */
function getRandomHole(holesNodeList) {
  const index = Math.floor(Math.random() * holesNodeList.length);
  const selectedHole = holesNodeList[index];
  if (selectedHole === lastHole) {
    return getRandomHole(holesNodeList); // Try again if same hole
  }
  lastHole = selectedHole;
  return selectedHole;
}

/**
 * Makes a mole appear in a random hole.
 * @param {number} showDuration - Base duration for mole visibility.
 * @param {number} hideDuration - Base duration for mole being hidden.
 */
function makeMoleAppear(showDuration, hideDuration) {
  if (timeUp) return; // Stop if game time is up

  const hole = getRandomHole(holes);
  hole.classList.add("up"); // Mole appears
  const moleUpDuration = getRandomTime(showDuration / 1.5, showDuration * 1.2);

  setTimeout(() => {
    hole.classList.remove("up"); // Mole hides
    const moleHiddenDuration = getRandomTime(
      hideDuration / 1.5,
      hideDuration * 1.2
    );
    if (!timeUp) {
      // If game is still on, make another mole appear
      setTimeout(
        () => makeMoleAppear(showDuration, hideDuration),
        moleHiddenDuration
      );
    }
  }, moleUpDuration);
}

/**
 * Starts the game.
 */
function startGame() {
  // currentTime = selectedDuration;
  activeDuration = selectedDuration; // <- simpan durasi yang dipakai saat ini
  // gameStarted = true;
  score = 0;

  const validatedPlayerName = playerNameInput.value.trim();
  if (!validatedPlayerName) {
    showCustomMessage("Masukkan nama dulu ya!");
    return;
  }

  const difficulty = getDifficultyLevel();
  let showDuration, hideDuration;
  switch (difficulty) {
    case "easy":
      showDuration = 750;
      hideDuration = 1200;
      break;
    case "medium":
      showDuration = 500;
      hideDuration = 900;
      break;
    case "hard":
      showDuration = 300;
      hideDuration = 600;
      break;
    default: // Fallback to easy
      showDuration = 750;
      hideDuration = 1200;
  }

  console.log(
    `Game dimulai oleh: ${validatedPlayerName}, Level: ${difficulty}, Durasi: ${selectedDuration}s`
  );

  score = 0;
  if (scoreBoard) scoreBoard.textContent = score;
  timeUp = false;

  // Update UI controls
  if (cancelBtn) cancelBtn.style.display = "inline-block";
  if (startBtn) startBtn.style.display = "none";
  if (levelsContainer) levelsContainer.style.visibility = "hidden";
  if (playerNameInput) playerNameInput.disabled = true;
  durationButtons.forEach((button) => (button.disabled = true));
  if (moleImageUpload) moleImageUpload.disabled = true;
  if (removeMoleImageBtn) removeMoleImageBtn.disabled = true;

  if (countdownInterval) {
    clearInterval(countdownInterval); // Clear any existing timer
  }

  let currentTimeLeft = selectedDuration;
  if (timeLeftDisplay) {
    timeLeftDisplay.textContent = currentTimeLeft;
  }
  if (countdownArea) {
    countdownArea.style.display = "block"; // Ensure countdown area is visible
  }

  // Start the countdown timer
  countdownInterval = setInterval(() => {
    currentTimeLeft--;
    if (timeLeftDisplay) {
      timeLeftDisplay.textContent = currentTimeLeft; // Update display every second
    }
    if (currentTimeLeft < 0) {
      clearInterval(countdownInterval);
      // Game ends because time is up, pass validatedPlayerName
      endGame(validatedPlayerName, score, false);
    }
  }, 1000);

  makeMoleAppear(showDuration, hideDuration); // Start mole appearances
}

/**
 * Ends the game.
 * @param {string} nameParam - The name of the player (can be empty if cancelled with no name).
 * @param {number} scoreParam - The final score.
 * @param {boolean} isCancelled - True if the game was cancelled by the user.
 */
function endGame(nameParam, scoreParam, isCancelled = false) {
  timeUp = true;
  // gameStarted = false;
  clearInterval(countdownInterval);
  holes.forEach((hole) => hole.classList.remove("up"));

  // Determine the name to display in messages.
  // If nameParam from cancel is empty, or for general display, use "Player" as fallback.
  const displayName = nameParam.trim() || "Player";

  if (isCancelled) {
    showCustomMessage(
      `Permainan dibatalkan oleh ${displayName}. Skor tidak dicatat.`
    );
    // Score is not saved, highscore display is not updated.
  } else {
    // Game ended due to time up.
    // nameParam here is the validated name from startGame, so it MUST be non-empty.
    const actualPlayerName = nameParam.trim(); // This is the name used for saving.

    if (actualPlayerName && typeof scoreParam === "number") {
      // This condition should always be true if called from time-up scenario
      // because startGame validates the name, and score is always numeric.
      if (!playerScores[activeDuration]) {
        playerScores[activeDuration] = {};
      }
      const currentScore = playerScores[activeDuration][actualPlayerName] || 0;
      if (scoreParam > currentScore) {
        playerScores[activeDuration][actualPlayerName] = scoreParam;
      }
      updateHighScoreDisplay();
      showCustomMessage(
        `Waktu habis, ${actualPlayerName}! Skor akhir kamu: ${scoreParam}`
      );
    } else {
      // This block indicates an unexpected situation if reached when !isCancelled:
      // 1. actualPlayerName was empty (should be prevented by startGame validation).
      // 2. scoreParam was not a number (score variable should always be numeric).
      let detailedMessage = `Waktu habis, ${displayName}! `;
      detailedMessage += `Skor: ${
        typeof scoreParam === "number" ? scoreParam : "tidak valid"
      }. `;
      if (!actualPlayerName && !isCancelled) {
        // Only an issue if time ran out with no valid name
        detailedMessage += "(Nama pemain tidak valid, skor tidak disimpan).";
      } else if (typeof scoreParam !== "number" && !isCancelled) {
        detailedMessage += "(Skor tidak valid, skor tidak disimpan).";
      } else {
        detailedMessage += "(Terjadi masalah, skor mungkin tidak disimpan).";
      }
      showCustomMessage(detailedMessage);
      // Optionally, still call updateHighScoreDisplay() if you want to refresh the list
      // updateHighScoreDisplay();
    }
  }

  // Update UI controls - this is common for both cancel and time-up
  if (cancelBtn) cancelBtn.style.display = "none";
  if (startBtn) startBtn.style.display = "inline-block";
  if (levelsContainer) levelsContainer.style.visibility = "visible";
  if (playerNameInput) playerNameInput.disabled = false;
  durationButtons.forEach((button) => (button.disabled = false));
  if (moleImageUpload) moleImageUpload.disabled = false;
  if (removeMoleImageBtn) removeMoleImageBtn.disabled = false;

  // Reset countdown display to the last selected duration
  const currentActiveDurationButton = document.querySelector(
    ".duration-btn.active"
  );
  if (timeLeftDisplay && currentActiveDurationButton) {
    timeLeftDisplay.textContent = currentActiveDurationButton.dataset.duration;
  } else if (timeLeftDisplay) {
    timeLeftDisplay.textContent = selectedDuration; // Fallback
  }
}

/**
 * Handles a click on a mole.
 * @param {Event} e - The click event.
 */
function handleMoleHit(e) {
  if (!e.isTrusted || timeUp) return; // Ignore if not a trusted event or game is over
  playHitSound();
  score++;
  if (this.parentNode) {
    // 'this' is the mole div
    this.parentNode.classList.remove("up"); // Hide mole by moving hole down
  }
  if (scoreBoard) scoreBoard.textContent = score;
}

// Event listener for mole image upload
if (moleImageUpload) {
  moleImageUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const newMoleImageUrl = e.target.result;
        moles.forEach((moleEl) => {
          moleEl.style.backgroundImage = `url(${newMoleImageUrl})`;
        });
        console.log("Gambar tikus diganti!");
        moleImageUpload.value = ""; // Clear the file input
      };
      reader.readAsDataURL(file);
    } else if (file) {
      showCustomMessage("Harap pilih file gambar (misalnya .png, .jpg, .gif).");
      moleImageUpload.value = ""; // Clear invalid file
    }
  });
}

// Event listener for the "Remove Photo" button
if (removeMoleImageBtn) {
  removeMoleImageBtn.addEventListener("click", function () {
    // Allow removing image only if the game is not running
    if (
      startBtn &&
      cancelBtn &&
      startBtn.style.display === "none" &&
      cancelBtn.style.display !== "none"
    ) {
      showCustomMessage("Tidak bisa menghapus foto saat game berlangsung.");
      return;
    }
    moles.forEach((moleEl) => {
      moleEl.style.backgroundImage = ""; // Resets to CSS default
    });
    if (moleImageUpload) {
      moleImageUpload.value = ""; // Clear the file input as well
    }
    console.log("Gambar tikus dikembalikan ke default.");
    showCustomMessage("Gambar tikus telah dikembalikan ke default.");
  });
}

// Add other event listeners
moles.forEach((mole) => mole.addEventListener("click", handleMoleHit));

if (startBtn) {
  startBtn.addEventListener("click", startGame);
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    const nameAtCancelTime = playerNameInput
      ? playerNameInput.value.trim()
      : "";
    // Call endGame with isCancelled = true.
    // The current score (global variable) is passed.
    endGame(nameAtCancelTime, score, true);
  });
}

// Initialize active duration button and countdown display on page load
document.addEventListener("DOMContentLoaded", () => {
  const defaultActiveButton = document.querySelector(
    '.duration-btn[data-duration="60"]' // Default to 1 minute
  );
  if (defaultActiveButton) {
    setActiveDurationButton(defaultActiveButton);
    selectedDuration = parseInt(defaultActiveButton.dataset.duration);
    if (timeLeftDisplay) {
      timeLeftDisplay.textContent = selectedDuration;
    }
  }
  if (countdownArea) {
    countdownArea.style.display = "block";
  }
  if (cancelBtn) cancelBtn.style.display = "none";
  updateHighScoreDisplay(); // Load/display high scores if any
});

/**
 * Updates the high score display on the page.
 */
function updateHighScoreDisplay() {
  const highscoreDisplayDiv = document.getElementById("highscore-display");
  if (!highscoreDisplayDiv) return;

  const currentScores = playerScores[selectedDuration] || {};
  const sortedScores = Object.entries(currentScores).sort((a, b) => b[1] - a[1]);

  let html = "";
  sortedScores.forEach(([name, scoreVal], index) => {
    const rank = index + 1;
    let sizeClass = "";
    if (rank === 1) sizeClass = "rank-1";
    else if (rank === 2) sizeClass = "rank-2";
    else if (rank === 3) sizeClass = "rank-3";

    html += `<p class="${sizeClass}">#${rank} <strong>${name}</strong>: ${scoreVal}</p>`;
  });

  highscoreDisplayDiv.innerHTML = html || "<p>Belum ada skor</p>";
}

/**
 * Resets all player scores.
 */
function resetScores() {
  if (playerScores[selectedDuration]) {
    delete playerScores[selectedDuration]; // hanya hapus skor untuk durasi aktif
  }
  updateHighScoreDisplay(); // perbarui tampilan
  showCustomMessage(`Skor untuk durasi ${selectedDuration} detik telah di-reset.`);
}

// Event listener for the reset scores button
const resetScoresBtn = document.getElementById("reset-scores-btn");
if (resetScoresBtn) {
  resetScoresBtn.addEventListener("click", resetScores);
}

document.addEventListener('mousedown', () => {
  document.body.classList.add('hammer-hit.png');
});

document.addEventListener('mouseup', () => {
  setTimeout(() => {
    document.body.classList.remove('hammer-hit.png');
  }, 50); // ganti kecepatan animasi (ms) jika mau
});

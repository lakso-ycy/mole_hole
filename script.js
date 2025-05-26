// Select DOM elements
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole"); 
const startBtn = document.querySelector(".start-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const levelsContainer = document.querySelector(".levels");
const playerNameInput = document.getElementById("player-name");

const durationButtons = document.querySelectorAll(".duration-btn");
const timeLeftDisplay = document.getElementById("time-left-display");
const countdownArea = document.getElementById("countdown-area");

const messageBoxOverlay = document.getElementById('messageBoxOverlay');
const messageBoxText = document.getElementById('messageBoxText');
const messageBoxButton = document.getElementById('messageBoxButton');

const moleImageUpload = document.getElementById('mole-image-upload');

let lastHole;
let timeUp = false;
let score = 0;
let countdownInterval; 
let selectedDuration = 60; // Default duration: 1 minute (60 seconds)

/**
 * Shows a custom message box.
 * @param {string} message - The message to display.
 */
function showCustomMessage(message) {
  if (messageBoxText) {
    messageBoxText.textContent = message;
  }
  if (messageBoxOverlay) {
    messageBoxOverlay.classList.add('visible');
  }
}

// Event listener for the custom message box's OK button
if (messageBoxButton && messageBoxOverlay) {
  messageBoxButton.addEventListener('click', () => {
    messageBoxOverlay.classList.remove('visible');
  });
}

/**
 * Sets the active state for the selected duration button and updates the initial countdown display.
 * @param {HTMLElement} selectedBtn - The button element that was clicked.
 */
function setActiveDurationButton(selectedBtn) {
  durationButtons.forEach(button => {
    button.classList.remove("active");
  });
  if (selectedBtn) {
    selectedBtn.classList.add("active");
    if (timeLeftDisplay) { 
        timeLeftDisplay.textContent = selectedBtn.dataset.duration;
    }
  }
}

// Add event listeners to duration buttons
durationButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Allow duration change only if the game is not currently running
    if (startBtn.style.display === 'none' && cancelBtn.style.display !== 'none') {
        console.log("Cannot change duration while game is in progress.");
        return; 
    }
    selectedDuration = parseInt(button.dataset.duration);
    setActiveDurationButton(button);
    console.log("Durasi dipilih:", selectedDuration, "detik"); // Log selected duration
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
    const moleHiddenDuration = getRandomTime(hideDuration / 1.5, hideDuration * 1.2);
    if (!timeUp) { // If game is still on, make another mole appear
        setTimeout(() => makeMoleAppear(showDuration, hideDuration), moleHiddenDuration);
    }
  }, moleUpDuration);
}

/**
 * Starts the game.
 */
function startGame() {
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    showCustomMessage("Masukkan nama dulu ya!"); // "Please enter your name first!"
    return;
  }

  const difficulty = getDifficultyLevel();
  let showDuration, hideDuration;
  switch (difficulty) {
    case "easy":   showDuration = 750; hideDuration = 1200; break;
    case "medium": showDuration = 500; hideDuration = 900;  break;
    case "hard":   showDuration = 300; hideDuration = 600;  break;
    default:       showDuration = 750; hideDuration = 1200;
  }
 
  // Pop-up "Selamat bermain" sudah dihilangkan sesuai permintaan sebelumnya
  console.log(`Game dimulai oleh: ${playerName}, Level: ${difficulty}, Durasi: ${selectedDuration}s`); // Log game start

  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;

  // Update UI controls
  cancelBtn.style.display = "inline-block";
  startBtn.style.display = "none";
  levelsContainer.style.visibility = "hidden";
  playerNameInput.disabled = true;
  durationButtons.forEach(button => button.disabled = true); // Disable duration buttons
  if (moleImageUpload) moleImageUpload.disabled = true; // Disable image upload during game

  if (countdownInterval) { // Clear any existing timer
    clearInterval(countdownInterval);
  }

  let currentTimeLeft = selectedDuration;
  // Update countdown display at the start
  if (timeLeftDisplay) {
      timeLeftDisplay.textContent = currentTimeLeft;
  }
  if (countdownArea) { 
      countdownArea.style.display = 'block'; // Ensure countdown area is visible
  }

  // Start the countdown timer
  countdownInterval = setInterval(() => {
    currentTimeLeft--;
    if (timeLeftDisplay) { // Update display every second
        timeLeftDisplay.textContent = currentTimeLeft;
    }
    if (currentTimeLeft < 0) { // Time is up
      clearInterval(countdownInterval);
      endGame(playerName, score);
    }
  }, 1000);

  makeMoleAppear(showDuration, hideDuration); // Start mole appearances
}

/**
 * Ends the game.
 * @param {string} playerName - The name of the player.
 * @param {number} finalScore - The final score.
 */
function endGame(playerName, finalScore) {
  timeUp = true; // Set game over flag
  if (countdownInterval) { // Clear the game timer
     clearInterval(countdownInterval);
  }
  holes.forEach(hole => hole.classList.remove("up")); // Hide all moles

  // Display end game message
  if (playerName && typeof finalScore === 'number') {
      showCustomMessage(`Waktu habis, ${playerName}! Skor akhir kamu: ${finalScore}`); // "Time's up, {playerName}! Your final score: {finalScore}"
  } else {
      showCustomMessage("Permainan dibatalkan atau selesai."); // "Game cancelled or finished."
  }
  
  // Update UI controls
  cancelBtn.style.display = "none";
  startBtn.style.display = "inline-block";
  levelsContainer.style.visibility = "visible";
  playerNameInput.disabled = false;
  durationButtons.forEach(button => button.disabled = false); // Re-enable duration buttons
  if (moleImageUpload) moleImageUpload.disabled = false; // Re-enable image upload
  
  // Reset countdown display to the last selected duration
  const currentActiveDurationButton = document.querySelector('.duration-btn.active');
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
  if (!e.isTrusted || timeUp) return; // Ignore if not trusted or game over
  score++;
  this.parentNode.classList.remove("up"); // Hide mole
  scoreBoard.textContent = score;
}

// Event listener for mole image upload
if (moleImageUpload) {
  moleImageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) { // Check if it's an image file
      const reader = new FileReader();
      reader.onload = function(e) {
        const newMoleImageUrl = e.target.result;
        // Apply the new image to all mole elements
        moles.forEach(moleEl => {
          moleEl.style.backgroundImage = `url(${newMoleImageUrl})`;
        });
        console.log("Gambar tikus diganti!"); // Log mole image changed
      }
      reader.readAsDataURL(file); // Read the file as a data URL
    } else if (file) {
      showCustomMessage("Harap pilih file gambar (misalnya .png, .jpg, .gif)."); // "Please select an image file..."
    }
  });
}

// Add other event listeners
moles.forEach((mole) => mole.addEventListener("click", handleMoleHit));
startBtn.addEventListener("click", startGame);
cancelBtn.addEventListener("click", () => endGame());

// Initialize active duration button and countdown display on page load
document.addEventListener('DOMContentLoaded', () => {
    const defaultActiveButton = document.querySelector('.duration-btn[data-duration="60"]'); // Default to 1 minute
    if (defaultActiveButton) {
        setActiveDurationButton(defaultActiveButton);
        selectedDuration = parseInt(defaultActiveButton.dataset.duration);
        if (timeLeftDisplay) { 
            timeLeftDisplay.textContent = selectedDuration; // Initialize countdown display
        }
    }
    if (countdownArea) { // Ensure countdown area is visible on load
        countdownArea.style.display = 'block';
    }
});

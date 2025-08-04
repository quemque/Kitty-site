// Animation states
const catStates = {
  IDLE: "idle",
  WALKING: "walking",
  LYING: "lying",
  EATING: "eating",
  PETTED: "petted",
};

// Current state
let currentState = catStates.IDLE;
let catElement = document.getElementById("cat");
let currentScale = 4;

// Initialize
window.addEventListener("load", () => {
  currentState = ""; // Сбрасываем текущее состояние
  handleResize();
  animateCat(catStates.IDLE);
  setTimeout(randomBehavior, 10000);
});

// Animation frames - update paths to match your files
const animations = {
  idle: [
    "img/idle1.png",
    "img/idle2.png",
    "img/idle3.png",
    "img/idle4.png",
    "img/idle5.png",
    "img/idle6.png",
    "img/idle7.png",
    "img/idle8.png",
    "img/idle9.png",
    "img/idle10.png",
  ],
  walking: ["img/walk1.png", "img/walk2.png", "img/walk3.png", "img/walk4.png"],
  lying: ["img/lie1.png", "img/lie2.png", "img/lie3.png"],
  eating: ["img/eat1.png", "img/eat2.png", "img/eat3.png", "img/eat4.png"],
  petted: ["img/pet1.png", "img/pet2.png", "img/pet3.png"],
};

// Preload all images
function preloadImages() {
  let images = [];
  for (let state in animations) {
    animations[state].forEach((src) => {
      const img = new Image();
      img.src = src;
      images.push(img);
    });
  }
  return images;
}
preloadImages();

// Animation controller
function animateCat(state) {
  // Don't interrupt current animation if it's the same state
  if (currentState === state) return;

  currentState = state;
  let frames = animations[state];

  // Fallback to idle if no frames exist
  if (!frames || frames.length === 0) {
    frames = animations.idle;
  }

  let currentFrame = 0;

  // Clear any existing animation
  if (catElement.animationInterval) {
    clearInterval(catElement.animationInterval);
  }

  // Immediately show first frame
  catElement.style.backgroundImage = `url('${frames[0]}')`;

  // Only animate if there are multiple frames
  if (frames.length > 1) {
    catElement.animationInterval = setInterval(() => {
      currentFrame = (currentFrame + 1) % frames.length;
      catElement.style.backgroundImage = `url('${frames[currentFrame]}')`;
    }, getAnimationSpeed(state));
  }
}

// Get appropriate animation speed for each state
function getAnimationSpeed(state) {
  switch (state) {
    case catStates.WALKING:
      return 120;
    case catStates.EATING:
      return 200;
    case catStates.PETTED:
      return 150;
    default:
      return 300;
  }
}

// Handle window resize
function handleResize() {
  const baseSize = 64;
  const maxWidthScale = (window.innerWidth * 0.8) / baseSize;
  const maxHeightScale = (window.innerHeight * 0.8) / baseSize;
  currentScale = Math.min(maxWidthScale, maxHeightScale);

  // Snap to nearest 0.5 multiple for clean pixel scaling
  currentScale = Math.max(1, Math.floor(currentScale * 2)) / 2;

  document.documentElement.style.setProperty("--scale", currentScale);
}

// Click handler for petting the cat directly
catElement.addEventListener("click", () => {
  animateCat(catStates.PETTED);
  setTimeout(() => animateCat(catStates.IDLE), 1500);
});

// Feed button handler
document.querySelector(".btn-feed").addEventListener("click", () => {
  animateCat(catStates.EATING);
  setTimeout(() => animateCat(catStates.IDLE), 2000);
});

// Random behaviors
function randomBehavior() {
  if (currentState === catStates.IDLE) {
    const random = Math.random();
    if (random > 0.9) {
      animateCat(catStates.LYING);
      setTimeout(() => animateCat(catStates.IDLE), 8000);
    } else if (random > 0.7) {
      animateCat(catStates.WALKING);
      setTimeout(() => animateCat(catStates.IDLE), 4000);
    }
  }
  setTimeout(randomBehavior, 10000 + Math.random() * 10000);
}

window.addEventListener("resize", handleResize);

const hungerFill = document.querySelector(".hunger-fill");
let hunger = 0;

document.querySelector(".btn-feed").addEventListener("click", () => {
  // Animate cat
  animateCat(catStates.EATING);
  setTimeout(() => animateCat(catStates.IDLE), 2000);

  // Update hunger bar
  hunger = Math.min(100, hunger + 5);
  hungerFill.style.width = `${hunger}%`;

  // Gradually decrease hunger
  if (hungerInterval) clearInterval(hungerInterval);
  hungerInterval = setInterval(() => {
    hunger = Math.max(0, hunger - 1);
    hungerFill.style.width = `${hunger}%`;
  }, 3000);
});

let hungerInterval;

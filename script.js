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

// Animation frames (replace with your actual image paths)
const animations = {
  idle: ["idle1.png", "idle2.png", "idle3.png"],
  walking: ["walk1.png", "walk2.png", "walk3.png", "walk4.png"],
  lying: ["lie1.png", "lie2.png", "lie3.png"],
  eating: ["eat1.png", "eat2.png", "eat3.png", "eat4.png"],
  petted: ["pet1.png", "pet2.png", "pet3.png"],
};

// Animation controller
function animateCat(state) {
  currentState = state;
  let frames = animations[state];
  let currentFrame = 0;

  // Clear any existing animation
  if (catElement.animationInterval) {
    clearInterval(catElement.animationInterval);
  }

  // Set new animation
  catElement.animationInterval = setInterval(() => {
    catElement.style.backgroundImage = `url('${frames[currentFrame]}')`;
    currentFrame = (currentFrame + 1) % frames.length;
  }, 150); // Adjust timing for smoothness
}

// Interaction handlers
document.querySelector(".btn-feed").addEventListener("click", () => {
  animateCat(catStates.EATING);
  setTimeout(() => animateCat(catStates.IDLE), 2000);
});

document.querySelector(".btn-pet").addEventListener("click", () => {
  animateCat(catStates.PETTED);
  setTimeout(() => animateCat(catStates.IDLE), 1500);
});

document.querySelector(".btn-play").addEventListener("click", () => {
  animateCat(catStates.WALKING);
  setTimeout(() => animateCat(catStates.IDLE), 3000);
});

// Initialize
animateCat(catStates.IDLE);

// Random behaviors
setInterval(() => {
  if (currentState === catStates.IDLE) {
    const random = Math.random();
    if (random > 0.8) {
      animateCat(catStates.LYING);
      setTimeout(() => animateCat(catStates.IDLE), 5000);
    } else if (random > 0.6) {
      animateCat(catStates.WALKING);
      setTimeout(() => animateCat(catStates.IDLE), 3000);
    }
  }
}, 10000);

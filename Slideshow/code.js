// Array to hold the image URLs:
const images = [
  "./assets/img/tim-mossholder-jtsvyzpGXB8-unsplash.jpg",
  "./assets/img/guillermo-casales-0XYZpENm5d0-unsplash.jpg",
  "./assets/img/guillermo-casales-MXtYdifE6ck-unsplash.jpg",
  "./assets/img/guillermo-casales-Xl4uLu2kd0A-unsplash.jpg",
];

// Variable to keep track of the current slide:
let currentSlide = 0;

// Get the image element:
const slideImage = document.getElementById("slideImage");

// Function to show the current slide:
function showSlide() {
  slideImage.src = images[currentSlide];
}

// Function to change the slide:
function changeSlide(direction) {
  currentSlide += direction;

  // Wrap around to the beginning if we go past the end:
  if (currentSlide >= images.length) {
    currentSlide = 0;
  }
  // Wrap around to the end if we go before the beginning:
  if (currentSlide < 0) {
    currentSlide = images.length - 1;
  }

  showSlide();
}

// Initialize the slideshow:
showSlide();

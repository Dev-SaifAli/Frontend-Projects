// // let images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

// let images = [];
// let index = 0;

// // Fetch images
// const fetchImages = async () => {
//   const res = await fetch("https://picsum.photos/v2/list");
//   images = await res.json();
//   // const getImage = response[0].download_url;

//   console.log(images);
// };
// fetchImages();

// let imagesLength = images.length;
// console.log(imagesLength);

// document.querySelector("#next").addEventListener("click", function () {
//   index = (index + 1) % images.length;
//   document.querySelector("#slide-img").src = images[index];
//   console.log(index);
// });

// document.querySelector("#prev").addEventListener("click", function () {
//   //   index = (index - 1) % images.length;
//   index = (index - 1 + images.length) % images.length;
//   console.log("index :>> ", index);
//   document.querySelector("#slide-img").src = images[index];
// });

let currentIndex = 0;
let images=[] ;

// Fetch images and initialize carousel

const fetchImages = async () => {
  try {
    const res = await fetch("https://picsum.photos/v2/list?limit=10");
    images = await res.json();
    console.log("images :>> ", images);
    initializeCarousel();
  } catch (err) {
    console.error("Error fetching images: ", err);
  }
};


// Initialize carousel with fetched images

function initializeCarousel() {
  const track = document.querySelector(".carousel-track");
  const indicators = document.querySelector(".carousel-indicators");

  // Clear existing content
  track.innerHTML = "";
  indicators.innerHTML = "";

  // Create slides and indicators
  images.forEach((image, index) => {
    // Create slide
    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    const img = document.createElement("img");
    img.src = image.download_url;
    img.alt = `Photo by ${image.author}`;
    img.loading = "lazy";
    console.log(img);

    slide.appendChild(img);
    track.appendChild(slide);

    // Create indicator
    const indicator = document.createElement("button");
    indicator.className = `indicator ${index === 0 ? "active" : ""}`;
    indicator.addEventListener("click", () => goToSlide(index));
    indicators.appendChild(indicator);
  });

  // Add event listeners to navigation buttons
  document
    .querySelector(".carousel-btn.prev")
    .addEventListener("click", prevSlide);
  document
    .querySelector(".carousel-btn.next")
    .addEventListener("click", nextSlide);

  // Show first slide
  showSlide(0);
}

// Navigation functions
function showSlide(index) {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelector(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");

  // Update track position
  track.style.transform = `translateX(-${index * 100}%)`;

  // Update active indicator
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });

  currentIndex = index;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showSlide(currentIndex);
}

function goToSlide(index) {
  showSlide(index);
}

// Auto-advance
function startAutoAdvance() {
  setInterval(nextSlide, 5000); // change slide every 5 seconds
}

// Initialize everything when page loads 
document.addEventListener('DOMContentLoaded', ()=>{
  fetchImages();
})
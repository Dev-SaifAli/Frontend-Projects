// Fetch images
const fetchImages = async () => {
  const imageAPI = await fetch("https://picsum.photos/v2/list");
  const response = await imageAPI.json();
  const getImage = response[0].download_url;

  console.log(getImage);
};
fetchImages();

let images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];
let index = 0;

let imagesLength = images.length;
console.log(imagesLength);

document.querySelector("#next").addEventListener("click", function () {
  index = (index + 1) % images.length;
  document.querySelector("#slide-img").src = images[index];
  console.log(index);
});

document.querySelector("#prev").addEventListener("click", function () {
  //   index = (index - 1) % images.length;
  index = (index - 1 + images.length) % images.length;
  console.log("index :>> ", index);
  document.querySelector("#slide-img").src = images[index];
});

let canvas = document.getElementById("canvas");

let text = document.getElementById("text");
let colorCode = document.getElementById("colorCode");

canvas.style.backgroundColor = "#1155ff";
// -------- Random Hex code -----------------

let randomHexCode = function generateRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 0xffffff + 1).toString(16);
  return "#" + randomColor.padStart(6, "0");
};
console.log(randomHexCode());

// -------------- Hex code -------------------
function updateHexCode() {
  colorCode.textContent = randomHexCode();
}
updateHexCode();
//------------ Canvas color ------------------
function changeColor() {
  canvas.style.backgroundColor = randomHexCode();
}
changeColor();
//------------- Text Color ---------------------
function changeTextColor() {
  text.style.color = randomHexCode();
}
changeTextColor();

canvas.addEventListener("click", changeColor);
canvas.addEventListener("click", changeTextColor);
canvas.addEventListener("click", updateHexCode);

//

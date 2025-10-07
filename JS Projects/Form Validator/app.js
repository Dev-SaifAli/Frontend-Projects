let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");

let nameValidation = document.getElementById("nameValidation");
let passwordValidation = document.getElementById("passwordValidation");
let confirmValidation = document.getElementById("confirmValidation");
let emailValidation = document.getElementById("emailValidation");

let input = document.querySelectorAll("input");

// // Constructor Function
// function User(userName, userEmail, userPassword) {
//   this.user = userName;
//   this.email = userEmail;
//   this.password = userPassword;
// }

input.forEach((element) => {
  element.classList.remove("validate");
});

function checkPassword() {
  if (password.value.trim().length < 8) {
    console.log(password.value);
    passwordValidation.innerText =
      "Password should be at least 8 characters long";
    passwordValidation.style.color = "red";
  } else {
    passwordValidation.innerText = "";
    passwordValidation.style.color = "green";
    password.classList.add("validate");
  }
}

password.addEventListener("input", checkPassword);

function passwordMatched() {
  console.log("running");
  if (confirmPassword.value.trim() === password.value.trim()) {
    confirmValidation.innerText = "Password matched";
    confirmValidation.style.color = "green";
    confirmPassword.classList.add("validate");
  } else {
    confirmValidation.innerText = "Password not matched";
    confirmValidation.style.color = "red";
  }
}
confirmPassword.addEventListener("input", passwordMatched);

function verifyEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(emailRegex.test(email.value));
  if (emailRegex.test(email.value)) {
    emailValidation.innerText = "";
    emailValidation.style.color = "green";
    email.classList.add("validate");
  } else {
    emailValidation.innerText = "❌ InValid Email.";
    emailValidation.style.color = "red";
  }
}
email.addEventListener("input", verifyEmail);

function verifyName() {
  if (name.value.trim().length < 3) {
    nameValidation.innerText = "At-least 3 characters.";
    nameValidation.style.color = "red";
  } else {
    nameValidation.innerText = "";
    name.classList.add("validate");
  }
}
name.addEventListener("input", verifyName);

document.getElementById("sumbitBtn").addEventListener("click", function () {
  event.preventDefault();
});

function formDetails() {
  const myForm = document.querySelector("#form");

  // This FormData object will automatically collect all form fields
  const formData = new FormData(myForm);
  console.log(formData);

  /*The formData.entries() method returns an iterator that 
  yields key-value pairs for each form field. 
  Object.fromEntries() then transforms these pairs into a new JavaScript object,
   where the field names become the keys and their values become the corresponding value
    in the object. */
  const formObject = Object.fromEntries(formData.entries());
  console.log(formObject);
}

document.getElementById("sumbitBtn").addEventListener("click", formDetails);

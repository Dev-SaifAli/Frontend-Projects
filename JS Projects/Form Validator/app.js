let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");

let nameValidation = document.getElementById("nameValidation");
let passwordValidation = document.getElementById("passwordValidation");
let confirmValidation = document.getElementById("confirmValidation");
let emailValidation = document.getElementById("emailValidation");

let input = document.querySelectorAll("input");

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
    emailValidation.innerText = "❌ Invalid Email.";
    emailValidation.style.color = "red";
  }
}
email.addEventListener("input", verifyEmail);

function verifyName() {
  const nameRegex = /^[A-Za-z\s]{3,}$/;
  if (nameRegex.test(name.value)) {
    nameValidation.innerText = "✅ Valid";
    nameValidation.style.color = "green";
    name.classList.add("validate");
  } else {
    nameValidation.innerText = "❌ Invalid";
    nameValidation.style.color = "red";
    name.classList.remove("validate");
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

function showPassword() {
  const input = this.previousElementSibling;
  if (input.type === "password") {
    console.log(input.type);
    input.setAttribute("type", "text");
    console.log(input.type);

    this.querySelector("i").classList.add("fa-eye");
    this.querySelector("i").classList.remove("fa-eye-slash");
  } else {
    console.log("else icon");
    input.setAttribute("type", "password");
    

    this.querySelector("i").classList.remove("fa-eye");
    this.querySelector("i").classList.add("fa-eye-slash");
  }
}

document.querySelectorAll("#togglePassword").forEach((icon) => {
  icon.addEventListener("click", showPassword);
});

// password.type = number;

// document.getElementById("togglePassword").innerHTML =
//   "<i class='fa fa-eye'></i>"; we can replace it with

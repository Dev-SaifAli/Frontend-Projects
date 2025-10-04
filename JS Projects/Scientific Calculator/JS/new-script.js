// Calculator state
let expression = "";
let lastResult = "";
let memory = 0;
let angleMode = "deg"; // "deg" or "rad"
let isErrorState = false;

// DOM elements
const inputElement = document.getElementById("input");
const outputElement = document.getElementById("answer");

// Initialize calculator
document.addEventListener("DOMContentLoaded", function () {
  // Update display initially
  updateInput();
  showOutput("0");
});

// Enhanced input handling with validation
function handleInput(value) {
  if (isErrorState) {
    clearError();
  }

  const lastChar = expression.slice(-1);

  // Validation rules
  if (!validateInput(value, lastChar)) {
    return;
  }

  // ✅ Agar abhi input khali hai aur operator press hua
  if (expression === "" && ["+", "−", "×", "÷", "*", "/"].includes(value)) {
    expression = lastResult.toString() + value;
    console.log(expression);
    updateInput();
    return;
  }

  // Special handling for different input types
  switch (value) {
    case "sin⁻¹":
    case "cos⁻¹":
    case "tan⁻¹":
      expression += value.replace("⁻¹", "") + "⁻¹(";
      break;
    case "sin":
    case "cos":
    case "tan":
    case "log":
    case "ln":
      expression += value + "(";
      break;
    case "√":
      expression += "√(";
      break;
    case "π":
      expression += "π";
      break;
    case "ℇ":
      expression += "e";
      break;
    case "±":
      toggleSign();
      break;
    default:
      expression += value;
  }

  updateInput();
}

// Handle number input separately for better control
function handleNumber(num) {
  if (isErrorState) {
    clearError();
  }

  // If last result is displayed and user starts typing, clear expression
  if (expression === lastResult.toString()) {
    expression = "";
  }

  expression += num;
  updateInput();
}

// Enhanced validation function

function validateInput(value, lastChar) {
  const operators = ["+", "−", "*", "/", "×", "÷"];

  // Single operator display

  if (expression === "" && operators.includes(value)) {
    // expression = "0" + value;
    expression = lastResult + value;
    console.log(expression);
    console.log("single operator display");
    updateInput();
    return;
  }

  // Prevent consecutive operators
  if (operators.includes(lastChar) && operators.includes(value)) {
    console.log("Prevent consecutive operators");
    expression = expression.slice(0, -1) + value;
    console.log(expression);
    updateInput();
    return;
  }

  // Leading 0 replacement
  /*   \d ka matlab hai digit (0 se 9 tak koi bhi number).
      /\d/ ek regex object hai jo check karega ke string ke andar koi digit hai ya nahi.*/

  /* .test(value)

Regex ka .test() method hota hai jo true ya false return karta hai.

Agar value ek digit (0–9) hai → true.

Agar value digit nahi hai (jaise +, -, ., etc.) → false. */

  // if (expression === "3") {
  //   if (/\d/.test(value)) {
  //     // replace 0 with new digit
  //     expression = ;
  //   } else {
  //     // allow operator after 0
  //     expression += value;
  //   }
  // }

  // updateInput();

  // Decimal point validation
  if (value === ".") {
    const parts = expression.split(/[\+\-\*\/\×\÷]/);
    const currentNumber = parts[parts.length - 1] || "";
    if (currentNumber.includes(".")) {
      return false;
    }
    if (currentNumber === "" && expression !== "") {
      expression += "0";
    }
  }

  // Parentheses validation
  if (value === ")") {
    const openCount = (expression.match(/\(/g) || []).length;
    const closeCount = (expression.match(/\)/g) || []).length;
    if (openCount <= closeCount) return false;
  }

  // Auto-insert multiplication before opening parenthesis after numbers/functions
  if (value === "(" && (lastChar.match(/[0-9πe\)]/) || lastChar === "!")) {
    expression += "×";
  }

  return true;
}

// Clear error state
function clearError() {
  isErrorState = false;
  inputElement.classList.remove("error");
}

// Update input display
function updateInput() {
  if (inputElement) {
    inputElement.value = expression || "0";
  }
}

// Show output
function showOutput(value) {
  if (outputElement) {
    outputElement.value = value;
  }
}

// Clear input
function clearInput() {
  expression = "";
  updateInput();
  clearError();
}

// Clear output
function clearOutput() {
  showOutput("0");
}

// Backspace function
function backspace() {
  if (isErrorState) {
    clearError();
    expression = "";
  } else {
    expression = expression.slice(0, -1);
  }
  updateInput();

  if (expression === "") {
    showOutput("0");
  }
}

// Toggle sign
function toggleSign() {
  if (expression === "") {
    expression = "-";
  } else {
    // Find the last number in the expression
    const parts = expression.split(/([\+\-\*\/\×\÷])/);
    const lastPart = parts[parts.length - 1];

    if (lastPart.startsWith("-")) {
      parts[parts.length - 1] = lastPart.slice(1);
    } else {
      parts[parts.length - 1] = "-" + lastPart;
    }

    expression = parts.join("");
  }
  updateInput();
}

// Last answer function
function lastAnswer() {
  if (lastResult !== "") {
    expression += lastResult.toString();
    updateInput();
  }
}

// Toggle angle mode
function toggleMode(mode) {
  angleMode = mode;

  // Update UI to show current mode
  document.querySelectorAll("button[data-mode]").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.mode === mode);
  });

  showNotification(`Angle mode: ${mode.toUpperCase()}`);
}

// Enhanced evaluation function
function evaluateExpression() {
  if (!expression) {
    showOutput("0");
    return;
  }

  try {
    let processedExpr = preprocessExpression(expression);
    let result;

    // Safe evaluation
    try {
      result = Function(`"use strict"; return (${processedExpr})`)();
    } catch (e) {
      throw new Error("Invalid expression");
    }

    // Validate result
    if (!isFinite(result)) {
      throw new Error("Math Error");
    }

    if (isNaN(result)) {
      throw new Error("Invalid calculation");
    }

    lastResult = result;

    // Format result
    let formattedResult;
    if (Number.isInteger(result)) {
      formattedResult = result.toString();
    } else {
      // Remove trailing zeros and limit decimal places
      formattedResult = parseFloat(result.toFixed(10)).toString();
    }

    showOutput(formattedResult);

    // expression = formattedResult;
    // updateInput();
    clearInput();
  } catch (error) {
    handleError(error.message);
  }
}

function activeOutput() {
  outputElement.removeAttribute("disabled");
  return;
}

// Preprocess expression for evaluation
function preprocessExpression(expr) {
  return (
    expr
      // Replace visual operators
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")

      // Replace constants
      .replace(/π/g, Math.PI.toString())
      .replace(/ℇ/g, Math.E.toString())

      // Replace functions with Math equivalents
      .replace(/sin⁻¹/g, "asin")
      .replace(/cos⁻¹/g, "acos")
      .replace(/tan⁻¹/g, "atan")
      .replace(/sin/g, "sin")
      .replace(/cos/g, "cos")
      .replace(/tan/g, "tan")
      .replace(/log/g, "log10")
      .replace(/ln/g, "log")
      .replace(/√/g, "sqrt")

      // Handle degree conversion
      .replace(/(sin|cos|tan)\(/g, (match, func) => {
        return angleMode === "deg" ? `degToRad${func}(` : `Math.${func}(`;
      })
      .replace(/(asin|acos|atan)\(/g, (match, func) => {
        return angleMode === "deg"
          ? `radToDeg${func.slice(1)}($`
          : `Math.${func}(`;
      })

      // Add Math prefix to functions
      .replace(
        /(?<!degToRad|radToDeg)(sin|cos|tan|asin|acos|atan|log10|log|sqrt)\(/g,
        "Math.$1("
      )

      // Handle special cases
      .replace(/(\d+)!/g, (match, num) => `factorial(${num})`)
      .replace(/(\d+)%/g, (match, num) => `(${num}/100)`)
      .replace(/²/g, "**2")
      .replace(/³/g, "**3")
  );
}

// Error handling
function handleError(message) {
  isErrorState = true;
  inputElement.classList.add("error");
  showOutput(message);
  expression = "";
}

// Show notification
function showNotification(message) {
  // Simple notification implementation
  console.log("Calculator:", message);

  // You can enhance this with a proper UI notification
  const existingNotification = document.querySelector(
    ".calculator-notification"
  );
  if (existingNotification) {
    document.body.removeChild(existingNotification);
  }

  const notification = document.createElement("div");
  notification.className = "calculator-notification";
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 10px;
        border-radius: 4px;
        z-index: 1000;
        font-size: 14px;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 2000);
}

// Memory functions
function handleMemory(operation) {
  try {
    const currentValue = parseFloat(outputElement.value);
    if (isNaN(currentValue)) {
      throw new Error("No value to store");
    }

    switch (operation) {
      case "add":
        memory += currentValue;
        showNotification(`Added to memory: ${currentValue}`);
        break;
      case "sub":
        memory -= currentValue;
        showNotification(`Subtracted from memory: ${currentValue}`);
        break;
      case "recall":
        expression += memory.toString();
        updateInput();
        break;
    }
  } catch (error) {
    showNotification(error.message);
  }
}

// Additional mathematical functions
function factorial(n) {
  if (n < 0) throw new Error("Factorial of negative number");
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Degree/radian conversion functions
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

// Custom functions for degree handling
function degToRadsin(x) {
  return Math.sin(degToRad(x));
}
function degToRadcos(x) {
  return Math.cos(degToRad(x));
}
function degToRadtan(x) {
  return Math.tan(degToRad(x));
}
function radToDegsin(x) {
  return radToDeg(Math.asin(x));
}
function radToDegcos(x) {
  return radToDeg(Math.acos(x));
}
function radToDegtan(x) {
  return radToDeg(Math.atan(x));
}

// Keyboard support
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;

  // Prevent default for calculator keys
  if (
    "0123456789.+-*/=()".includes(key) ||
    key === "Enter" ||
    key === "Backspace"
  ) {
    event.preventDefault();
  }

  if (isErrorState) {
    clearError();
  }

  // Numbers and decimal
  if (/\d/.test(key)) {
    handleNumber(key);
  } else if (key === ".") {
    handleInput(".");
  }
  // Operators
  else if (key === "+") {
    handleInput("+");
  } else if (key === "-") {
    handleInput("−");
  } else if (key === "*") {
    handleInput("×");
  } else if (key === "/") {
    handleInput("÷");
  }
  // Equals
  else if (key === "=" || key === "Enter") {
    evaluateExpression();
    activeOutput();
  }
  // Clear
  else if (key === "Escape" || key === "c" || key === "C") {
    clearInput();
    clearOutput();
  }
  // Backspace
  else if (key === "Backspace") {
    backspace();
  }
  // Parentheses
  else if (key === "(") {
    handleInput("(");
  } else if (key === ")") {
    handleInput(")");
  }
}

// Add event listeners for buttons that need special handling
document.addEventListener("DOMContentLoaded", function () {
  // Memory buttons
  document
    .querySelector('[data-mem="add"]')
    .addEventListener("click", () => handleMemory("add"));
  document
    .querySelector('[data-mem="sub"]')
    .addEventListener("click", () => handleMemory("sub"));
  document
    .querySelector('[data-mem="recall"]')
    .addEventListener("click", () => handleMemory("recall"));

  // Evaluate button
  document.getElementById("eval").addEventListener("click", evaluateExpression);

  // Backspace button
  document.getElementById("back").addEventListener("click", backspace);

  // ANS button
  document.getElementById("ans").addEventListener("click", lastAnswer);

  // AC button
  document.getElementById("ac").addEventListener("click", () => {
    clearInput();
    clearOutput();
  });

  // ± button
  document
    .querySelector('[data-func="negate"]')
    .addEventListener("click", toggleSign);

  // % button
  document
    .querySelector('[data-func="percent"]')
    .addEventListener("click", () => {
      handleInput("%");
    });

  // RND button
  document.querySelector('[data-func="rnd"]').addEventListener("click", () => {
    const randomNum = Math.random().toFixed(4);
    handleInput(randomNum);
  });

  // EXP button
  document
    .querySelector('[data-func="expNotation"]')
    .addEventListener("click", () => {
      handleInput("e");
    });

  // Factorial button
  document
    .querySelector('[data-func="factorial"]')
    .addEventListener("click", () => {
      handleInput("!");
    });

  // Reciprocal button
  document
    .querySelector('[data-func="reciprocal"]')
    .addEventListener("click", () => {
      if (expression) {
        expression = `1/(${expression})`;
        updateInput();
      }
    });
});

// Initialize angle mode
toggleMode("deg");

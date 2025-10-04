// document.addEventListener("keydown", handleKeyPress);
// function handleKeyPress(event) {
//   const key = event.key;

//   // Check if the pressed key is a number (0-9) or a decimal point
//   if (/\d/.test(key) || key === ".") {
//     // Call a function to handle number input in your calculator logic
//     // For example:
//     handleInput(key);
//   }
//   // You can add more conditions here to handle other calculator keys
//   // like operators (+, -, *, /), Enter for equals, Backspace for delete, etc.
//   else if (
//     key === "+" ||
//     key === "-" ||
//     key === "*" ||
//     key === "/" ||
//     key === "(" ||
//     key === ")"
//   ) {
//     handleInput(key);
//   } else if (key === "Enter") {
//     handleOutput(); // directly calculate
//     handleFunction();
//     clearInput();
//     expression = "";
//   } else if (key === "Backspace") {
//     backspace();
//   }
// }

// // let userInput = [];

// // //-------------- Clear Input ---------------------
// // const clearInput = () => {
// //   document.getElementById("input").value = "";
// // };

// //-------------- Clear Output ---------------------
// // const clearOutput = () => showOutput("0");

// //-------------- Show Input ---------------------
// // let lastResult = "";

// let expression = "";
// const operators = ["+", "−", "*", "/"];

// // ✅ Handle input with validation
// const showInput = (value) => {
//   const lastChar = expression.slice(-1);

//   // 1. Empty Input Rule (if '=' pressed with nothing)
//   if (value === "=" && expression === "") {
//     expression = "0";
//     return;
//   }
//   // // 2. Prevent two operators in a row
//   // if (operators.includes(lastChar) && operators.includes(value)) {
//   //   console.log("Prevent two operators");
//   //   return; // ignore
//   // }
//   // 3. Role of operator as first input (except minus for negative numbers)
//   if (expression === "" && operators.includes(value)) {
//     expression = "0" + value;
//     console.log("Role of operator as first input");
//     document.getElementById("input").value = expression;
//     return; // ignore
//   }

//   // 4  . Handle same operators
//   if (operators.includes(lastChar) && operators.includes(value)) {
//     if (lastChar === value) {
//       console.log("// same operator → ignore");
//       // same operator → ignore
//       return;
//     } else {
//       // different operator → replace
//       expression = expression.slice(0, -1) + value;
//       console.log("// different operator → replace");
//       document.getElementById("input").value = expression;
//       return;
//     }
//   }

//   // 3. Decimal Rules
//   if (value === ".") {
//     if (expression === "") {
//       value = "0.";
//       // console.log(expression);
//       // document.getElementById("input").value = expression;
//     }
//     const parts = expression.split(/[\+\-\*\/]/);
//     const currentNumber = parts[parts.length - 1];
//     if (currentNumber.includes(".")) return; // block multiple decimals
//   }

//   // 4. Brackets
//   if (value === ")") {
//     const open = (expression.match(/\(/g) || []).length;
//     const close = (expression.match(/\)/g) || []).length;
//     if (open <= close) return; // block extra closing
//   }
//   if (value === "(") {
//     if (/[0-9)]$/.test(expression)) {
//       expression += "*"; // auto add multiplication before (
//     }
//   }

//   // 5. Special Functions (example: sin, cos, log)
//   const functions = [
//     "sin",
//     "cos",
//     "tan",
//     "log",
//     "sqrt",
//     "sin⁻¹",
//     "cos⁻¹",
//     "tan⁻¹",
//   ];
//   if (functions.includes(value)) {
//     expression += value + "(";
//     document.getElementById("input").value = expression;
//     return;
//   }

//   // 6. Backspace
//   if (value === "back") {
//     expression = expression.slice(0, -1);
//     if (expression === "") expression = "0";
//     return;
//   }

//   // 7. Division by Zero check handled at evaluation

//   // 8. Square root / factorial handled at evaluation

//   // 9. Length Limit
//   if (expression.length >= 30) return;

//   // Handle multiple operators at the same time
//   // if (operators.includes(lastChar) && operators.includes(value)) {
//   //   if (lastChar === value) {
//   //     // same operator → ignore
//   //     return;
//   //   } else {
//   //     // different operator → replace
//   //     console.log("working");
//   //     expression = expression.slice(0, -1) + value;
//   //     document.getElementById("input").value = expression;
//   //     return;
//   //   }
//   // }

//   // ✅ Default append
//   expression += value;
//   console.log(expression);
//   document.getElementById("input").value = expression;
// };

// const showOutput = (value) => {
//   document.getElementById("answer").value = value;
// };
// //-------------- Eval Function ---------------------

// const evalBtn = document.getElementById("eval"); // eval button

// //-------------- Handle Input ---------------------

// const handleInput = (input) => {
//   showInput(input);
//   // userInput.push(input);
//   // console.log(userInput);
// };
// //-------------- Handle Output ---------------------

// const handleOutput = () => {
//   let string = expression;
//   let output;
//   if (!string) {
//     showOutput("0");
//     return;
//   }
//   console.log(string);
//   try {
//     output = eval(string);
//     lastResult = output;
//     if (output === Infinity || output === -Infinity) {
//       expression = "Math Error";
//     } else if (isNaN(output)) {
//       expression = "Error";
//     } else {
//       expression = output.toString();
//     }
//   } catch (e) {
//     expression = "Error";
//   }

//   if (Number.isInteger(output)) {
//     showOutput(output);

//     // return output; // Return as is if it's an integer
//   } else {
//     output = parseFloat(output.toFixed(3)); // Fix to 3 decimal places and convert back to number
//     console.log("3");

//     showOutput(output);
//   }
// };

// // -------------- Clear expression --------------------

// // --------------- Backspace ----------------
// let backspaceBtn = document.getElementById("back");
// function backspace() {
//   expression = expression.slice(0, -1);
//   document.getElementById("input").value = expression;
// }
// backspaceBtn.addEventListener("click", backspace);

// //-------------- Last Result ----------------
// function lastAnswer() {
//   document.getElementById("answer").value = lastResult;
// }

// ans.addEventListener("click", lastAnswer);

// // ------------- Clear Output ---------------

// document.getElementById("ac").addEventListener("click", () => {
//   clearOutput();
// });

// // ---------------- Trigonometry functions -----------------

// let angleMode = "deg"; // default mode
// function toggleMode(mode) {
//   angleMode = mode; // update global mode

//   // toggle button UI
//   document.querySelectorAll("button[data-mode]").forEach((btn) => {
//     btn.classList.remove("selected");
//   });
//   document
//     .querySelector(`button[data-mode="${mode}"]`)
//     .classList.add("selected");

//   // update indicator in input field
//   let inputField = document.getElementById("input");
//   inputField.setAttribute("placeholder", `Mode: ${mode.toUpperCase()}`);
// }
// function handleFunction() {
//   let output;
//   try {
//     // let fixedExpression = expression
//     //   .replace(/sin/g, "Math.sin")
//     //   .replace(/cos/g, "Math.cos")
//     //   .replace(/tan/g, "Math.tan")
//     //   .replace(/log/g, "Math.log")
//     //   .replace(/sqrt/g, "Math.sqrt");
//     // match common functions, longer names first so 'asin' is picked before 'sin'

//     expression = expression
//       .replace(/sin⁻¹/g, "asin")
//       .replace(/cos⁻¹/g, "acos")
//       .replace(/tan⁻¹/g, "atan");

//     // Match trig + log + sqrt
//     const funcRegex = /\b(asin|acos|atan|sin|cos|tan|log|sqrt)(?=\s*\()/g;

//     // Add Math. prefix
//     let fixedExpression = expression.replace(funcRegex, "Math.$1");

//     if (angleMode === "deg") {
//       // For sin, cos, tan -> convert input to radians
//       fixedExpression = fixedExpression.replace(
//         /Math\.sin\((.*?)\)/g,
//         "Math.sin(($1) * Math.PI / 180)"
//       );
//       fixedExpression = fixedExpression.replace(
//         /Math\.cos\((.*?)\)/g,
//         "Math.cos(($1) * Math.PI / 180)"
//       );
//       fixedExpression = fixedExpression.replace(
//         /Math\.tan\((.*?)\)/g,
//         "Math.tan(($1) * Math.PI / 180)"
//       );
//     }

//     // For asin, acos, atan -> convert output from radians to degrees
//     fixedExpression = fixedExpression.replace(
//       /Math\.asin\((.*?)\)/g,
//       "(Math.asin($1) * 180 / Math.PI)"
//     );
//     fixedExpression = fixedExpression.replace(
//       /Math\.acos\((.*?)\)/g,
//       "(Math.acos($1) * 180 / Math.PI)"
//     );
//     fixedExpression = fixedExpression.replace(
//       /Math\.atan\((.*?)\)/g,
//       "(Math.atan($1) * 180 / Math.PI)"
//     );

//     console.log(fixedExpression);
//     output = eval(fixedExpression);

//     lastResult = output;

//     if (!isFinite(output)) {
//       showOutput("Math Error");
//     }
//   } catch (e) {
//     showOutput("Error");
//   }

//   if (Number.isInteger(output)) {
//     showOutput(output);
//   } else {
//     output = output.toFixed(1);
//     console.log(output);
//     showOutput(output);
//   }
// }

// // handleFunction();
// evalBtn.addEventListener("click", () => {
//   handleFunction();
//   clearInput();
//   expression = "";
// });

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  } else {
    return a / b;
  }
}

try {
  let result = divide(10, 0);
  console.log(result);
} catch (error) {
  console.error("An error occurred:", error.message);
}

document.querySelectorAll("button").forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     if (btn.dataset.num) handleNumber(btn.dataset.num);
  //     if (btn.dataset.op) handleOperator(btn.dataset.op);
  //     if (btn.dataset.func) handleFunction(btn.dataset.func);
  //     if (btn.dataset.const) handleConstant(btn.dataset.const);
  //     if (btn.dataset.mem) handleMemory(btn.dataset.mem);
  //     if (btn.dataset.mode) setAngleMode(btn.dataset.mode);
  //   });
});

let userInput = [];
//-------------- Clear  ---------------------
const clearInput = () => {
  document.getElementById("input").value = "";
  document.getElementById("answer").value = "";
};

//-------------- Show Input ---------------------

// const showInput = (value) => {
//   const lastChar = expression.slice(-1); // extract the last character

//     // 1.Prevent two operators in a row
//     if (operators.includes(lastChar) && operators.includes(value)) {
//       return;
//     }

//   // 2.Prevent operator as first input (except minus for negative numbers)
//   if (expression === "" && operators.includes(value) && value !== "−") {
//     return;
//   }
//   // 3. Prevent multiple decimals in one number
//   if (value === ".") {
//     // get the current number part (after last operator)
//     const parts = expression.split(/[\+\-\*\/]/);
//     const currentNumber = parts[parts.length - 1];
//     if (currentNumber.includes(".")) {
//       return; // ignore
//     }
//   }

//   //   4. Prevent same operator display
//   if (operators.includes(lastChar) && operators.includes(value)) {
//     if (lastChar === value) {
//       expression = expression.slice(0, -1);
//       return;
//     } else {
//       expression = expression.slice(0, -1) + value;
//       return;
//     }
//   }
//   // ✅ If all checks passed, add to expression
//   expression += value;
//   document.getElementById("input").value = expression;
// };

//-------------- Show Output ---------------------

// Assuming global operators array and expression variable

// const showInput = (value) => {
//   const lastChar = expression.slice(-1);

//   // Prevent operator as first input (except minus for negative numbers)
//   if (expression === "" && operators.includes(value) && value !== "−") {
//     return;
//   }

//   // Prevent multiple decimals in one number
//   if (value === ".") {
//     const parts = expression.split(/[\+\−\*\/]/);
//     const currentNumber = parts[parts.length - 1];
//     if (currentNumber.includes(".")) {
//       return;
//     }
//   }

//   // Prevent consecutive operators (replace if different)
//   if (operators.includes(lastChar) && operators.includes(value)) {
//     expression = expression.slice(0, -1) + value;
//   } else {
//     expression += value;
//   }

//   // Update display
//   document.getElementById("input").value = value;
// };

let expression = "";
let operators = ["+", "-", "/", "*"];

const showInput = (value) => {
  const lastChar = expression.slice(-1);

  // 1. Prevent operator as first input (except minus for negative numbers)
  if (expression === "" && operators.includes(value) && value !== "-") {
    return;
  }

  // 2. Prevent multiple decimals in one number
  if (value === ".") {
    const parts = expression.split(/[\+\-\*\/]/);
    const currentNumber = parts[parts.length - 1];
    if (currentNumber.includes(".")) {
      return;
    }
  }

  // 3. Handle operator logic
  if (operators.includes(lastChar) && operators.includes(value)) {
    if (lastChar === value) {
      // same operator → ignore
      return;
    } else {
      // different operator → replace
      expression = expression.slice(0, -1) + value;
      document.getElementById("input").value = expression;
      return;
    }
  }

  // 4. Normal case: add value
  expression += value;
  document.getElementById("input").value = expression;
};

const showOutput = (value) => {
  document.getElementById("answer").value = value;
};
//-------------- Eval Function ---------------------

const evalBtn = document.getElementById("eval"); // eval button

//-------------- Handle Input ---------------------

const handleInput = (input) => {
  showInput(input);
  userInput.push(input);
  console.log(userInput);
};
//-------------- Handle Output ---------------------

const handleOutput = () => {
  let string = expression;
  if (!string) {
    showOutput("0");
    return;
  }
  console.log(string);
  let output = eval(string);
  showOutput(output);
  //   clearInput();
};

evalBtn.addEventListener("click", handleOutput);
// --------------- Backspace ----------------
let backspaceBtn = document.getElementById("back");
function backspace() {
  expression = expression.slice(0, -1);
  document.getElementById("input").value = expression;
}
backspaceBtn.addEventListener("click", backspace);
//-----------------------

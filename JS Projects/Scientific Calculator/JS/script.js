document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.num) handleNumber(btn.dataset.num);
    if (btn.dataset.op) handleOperator(btn.dataset.op);
    if (btn.dataset.func) handleFunction(btn.dataset.func);
    if (btn.dataset.const) handleConstant(btn.dataset.const);
    if (btn.dataset.mem) handleMemory(btn.dataset.mem);
    if (btn.dataset.mode) setAngleMode(btn.dataset.mode);
  });
});

const showInput = (value) => {
  document.getElementById("input").value += value;
};

const handleInput = (input) => {
  showInput(input);
};

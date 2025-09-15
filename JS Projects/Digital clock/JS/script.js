// Helper functions
const pad2 = (n) => String(n).padStart(2, "0");
function setStatus(msg) {
  document.getElementById("status").textContent = msg;
}

(function clockModule() {
  const clock = document.getElementById("clock");
  const date = document.getElementById("date");
  const toggle24h = document.getElementById("toggle-24h");

  function updateClock() {
    const now = new Date(); // date object
    let h = now.getHours(); // method
    let m = pad2(now.getMinutes());
    let s = pad2(now.getSeconds());

    let suffix = "";
    if (!toggle24h.checked) {
      suffix = h >= 12 ? "PM" : "AM";
      h = h % 12 || h;
    }

    clock.textContent = `${pad2(h)}:${m}:${s} ${suffix}`;
    date.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  updateClock();
  setInterval(updateClock, 1000);
  toggle24h.addEventListener("change", updateClock);
})();


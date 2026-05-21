const countEl = document.querySelector("#count");
const bestScoreEl = document.querySelector("#best-score");
const incrementButton = document.querySelector("#increment");
const decrementButton = document.querySelector("#decrement");
const resetButton = document.querySelector("#reset");

let count = Number(localStorage.getItem("blueCounterCount") || "0");
let best = Number(localStorage.getItem("blueCounterBest") || "0");

function save() {
  localStorage.setItem("blueCounterCount", String(count));
  localStorage.setItem("blueCounterBest", String(best));
}

function render() {
  countEl.textContent = String(count);
  bestScoreEl.textContent = `Best ${best}`;
}

function updateCount(nextCount) {
  count = nextCount;
  if (count > best) {
    best = count;
  }
  save();
  render();
}

incrementButton.addEventListener("click", () => updateCount(count + 1));
decrementButton.addEventListener("click", () => updateCount(count - 1));
resetButton.addEventListener("click", () => updateCount(0));

render();

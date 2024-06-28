const removeButton = document.getElementById("btn-remove");
const addButton = document.getElementById("btn-add");
const counter = document.getElementById("counter");
const resetButton = document.getElementById("btn-reset");

function addToCounter() {
  const currentCounterValue = Number(counter.innerHTML);
  counter.innerHTML = `${currentCounterValue + 1}`;
}

function removeToCounter() {
  const currentCounterValue = Number(counter.innerHTML);
  if (currentCounterValue > 0) {
    counter.innerHTML = `${currentCounterValue - 1}`;
  }
}

function resetCounter() {
  counter.innerHTML = "0";
}

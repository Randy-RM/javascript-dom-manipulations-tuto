const addButton = document.getElementById("btn-add");
const removeButton = document.getElementById("btn-remove");
const resetButton = document.getElementById("btn-reset");
const counter = document.getElementById("counter");

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

addButton.addEventListener("click", addToCounter);
removeButton.addEventListener("click", removeToCounter);
resetButton.addEventListener("click", resetCounter);

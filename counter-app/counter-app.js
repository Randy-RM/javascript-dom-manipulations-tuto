const addButton = document.getElementById("add-btn");
const removeButton = document.getElementById("remove-btn");
const resetButton = document.getElementById("reset-btn");
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

const buttonRemove = document.getElementById("btn-remove");
const buttonAdd = document.getElementById("btn-add");
const counter = document.getElementById("counter");
const buttonReset = document.getElementById("btn-reset");

function addToCounter() {
  const nombre = Number(counter.innerHTML);
  counter.innerHTML = `${nombre + 1}`;
}

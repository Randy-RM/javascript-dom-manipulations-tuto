const displayToysListButton = document.getElementById("displayToysListButton");
const hideToysListButton = document.getElementById("hideToysListButton");
const toysList = document.getElementById("toysList");

function displayToysList() {
  if (toysList.style.display === "none" || toysList.style.display === "") {
    toysList.style.display = "block";
  }
}

function hideToysList() {
  if (toysList.style.display === "block" || toysList.style.display === "") {
    toysList.style.display = "none";
  }
}

displayToysListButton.addEventListener("click", displayToysList);
hideToysListButton.addEventListener("click", hideToysList);

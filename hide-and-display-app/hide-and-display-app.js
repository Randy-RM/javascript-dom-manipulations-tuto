const displayToysListButton = document.getElementById("btn-display");
const hideToysListButton = document.getElementById("btn-hide");
const toysList = document.getElementById("toys-list");

function displayToysList() {
  if (toysList.style.display === "none" || toysList.style.display === "") {
    toysList.style.display = "block";
  }
}

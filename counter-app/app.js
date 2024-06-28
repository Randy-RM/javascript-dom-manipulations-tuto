const buttonRemove = document.getElementById("btn-remove");
const buttonAdd = document.getElementById("btn-add");
const compteur = document.getElementById("compteur");
const buttonReset = document.getElementById("btn-reset");

function addToCompteur() {
  const nombre = Number(compteur.innerHTML);
  compteur.innerHTML = `${nombre + 1}`;
}

const inputTask = document.getElementById("task");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

const hasOnlySpaces = (value) => {
  return value.trim().length != 0;
};

const createDeleteButton = () => {
  const buttonDeleteTaskItem = document.createElement("button");
  const buttonDeleteText = document.createTextNode("X");
  buttonDeleteTaskItem.appendChild(buttonDeleteText);
  buttonDeleteTaskItem.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.parentElement.remove();
  });
  return buttonDeleteTaskItem;
};

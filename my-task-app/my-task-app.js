const inputTask = document.getElementById("task");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

const hasOnlySpaces = (value) => {
  return value.trim().length != 0;
};

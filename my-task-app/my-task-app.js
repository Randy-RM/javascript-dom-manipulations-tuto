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

const createTaskItem = (value) => {
  const newTaskListItem = document.createElement("li");
  const taskItemText = document.createTextNode(value.trim());
  const buttonDeleteTaskItem = createDeleteButton();
  newTaskListItem.appendChild(taskItemText);
  newTaskListItem.appendChild(buttonDeleteTaskItem);

  return newTaskListItem;
};

const addTaskItemToTaskList = () => {
  const inputTaskValue = String(inputTask.value);
  if (hasOnlySpaces(inputTaskValue)) {
    const newTaskListItem = createTaskItem(inputTaskValue);
    taskList.prepend(newTaskListItem);
  }
  inputTask.value = "";
};

// DOM Elements
const inputTask = document.getElementById("task");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// State
let editingTask = null;

// Constants
const BUTTON_CLASSES = {
  DELETE: "btn-delete",
  EDIT: "btn-edit",
  SAVE: "btn-save",
  CANCEL: "btn-cancel",
};

// Utility Functions
const hasOnlySpaces = (value) => {
  return value.trim().length === 0;
};

// Button Creation Functions
const createButton = (text, className, onClick) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
};

const createDeleteButton = (taskItem) => {
  return createButton("✕", BUTTON_CLASSES.DELETE, (event) => {
    event.preventDefault();
    taskItem.remove();
  });
};

const createEditButton = (taskItem) => {
  return createButton("✎", BUTTON_CLASSES.EDIT, (event) => {
    event.preventDefault();
    enableEditMode(taskItem);
  });
};

const createSaveButton = (taskItem, input) => {
  return createButton("✓", BUTTON_CLASSES.SAVE, (event) => {
    event.preventDefault();
    saveTask(taskItem, input);
  });
};

const createCancelButton = (taskItem, originalText) => {
  return createButton("✕", BUTTON_CLASSES.CANCEL, (event) => {
    event.preventDefault();
    cancelEdit(taskItem, originalText);
  });
};

// Edit Mode Functions
const enableEditMode = (taskItem) => {
  if (editingTask) return; // Prevent multiple edits at once

  editingTask = taskItem;
  const taskText = taskItem.querySelector(".task-text");
  const originalText = taskText.textContent;
  const buttonsContainer = taskItem.querySelector(".task-buttons");

  // Create input field
  const input = document.createElement("input");
  input.type = "text";
  input.className = "task-edit-input";
  input.value = originalText;

  // Replace text with input
  taskText.replaceWith(input);
  input.focus();
  input.select();

  // Replace buttons
  buttonsContainer.innerHTML = "";
  buttonsContainer.appendChild(createSaveButton(taskItem, input));
  buttonsContainer.appendChild(createCancelButton(taskItem, originalText));

  // Save on Enter key
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveTask(taskItem, input);
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancelEdit(taskItem, originalText);
    }
  });
};

const saveTask = (taskItem, input) => {
  const newValue = input.value.trim();

  if (hasOnlySpaces(input.value)) {
    input.focus();
    return;
  }

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = newValue;

  input.replaceWith(taskText);

  const buttonsContainer = taskItem.querySelector(".task-buttons");
  buttonsContainer.innerHTML = "";
  buttonsContainer.appendChild(createEditButton(taskItem));
  buttonsContainer.appendChild(createDeleteButton(taskItem));

  editingTask = null;
};

const cancelEdit = (taskItem, originalText) => {
  const input = taskItem.querySelector(".task-edit-input");

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = originalText;

  input.replaceWith(taskText);

  const buttonsContainer = taskItem.querySelector(".task-buttons");
  buttonsContainer.innerHTML = "";
  buttonsContainer.appendChild(createEditButton(taskItem));
  buttonsContainer.appendChild(createDeleteButton(taskItem));

  editingTask = null;
};

// Task Item Creation
const createTaskItem = (value) => {
  const newTaskListItem = document.createElement("li");
  newTaskListItem.className = "task-item";

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = value.trim();

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "task-buttons";

  buttonsContainer.appendChild(createEditButton(newTaskListItem));
  buttonsContainer.appendChild(createDeleteButton(newTaskListItem));

  newTaskListItem.appendChild(taskText);
  newTaskListItem.appendChild(buttonsContainer);

  return newTaskListItem;
};

// Add Task Function
const addTaskItemToTaskList = () => {
  const inputTaskValue = String(inputTask.value);
  if (!hasOnlySpaces(inputTaskValue)) {
    const newTaskListItem = createTaskItem(inputTaskValue);
    taskList.prepend(newTaskListItem);
    inputTask.value = "";
    inputTask.focus();
  }
};

// Event Listeners
addTaskButton.addEventListener("click", (event) => {
  event.preventDefault();
  addTaskItemToTaskList();
});

inputTask.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTaskItemToTaskList();
  }
});

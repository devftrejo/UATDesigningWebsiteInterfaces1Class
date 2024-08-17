// Strict Mode:
"use strict";

// Array to store tasks:

let tasks = [];

// Write 3 separate functions to handle the 3 distinct events:

// Function to add a new task to the tasks array:

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

// Function to toggle task completion status:

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to clear all tasks from the tasks array:

function clearTasks() {
  tasks = [];
  renderTasks();
}

// Function to render tasks:

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  // For loop to render tasks:

  // Loop through tasks array and create list items:
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    li.textContent = tasks[i].text;
    if (tasks[i].completed) {
      li.classList.add("completed");
    }
    li.addEventListener("click", () => toggleTask(i));
    taskList.appendChild(li);
  }
}

// 3 Distinct Event listeners:

// 1. Click event on the "Add Task" button to add a task:
document.getElementById("addTask").addEventListener("click", addTask);

// 2. Click event on the "Clear Tasks" button to clear all tasks:
document.getElementById("clearTasks").addEventListener("click", clearTasks);

// 3. Keypress event on the task input field to add a task:
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Call the renderTasks function to render tasks:

// Initial render:
renderTasks();

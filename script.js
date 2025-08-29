// JavaScript DOM Manipulation and Functionality

// Select DOM elements
const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("addTaskButton");
const tasksList = document.getElementById("tasks");
const clearCompletedButton = document.getElementById("clearCompletedButton");

// Function to load tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks); // Parse the JSON string back into an array
  }
  return []; // Return an empty array if no tasks are saved
}

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Convert the tasks array to a JSON string and save it
}

// Array to hold tasks, loaded from localStorage
let tasks = loadTasks();

// Function to render tasks on the page
function renderTasks() {
  tasksList.innerHTML = ""; // Clear the existing list

  // Loop through the tasks array to display each task
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(task.completed ? "completed" : "");

    li.innerHTML = `
      ${task.name}
      <button onclick="toggleCompletion(${index})">${task.completed ? "Undo" : "Complete"}</button>
      <button onclick="removeTask(${index})">Delete</button>
    `;
    tasksList.appendChild(li);
  });
}

// Function to add a new task
addTaskButton.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName) {
    tasks.push({ name: taskName, completed: false });
    taskInput.value = ""; // Clear the input field
    saveTasks(); // Save updated tasks to localStorage
    renderTasks(); // Re-render the tasks
  }
});

// Function to toggle task completion
function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks(); // Save updated tasks to localStorage
  renderTasks(); // Re-render the tasks
}

// Function to remove a task
function removeTask(index) {
  tasks.splice(index, 1); // Remove the task from the array
  saveTasks(); // Save updated tasks to localStorage
  renderTasks(); // Re-render the tasks
}

// Function to clear completed tasks
clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed); // Filter out completed tasks
  saveTasks(); // Save updated tasks to localStorage
  renderTasks(); // Re-render the tasks
});

// Initial rendering of tasks (load tasks from localStorage)
renderTasks();

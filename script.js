// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Helper: get tasks array from localStorage
  function getStoredTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  // Helper: save tasks array to localStorage
  function saveStoredTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Add a new task to the DOM and optionally save to localStorage
  // If taskText is undefined, the function reads the value from the input.
  function addTask(taskText, save = true) {
    // If no taskText passed, use the input value
    if (typeof taskText === 'undefined') {
      taskText = taskInput.value.trim();
    } else {
      taskText = String(taskText).trim();
    }

    // If empty, only alert when called interactively (save !== false)
    if (taskText === '') {
      if (save !== false) {
        alert('Please enter a task!');
      }
      return;
    }

    // Create new li element and set its textContent
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button and add class using classList.add
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Store task text on the li for reliable removal
    li.dataset.task = taskText;

    // Assign onclick event to remove the li from the DOM and update localStorage
    removeBtn.onclick = function () {
      // Remove from DOM
      if (li.parentNode === taskList) {
        taskList.removeChild(li);
      }
      // Remove from storage
      removeTask(taskText);
    };

    // Append remove button to li, then append li to taskList
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';

    // Save to localStorage if requested
    if (save) {
      const tasks = getStoredTasks();
      tasks.push(taskText);
      saveStoredTasks(tasks);
    }
  }

  // Remove the first occurrence of taskText from localStorage array
  function removeTask(taskText) {
    const tasks = getStoredTasks();
    const index = tasks.indexOf(taskText);
    if (index > -1) {
      tasks.splice(index, 1); // remove the task
      saveStoredTasks(tasks);
    }
  }

  // Load tasks from localStorage and render them (without saving again)
  function loadTasks() {
    const storedTasks = getStoredTasks();
    storedTasks.forEach(task => addTask(task, false)); // pass false to avoid re-saving
  }

  // Event listeners
  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Initialize app by loading saved tasks
  loadTasks();
});



// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // get input and trim spaces

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create new li
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Add onclick to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append remove button to li
        li.appendChild(removeBtn);

        // Append li to task list
        taskList.appendChild(li);

        // Clear the input
        taskInput.value = "";
    }

    // Add event listener for button click
    addButton.addEventListener('click', addTask);

    // Add event listener for pressing Enter
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});


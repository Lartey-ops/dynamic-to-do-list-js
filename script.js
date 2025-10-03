// Run the script after the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            // Create <li> and set text
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.className = "remove-btn";

            // On click, remove the li
            removeBtn.onclick = function () {
                taskList.removeChild(li);
            };

            // Append remove button to li, then li to list
            li.appendChild(removeBtn);
            taskList.appendChild(li);

            // Clear input
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }

    // Add button click event
    addButton.addEventListener('click', addTask);

    // Add task on pressing Enter
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

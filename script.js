// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            // Create <li> for the task
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create Remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.className = "remove-btn"; // no classList.add used

            // When clicked, remove the task
            removeBtn.onclick = function () {
                taskList.removeChild(li);
            };

            // Put button inside li, then add li to task list
            li.appendChild(removeBtn);
            taskList.appendChild(li);

            // Clear input
            taskInput.value = "";
        }
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on pressing Enter
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task."); // Alert if input is empty
        } else {
            // Create <li> for the task
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create Remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.classList.add('remove-btn'); // ✅ using classList.add

            // Remove task on click
            removeBtn.onclick = function () {
                taskList.removeChild(li);
            };

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

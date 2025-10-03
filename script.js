// script.js
// To-Do List with Local Storage
document.addEventListener('DOMContentLoaded', function () {
  // DOM references
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // In-memory tasks array (keeps sync with localStorage)
  let tasks = [];

  /**
   * Save tasks array to localStorage
   */
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  /**
   * Create a DOM li element for a task and append to the list.
   * If save === true, the task will be stored in localStorage.
   *
   * @param {string} taskText - The text of the task to add
   * @param {boolean} save - Whether to save this task to localStorage
   */
  function addTask(taskText = null, save = true) {
    // If taskText not provided, take from input
    if (taskText === null) {
      taskText = taskInput.value.trim();
    } else {
      taskText = String(taskText).trim();
    }

    // If called by user (save === true) and empty, alert
    if (save && taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // If taskText empty (e.g., provided empty by load) do nothing
    if (taskText === '') return;

    // Create list item structure:
    // <li><span class="task-text">taskText</span><button class="remove-btn">Remove</button></li>
    const li = document.createElement('li');

    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;
    // Optional: allow styling the task text
    textSpan.classList.add('task-text');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn'); // use classList.add as required

    // Remove handler - uses addEventListener (not onclick)
    removeBtn.addEventListener('click', function () {
      // Remove li from DOM
      if (li.parentNode === taskList) {
        taskList.removeChild(li);
      }

      // Remove from tasks array (removes first matching occurrence)
      const index = tasks.indexOf(taskText);
      if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks();
      }
    });

    // Append elements and add to DOM
    li.appendChild(textSpan);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // If save is true, persist to localStorage
    if (save) {
      tasks.push(taskText);
      saveTasks();
    }

    // Clear input field for user entries
    if (save) taskInput.value = '';
  }

  /**
   * Load tasks from localStorage and render them.
   * Calls addTask(taskText, false) to avoid re-saving while loading.
   */
  function loadTasks() {
    try {
      const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
      if (Array.isArray(stored)) {
        tasks = stored.slice(); // copy into in-memory array
        stored.forEach(taskText => addTask(taskText, false));
      } else {
        tasks = [];
      }
    } catch (err) {
      // If parsing fails, clear storage and reset tasks
      console.error('Failed to parse tasks from localStorage:', err);
      tasks = [];
      localStorage.removeItem('tasks');
    }
  }

  // Event listeners
  addButton.addEventListener('click', function () {
    addTask(null, true); // user-triggered add; read from input and save
  });

  // Allow adding by pressing Enter inside the input
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask(null, true);
    }
  });

  // Initial load
  loadTasks();
});

// Get references to the DOM elements
const todoInput = document.getElementById('todo-input');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

// Load existing tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks from localStorage
function renderTasks() {
    todoList.innerHTML = '';  // Clear the list before rendering
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);
        
        // Create task text
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('toggle');
        taskText.addEventListener('click', () => toggleCompletion(index));

        // Create delete button
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', () => deleteTask(index));

        // Append elements to the list item
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        todoInput.value = ''; // Clear input field
        saveTasks();
        renderTasks();
    }
}

// Toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding tasks
addTaskBtn.addEventListener('click', addTask);

// Event listener for pressing Enter key in the input field
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render of tasks
renderTasks();

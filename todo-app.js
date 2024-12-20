// Task list array
let tasks = [];

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const description = taskInput.value.trim();
    if (description) {
        const newTask = {
            id: Date.now(),
            description: description,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        taskInput.value = '';
        renderTasks();
        showNotification('Task added successfully');
    }
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    showNotification('Task deleted successfully');
}

// Function to toggle task completion
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        showNotification(task.completed ? 'Task marked as completed' : 'Task marked as incomplete');
    }
}

// Function to list all tasks
function listTasks() {
    const output = document.getElementById('output');
    if (tasks.length === 0) {
        output.textContent = 'No tasks found.';
    } else {
        output.innerHTML = '<h3>Tasks:</h3>' + tasks.map(task => 
            `<div>${task.id}. [${task.completed ? '✓' : ' '}] ${task.description}</div>`
        ).join('');
    }
}

// Function to display menu and handle user input
function showMenu() {
    const menu = `
        <h3>To-Do List Menu</h3>
        <button onclick="handleUserInput('1')">Add Task</button>
        <button onclick="handleUserInput('2')">Delete Task</button>
        <button onclick="handleUserInput('3')">List Tasks</button>
        <button onclick="handleUserInput('4')">Exit Menu</button>
    `;
    const output = document.getElementById('output');
    output.innerHTML = menu;
}

// Function to handle user input
function handleUserInput(choice) {
    const output = document.getElementById('output');

    switch (choice) {
        case '1':
            output.innerHTML = '<h3>Add New Task</h3><input type="text" id="newTaskInput"><button onclick="addTaskFromMenu()">Add</button>';
            break;
        case '2':
            output.innerHTML = '<h3>Delete Task</h3><input type="text" id="deleteTaskInput" placeholder="Enter task ID"><button onclick="deleteTaskFromMenu()">Delete</button>';
            break;
        case '3':
            listTasks();
            break;
        case '4':
            output.innerHTML = '<h3>Menu closed</h3>';
            break;
        default:
            output.textContent = 'Invalid choice. Please try again.';
            showMenu();
    }
}

// Function to add task from menu
function addTaskFromMenu() {
    const description = document.getElementById('newTaskInput').value.trim();
    if (description) {
        const newTask = {
            id: Date.now(),
            description: description,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        showNotification('Task added successfully');
        showMenu();
    }
}

// Function to delete task from menu
function deleteTaskFromMenu() {
    const id = parseInt(document.getElementById('deleteTaskInput').value);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveTasks();
        renderTasks();
        showNotification('Task deleted successfully');
    } else {
        showNotification('Task not found', 'error');
    }
    showMenu();
}

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
                ${task.description}
            </span>
            <div>
                <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Function to show notification
function showNotification(message, type = 'success') {
    const output = document.getElementById('output');
    output.innerHTML = `<div class="notification ${type}">${message}</div>`;
    setTimeout(() => {
        output.innerHTML = '';
    }, 3000);
}

// Main function to run the application
function main() {
    loadTasks();
    renderTasks();
    showNotification('Welcome to the Enhanced To-Do List Manager!');
}

// Run the application when the page loads
window.onload = main;


// Load tasks when page opens

window.onload = function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
};

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") return;

    createTaskElement(taskText, false);

    saveTask(taskText, false);

    input.value = "";
}

// Create task element
function createTaskElement(taskText, completed) {
    let li = document.createElement("li");
    li.textContent = taskText;

    if (completed) {
        li.style.textDecoration = "line-through";
    }

    li.onclick = function () {
        li.style.textDecoration =
            li.style.textDecoration === "line-through"
                ? "none"
                : "line-through";

        updateTasks();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.onclick = function () {
        li.remove();
        updateTasks();
    };

    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

// Save new task
function saveTask(taskText, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({ text: taskText, completed: completed });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update all tasks (after delete or complete)
function updateTasks() {
    let listItems = document.querySelectorAll("#taskList li");
    let tasks = [];

    listItems.forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.style.textDecoration === "line-through"
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
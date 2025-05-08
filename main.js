// get elements
let title = document.getElementById("title");
let task = document.getElementById("task");
let submit = document.getElementById("submit");
let tasksContainer = document.querySelector(".todolist");

// load tasks on page load
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => renderTask(task.title, task.description));

// function to render task to the DOM
function renderTask(titleValue, taskValue) {
    let newTask = document.createElement("div");
    newTask.classList.add("todotask");

    let newTaskTitle = document.createElement("h2");
    newTaskTitle.innerText = titleValue;

    let newTaskDescription = document.createElement("p");
    newTaskDescription.innerText = taskValue;

    let newTaskDelete = document.createElement("button");
    newTaskDelete.innerText = "Delete";
    newTaskDelete.classList.add("deletebtn");

    newTask.appendChild(newTaskTitle);
    newTask.appendChild(newTaskDescription);
    newTask.appendChild(newTaskDelete);
    tasksContainer.appendChild(newTask);

    // delete task
    newTaskDelete.addEventListener("click", function () {
        newTask.remove();
        tasks = tasks.filter(t => t.title !== titleValue);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
}

// handle submit
submit.addEventListener("click", function () {
    let titleValue = title.value.trim();
    let taskValue = task.value.trim();

    if (titleValue === "" || taskValue === "") {
        alert("Please fill in all fields");
        return;
    }

    // optional: prevent duplicate titles
    if (tasks.some(t => t.title === titleValue)) {
        alert("Task title already exists");
        return;
    }

    // save to localStorage
    tasks.push({ title: titleValue, description: taskValue });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // render to DOM
    renderTask(titleValue, taskValue);

    // clear inputs
    title.value = "";
    task.value = "";
});

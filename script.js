document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

        storedTasks.forEach(taskText => addTask(taskText, false)); 
        // 'false' ensures that we don't save duplicates while loading from Local Storage
    }

    // Function to save tasks to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Trim and prevent adding empty tasks
        taskText = taskText.trim();
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create new list item (li)
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Add event listener to remove button
        removeButton.addEventListener("click", function () {
            taskList.removeChild(listItem);
            removeTask(taskText); // Remove from Local Storage
        });

        // Append remove button to list item
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save to Local Storage if necessary
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            storedTasks.push(taskText);
            saveTasks(storedTasks);
        }

        // Clear input field after adding task
        taskInput.value = "";
    }

    // Function to remove a task from Local Storage
    function removeTask(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

        // Remove the task from the array
        storedTasks = storedTasks.filter(task => task !== taskText);

        // Save the updated list back to Local Storage
        saveTasks(storedTasks);
    }

    // Attach event listeners
    addButton.addEventListener("click", () => addTask(taskInput.value)); // Click event for button

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
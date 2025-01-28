// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a new task
    function addTask() {
        // Get and trim input value
        const taskText = taskInput.value.trim();

        // Prevent adding empty tasks
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
        });

        // Append remove button to list item
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear input field after adding task
        taskInput.value = "";
    }

    // Attach event listeners
    addButton.addEventListener("click", addTask); // Click event for button

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

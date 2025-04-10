// Add Task Function with Due Date
function addTask() {
  const taskText = taskInput.value.trim(); // Get the input value
  const dueDate = document.getElementById("dueDate").value; // Get the due date value

  if (taskText !== "" && dueDate !== "") {
    const li = document.createElement('li'); // Create new list item
    li.innerHTML = `${taskText} <span class="dueDate">${dueDate}</span> <button class="deleteBtn">Delete</button>`; // Add task and due date

    // Check if the due date is passed, and apply overdue class if so
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    if (dueDateObj < currentDate) {
      li.classList.add('overdue');
    }

    // Add click event to mark task as completed
    li.addEventListener('click', () => {
      li.classList.toggle('completed'); // Toggle the "completed" class
    });

    // Add delete functionality
    const deleteButton = li.querySelector('.deleteBtn');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the click from marking it as completed
      li.remove(); // Remove the task when delete button is clicked
    });

    // Append the new task to the list
    taskList.appendChild(li);

    // Clear the input fields after adding the task
    taskInput.value = "";
    document.getElementById("dueDate").value = ""; // Clear the due date field
  } else {
    alert("Please enter both task and due date.");
  }
}

// Sort Tasks by Due Date
function sortTasks() {
  const tasks = Array.from(taskList.children); // Get all task list items
  tasks.sort((a, b) => {
    const dateA = new Date(a.querySelector('.dueDate').textContent);
    const dateB = new Date(b.querySelector('.dueDate').textContent);
    return dateA - dateB; // Sort in ascending order (earliest due date first)
  });

  // Re-append tasks in the correct order
  tasks.forEach(task => taskList.appendChild(task));
}

const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

console.log(addTaskButton);

addTaskButton.addEventListener('click', addTask);

taskList.addEventListener('click', toggleTaskComplete);
taskList.addEventListener('click', editTask);
taskList.addEventListener('click', deleteTask);

let completeIcon = '<ion-icon name="checkmark-done-outline"></ion-icon>';
let editIcon = '<ion-icon name="create-outline"></ion-icon>';
let saveIcon = '<ion-icon name="save"></ion-icon>';
let deleteIcon = '<ion-icon name="close-circle-outline"></ion-icon>';

// Load tasks from localStorage when the page loads
window.addEventListener('load', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTaskToDOM(task);
  });
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      // Create a task object
      const task = { text: taskText, completed: false };
  
      // Add the task to localStorage
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      // Add the task to the DOM
      addTaskToDOM(task);
  
      taskInput.value = '';
    }
  }
  
  function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="text" value="${task.text}" ${task.completed ? 'disabled' : ''} id="${task.text}"/>
      <div className="buttons">
        <button class="complete-button">${completeIcon}</button>
        <button class="edit-button">${editIcon}</button>
        <button class="delete-button">${deleteIcon}</button>
      </div>
    `;
  
    // Apply the "completed" class to the task if it's completed
    if (task.completed) {
      const taskInput = li.querySelector('input');
      taskInput.classList.add('completed');
    }
  
    taskList.appendChild(li);
  }
  
  function toggleTaskComplete(e) {
    if (e.target.classList.contains('complete-button')) {
      const taskText = e.target.parentElement.parentElement.querySelector('input');
      taskText.classList.toggle('completed');
  
      // Update the completed status in localStorage
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const taskIndex = tasks.findIndex(task => task.text === taskText.value);
      if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  }
  
  function deleteTask(e) {
    if (e.target.classList.contains('delete-button')) {
      const listItem = e.target.parentElement.parentElement;
      taskList.removeChild(listItem);
  
      // Remove the task from localStorage
      const taskText = listItem.querySelector('input').value;
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = tasks.filter(task => task.text !== taskText);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  }
  
  function editTask(e) {
    if (e.target.classList.contains('edit-button')) {
      const parentInput = e.target.parentElement.parentElement.firstElementChild;
      if (parentInput.disabled) {
        parentInput.disabled = false;
        e.target.innerHTML = saveIcon;
      } else {
        parentInput.disabled = true;
        e.target.innerHTML = editIcon;
  
        // Update the text in localStorage
        const taskId = parentInput.id;
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.text === taskId);
        if (taskIndex !== -1) {
          tasks[taskIndex].text = parentInput.value;
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      }
    }
  }
  
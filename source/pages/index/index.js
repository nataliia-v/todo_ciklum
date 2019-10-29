// import createMenu from '../../components/menu/menu';
import createHeader from '../../components/header/header';
import filters from '../../components/filters/filters';
import modal from '../../components/modalWindow/modalWindow';

// import todoItems from '../../components/todoItem/todoItem';
import './index.scss';
import 'normalize.css';
// let menu = createMenu(['Главная','Блог'], 'menu');
let header = createHeader(['TODOList'], 'header');

// <div class="disable-modal" id="backdrop"></div>
const backdrop = document.createElement('div');
backdrop.className = 'disable-modal';
backdrop.id = 'backdrop';

document.body.appendChild(header);
document.body.appendChild(filters());
document.body.appendChild(backdrop);
document.body.appendChild(modal());

// это нужно разнести по файлам
////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('newTodoItem').addEventListener('submit', saveTodoItem);

function saveTodoItem(e) {

  // Get form values
  let titleTodo = document.getElementById('title').value;
  let descriptionTodo = document.getElementById('description').value;
  let priorityOptions = document.querySelector('.options');
  let optionsArr = Array.from(priorityOptions);

  let todoItem = {
    title: titleTodo,
    description: descriptionTodo,
    priority: '',
    id: `f${ (+new Date).toString(16) }`,
    status: true,
  };

  optionsArr.forEach((el) => {
    if (el.selected === true) {
      todoItem.priority = el.value;
    }
  });

  if (localStorage.getItem('todos') === null) {
    let todoItems = [];
    todoItems.push(todoItem);
    localStorage.setItem('todos', JSON.stringify(todoItems));
    console.log(localStorage);
  } else {
    let todoItems = JSON.parse(localStorage.getItem('todos'));
    todoItems.push(todoItem);
    localStorage.setItem('todos', JSON.stringify(todoItems));
    console.log(localStorage);
  }

  // Clear form
  document.getElementById('newTodoItem').reset();

  // Re-fetch todos
  fetchTodos();

  // Prevent form from submitting
  e.preventDefault();
}

// Fetch todos
function fetchTodos(){
  let todoItems = JSON.parse(localStorage.getItem('todos'));

  let tableContainer = document.getElementById('todos-table-container');
  let oldTableBody = document.getElementById('tableBody');

  tableContainer.removeChild(oldTableBody);
  let newTableBody = document.createElement('span');
  newTableBody.id = 'tableBody';

  tableContainer.appendChild(newTableBody);

  if (todoItems) {
    todoItems.forEach((el) => {

      let currentRow = document.createElement('div');
      let currentTitleTodo = document.createElement('div');
      let currentDescription = document.createElement('div');
      let currentPriority = document.createElement('div');
      let currentStatusBtn = document.createElement('div');
      let currentEditBtn = document.createElement('div');
      let currentDeleteBtn = document.createElement('div');

      currentRow.id = el.id;

      currentStatusBtn.className = 'status-btn';
      currentRow.className = 'todoItem';
      currentEditBtn.className = 'edit-btn';
      currentDeleteBtn.className = 'delete-btn';
      currentTitleTodo.className = 'title-todo';
      currentDescription.className = 'description-todo';
      currentPriority.className = 'priority';

      currentTitleTodo.innerHTML = el.title;
      currentDescription.innerHTML = el.description;
      currentDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>';
      currentPriority.innerHTML = el.priority;

      currentRow.appendChild(currentTitleTodo);
      currentRow.appendChild(currentDescription);
      currentRow.appendChild(currentPriority);
      currentRow.appendChild(currentStatusBtn);
      currentRow.appendChild(currentEditBtn);
      currentRow.appendChild(currentDeleteBtn);

      newTableBody.appendChild(currentRow);
    });
  }

  let deleteBtns = document.querySelectorAll('.delete-btn');

  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', ($event) => {

      let currentId = $event.target.parentElement.parentElement.id;
      let todoItems = JSON.parse(localStorage.getItem('todos'));

      for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id === currentId) {
          todoItems.splice(i, 1);
        }
      }

      localStorage.setItem('todos', JSON.stringify(todoItems));
      fetchTodos();
    });

  }
}
fetchTodos();

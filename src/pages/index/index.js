// import createMenu from '../../components/menu/menu';
import createHeader from '../../components/header/header';
import filters from '../../components/filters/filters';
import modal from '../../components/modalWindow/modalWindow';
import searchByInput from '../../components/filters/searchByInput';
import filterByPriority from '../../components/filters/filterByPriority';

// import todoItems from '../../components/todoItem/todoItem';
import './index.scss';
import 'normalize.css';

// let menu = createMenu(['Главная','Блог'], 'menu');
const header = createHeader(['TODOList'], 'header');

// <div class="disable-modal" id="backdrop"></div>
const backdrop = document.createElement('div');
backdrop.className = 'disable-modal';
backdrop.id = 'backdrop';

document.body.appendChild(header);
document.body.appendChild(filters());
document.body.appendChild(backdrop);
document.body.appendChild(modal());

// searchByInput  - it's a first filter
searchByInput();

// searchByPriority  - it's a second filter

filterByPriority();

// это нужно разнести по файлам
// //////////////////////////////////////////////////////////////////////////////////////////

// Fetch todos

function fetchTodos() {
  const todoItems = JSON.parse(localStorage.getItem('todos'));

  const tableContainer = document.getElementById('todos-table-container');
  const oldTableBody = document.getElementById('tableBody');

  tableContainer.removeChild(oldTableBody);
  const newTableBody = document.createElement('ul');
  newTableBody.id = 'tableBody';

  tableContainer.appendChild(newTableBody);

  if (todoItems) {
    todoItems.forEach(el => {
      const currentRow = document.createElement('li');
      const currentTitleTodo = document.createElement('h3');
      const currentDescription = document.createElement('div');
      const currentPriority = document.createElement('span');
      const currentStatusBtn = document.createElement('div');
      const currentEditBtn = document.createElement('div');
      const currentDeleteBtn = document.createElement('div');
      // let toggleInput = document.createElement('input');

      currentRow.id = el.id;
      // toggleInput.type = 'text';

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
      // currentRow.appendChild(toggleInput);
      currentRow.appendChild(currentEditBtn);
      currentRow.appendChild(currentDeleteBtn);

      newTableBody.appendChild(currentRow);
    });
  }
  // /Delete todos (in fetchTodos. I can't do it in other function because I have NodeList, and addEventListener don't work with NodeList)

  const deleteBtns = document.querySelectorAll('.delete-btn');

  for (let i = 0; i < deleteBtns.length; i += 1) {
    deleteBtns[i].addEventListener('click', $event => {
      const currentId = $event.target.parentElement.parentElement.id;
      // const todoItems = JSON.parse(localStorage.getItem('todos'));

      for (let item = 0; item < todoItems.length; item += 1) {
        if (todoItems[item].id === currentId) {
          todoItems.splice(item, 1);
        }
      }

      localStorage.setItem('todos', JSON.stringify(todoItems));

      fetchTodos();
    });
  }

  // Edit an existing task.
  // let editBtns = document.querySelectorAll('.edit-btn');
  //
  //
  // for (let i = 0; i < deleteBtns.length; i++) {
  //   editBtns[i].addEventListener('click', ($event) => {
  //
  //     // let currentTodoText = $event.target.parentElement.parentElement.children[1].textContent;
  //     // let todoItems = JSON.parse(localStorage.getItem('todos'));
  //     let listItem = $event.target.parentNode;
  //     let editInput=listItem.querySelector('input[type=text]');
  //     let label = document.querySelector(".title-todo");
  //     let containsClass=listItem.classList.contains("todoItem");
  //     console.log(label);
  //
  //     console.log(listItem);
  //
  //     if(containsClass){
  //
  //       //switch to .editmode
  //       //label becomes the inputs value.
  //       label.innerText=editInput.value;
  //     }else{
  //       editInput.value=label.innerText;
  //     }
  //
  //     //toggle .editmode on the parent.
  //     listItem.classList.toggle("todoItem");
  //
  //
  //     // for (let i = 0; i < todoItems.length; i++) {
  //     //
  //     // }
  //
  //     // localStorage.setItem('todos', JSON.stringify(todoItems));
  //     fetchTodos();
  //   });
  // }
}

function saveTodoItem(e) {
  // Get form values
  const titleTodo = document.getElementById('title').value;
  const descriptionTodo = document.getElementById('description').value;
  const priorityOptions = document.querySelector('.options');
  const optionsArr = Array.from(priorityOptions);

  const todoItem = {
    title: titleTodo,
    description: descriptionTodo,
    priority: '',
    id: `f${(+new Date()).toString(16)}`,
    status: false,
  };

  optionsArr.forEach(el => {
    if (el.selected === true) {
      todoItem.priority = el.value;
    }
  });

  // if(!validateForm(titleTodo, descriptionTodo)){
  //   return false;
  // }

  if (localStorage.getItem('todos') === null) {
    const todoItems = [];
    todoItems.push(todoItem);
    localStorage.setItem('todos', JSON.stringify(todoItems));
    console.log(localStorage);
  } else {
    const todoItems = JSON.parse(localStorage.getItem('todos'));
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

document.getElementById('newTodoItem').addEventListener('submit', saveTodoItem);

// function validateForm(title, description) {
//   if (!title || !description) {
//     alert('Please fill in the form');
//     return false;
//   }
// }

fetchTodos();

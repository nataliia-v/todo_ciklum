// import createMenu from '../../components/menu/menu';
import createHeader from '../../components/header/header';
import filters from '../../components/filters/filters';
import modalWindow from '../../components/modalWindow/modalWindow';
import searchByInput from '../../components/filters/searchByInput';
import filterByPriority from '../../components/filters/filterByPriority';

import saveTodoItem from '../../components/todoItem/saveTodoItem';

// import todoItems from '../../components/todoItem/todoItem';
// import deleteItem from '../../components/todoItem/deleteItem';
import './index.scss';
import 'normalize.css';

// let menu = createMenu(['Главная','Блог'], 'menu');
const header = createHeader(['TODOList'], 'header');

document.body.appendChild(header);
document.body.appendChild(filters());
document.body.appendChild(modalWindow());

// searchByInput  - it's a first filter
searchByInput();

// searchByPriority  - it's a second filter

filterByPriority();

// это нужно разнести по файлам
// //////////////////////////////////////////////////////////////////////////////////////////

// Fetch todos

export default function fetchTodos() {
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
      const btnsWrap = document.createElement('span');
      const dotsBtn = document.createElement('span');

      const container = document.createElement('div');
      container.className = 'container';

      dotsBtn.className = 'dots-btn';
      dotsBtn.innerHTML = '...';
      btnsWrap.className = 'btns-wrap';
      btnsWrap.setAttribute('visibility-wrap', 'false');

      currentRow.id = el.id;

      currentStatusBtn.className = 'status-btn';
      currentRow.className = 'todoItem';
      currentTitleTodo.className = 'title-todo';
      currentDescription.className = 'description-todo';
      currentPriority.className = 'priority';

      currentTitleTodo.innerHTML = el.title;
      currentDescription.innerHTML = el.description;
      currentPriority.innerHTML = el.priority;

      if (el.status) {
        currentRow.className = 'todoItem done';
        const icon = document.createElement('div');
        icon.className = 'icon-wrap';
        icon.innerHTML = '<i class="far fa-check-square"></i>';
        currentRow.appendChild(icon);
      }

      container.appendChild(currentPriority);
      container.appendChild(dotsBtn);

      currentRow.appendChild(currentTitleTodo);
      currentRow.appendChild(currentDescription);
      currentRow.appendChild(currentStatusBtn);
      currentRow.appendChild(container);
      currentRow.appendChild(btnsWrap);

      newTableBody.appendChild(currentRow);
    });
  }

  // /всплывающие кнопки при нажатии на троеточие done edit delete
  const dots = document.querySelectorAll('.dots-btn');
  const btnsWrap = document.querySelectorAll('.btns-wrap');

  for (let i = 0; i < dots.length; i += 1) {
    dots[i].addEventListener('click', () => {
      // btnsWrap.setAttribute('visibility-wrap', 'true');
      dots[i].innerHTML = 'close';

      const doneItem = document.createElement('div');
      const editItem = document.createElement('div');
      const deleteItem = document.createElement('div');

      doneItem.className = 'done-btn';
      editItem.className = 'edit-btn';
      deleteItem.className = 'delete-btn';

      doneItem.innerHTML = 'done';
      editItem.innerHTML = 'edit';
      deleteItem.innerHTML = 'delete';

      btnsWrap[i].appendChild(doneItem);
      btnsWrap[i].appendChild(editItem);
      btnsWrap[i].appendChild(deleteItem);

      // Delete todo

      const deleteBtns = document.querySelectorAll('.delete-btn');

      for (let el = 0; el < deleteBtns.length; el += 1) {
        deleteBtns[el].addEventListener('click', $event => {
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

      // Done todo

      const doneBtns = document.querySelectorAll('.done-btn');
      for (let index = 0; index < doneBtns.length; index += 1) {
        doneBtns[index].addEventListener('click', $event => {
          const currentId = $event.target.parentElement.parentElement.id;
          // const todoItems = JSON.parse(localStorage.getItem('todos'));

          for (let item = 0; item < todoItems.length; item += 1) {
            if (todoItems[item].id === currentId) {
              todoItems[item].status = 'true';
            }
          }
          localStorage.setItem('todos', JSON.stringify(todoItems));

          fetchTodos();
        });
      }
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

document.getElementById('newTodoItem').addEventListener('submit', () => saveTodoItem(fetchTodos));

fetchTodos();

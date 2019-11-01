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
const modal = document.getElementById('myModal');

document.body.appendChild(header);
document.body.appendChild(filters());
document.body.appendChild(modalWindow());

// searchByInput  - it's a first filter
searchByInput();

// filterByPriority  - it's a third filter

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

      // hidden inputs

      const editTitleInput = document.createElement('input');
      const editDescriptionTextarea = document.createElement('textarea');

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
      editTitleInput.className = 'edit-title-todo';
      editDescriptionTextarea.className = 'edit-description-todo';
      currentDescription.className = 'description-todo';
      currentPriority.className = 'priority';

      currentTitleTodo.innerHTML = el.title;
      currentDescription.innerHTML = el.description;
      currentPriority.innerHTML = el.priority;

      editTitleInput.style.display = 'none';
      editDescriptionTextarea.style.display = 'none';

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
      currentRow.appendChild(editTitleInput);
      currentRow.appendChild(editDescriptionTextarea);
      currentRow.appendChild(currentDescription);
      currentRow.appendChild(currentStatusBtn);
      currentRow.appendChild(container);
      currentRow.appendChild(btnsWrap);

      newTableBody.appendChild(currentRow);
    });
  }

  // всплывающие кнопки при нажатии на троеточие done edit delete
  const dots = document.querySelectorAll('.dots-btn');
  const btnsWrap = document.querySelectorAll('.btns-wrap');

  for (let i = 0; i < dots.length; i += 1) {
    dots[i].addEventListener('click', () => {
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

      dots[i].addEventListener('click', () => {
        btnsWrap[i].style.display = 'none';
        dots[i].innerHTML = '...';
        fetchTodos();
      });

      // Delete todo

      const deleteBtns = document.querySelectorAll('.delete-btn');

      for (let el = 0; el < deleteBtns.length; el += 1) {
        deleteBtns[el].addEventListener('click', $event => {
          const currentId = $event.target.parentElement.parentElement.id;

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

      // Edit todo
      const editBtns = document.querySelectorAll('.edit-btn');

      for (let el = 0; el < editBtns.length; el += 1) {
        editBtns[el].addEventListener('click', $event => {
          editBtns[el].innerHTML = 'save changes';
          const currentId = $event.target.parentElement.parentElement.id;
          const currentTodoItem = $event.target.parentElement.parentElement;

          let titleInput = '';
          let title = '';
          let descriptionTextarea = '';
          let description = '';

          const collection = currentTodoItem.childNodes;
          collection.forEach(item => {
            switch (item.className) {
              case 'edit-title-todo':
                titleInput = item;
                break;
              case 'title-todo':
                title = item;
                break;
              case 'edit-description-todo':
                descriptionTextarea = item;
                break;
              case 'description-todo':
                description = item;
                break;
              default:
                return collection;
            }
            return true;
          });

          title.style.display = 'none';
          titleInput.style.display = 'block';
          description.style.display = 'none';
          descriptionTextarea.style.display = 'block';

          editBtns[el].addEventListener('click', () => {
            for (let item = 0; item < todoItems.length; item += 1) {
              if (todoItems[item].id === currentId) {
                todoItems[item].title = titleInput.value;
                todoItems[item].description = descriptionTextarea.value;

                localStorage.setItem('todos', JSON.stringify(todoItems));
              }
            }
            fetchTodos();
          });
        });
      }
    });
  }
}

// modal window cancel or submit
// cancel
document.getElementById('cancelModalBtn').addEventListener('click', () => {
  modal.style.display = 'none';
});
// submit
document.getElementById('submitModalBtn').addEventListener('click', () => saveTodoItem(fetchTodos));

fetchTodos();

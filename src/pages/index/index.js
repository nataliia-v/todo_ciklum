import createHeaderOrFooter from '../../components/headerFooter';
import filters from '../../components/filters/filters';
import modalWindow from '../../components/modalWindow/modalWindow';

import onChangeFilters from '../../components/filters/onChangeFilters';
import saveTodoItem from '../../components/todoItem/saveTodoItem';

// import todoItems from '../../components/todoItem/todoItem';
// import deleteItem from '../../components/todoItem/deleteItem';
import './index.scss';
import 'normalize.css';

const header = createHeaderOrFooter(['TODOList'], 'header');
const footer = createHeaderOrFooter(['Nataliia Verbenska'], 'footer');
const modal = document.getElementById('myModal');

document.body.appendChild(header);
document.body.appendChild(filters());
document.body.appendChild(modalWindow());
document.body.appendChild(footer);

// это нужно разнести по файлам
// //////////////////////////////////////////////////////////////////////////////////////////

const resetFilters = () => {
  localStorage.removeItem('filters');
};

resetFilters();

// Fetch todos

export default function fetchTodos() {
  const todoItems = JSON.parse(localStorage.getItem('todos'));
  const selectedFilters = JSON.parse(localStorage.getItem('filters')) || {};

  console.log('selectedFilters', selectedFilters);

  const tableContainer = document.getElementById('todos-table-container');
  const oldTableBody = document.getElementById('tableBody');

  tableContainer.removeChild(oldTableBody);
  const newTableBody = document.createElement('ul');
  newTableBody.id = 'tableBody';

  tableContainer.appendChild(newTableBody);

  const filtersToApply = Object.keys(selectedFilters).filter(
    filterKey => selectedFilters[filterKey],
  );

  const filteredTodoItems = Object.values(selectedFilters).some(Boolean)
    ? todoItems.filter(item => {
        return filtersToApply.every(filterName => {
          switch (filterName) {
            case 'search':
              return new RegExp(selectedFilters.search, 'i').test(item.title);
            case 'status': {
              if (selectedFilters.status === 'All') return true;
              if (selectedFilters.status === 'Open') return item.status === false;
              if (selectedFilters.status === 'Done') return item.status === true;
              break;
            }
            case 'priority':
              if (selectedFilters.priority === 'All') return true;

              return item.priority === selectedFilters.priority;
            default:
              return true;
          }
        });
      })
    : todoItems;

  if (todoItems) {
    filteredTodoItems.forEach(el => {
      const currentRow = document.createElement('li');
      const currentTitleTodo = document.createElement('h3');
      const currentDescription = document.createElement('div');
      const currentPriority = document.createElement('span');
      const currentStatusBtn = document.createElement('div');
      const btnsWrap = document.createElement('span');
      const dotsBtn = document.createElement('span');
      const editTitleInput = document.createElement('input');
      const editDescriptionTextarea = document.createElement('input');
      const container = document.createElement('div');

      currentRow.id = el.id;

      container.className = 'container';
      dotsBtn.className = 'dots-btn';
      btnsWrap.className = 'btns-wrap';
      currentStatusBtn.className = 'status-btn';
      currentRow.className = 'todoItem';
      currentTitleTodo.className = 'title-todo';
      editTitleInput.className = 'edit-title-todo';
      editDescriptionTextarea.className = 'edit-description-todo';
      currentDescription.className = 'description-todo';
      currentPriority.className = 'priority';

      dotsBtn.innerHTML = '...';
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
              todoItems[item].status = true;
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

          /* eslint-disable */
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
          /* eslint-enable */

          title.style.display = 'none';
          titleInput.style.display = 'block';
          description.style.display = 'none';
          descriptionTextarea.style.display = 'block';

          titleInput.setAttribute('value', title.textContent);
          descriptionTextarea.setAttribute('value', description.textContent);

          const editButton = editBtns[el];

          editButton.addEventListener('click', () => {
            const todoItem = todoItems.find(item => item.id === currentId);

            todoItem.title = titleInput.value;
            todoItem.description = descriptionTextarea.value;

            const updatedTodoItems = todoItems.map(item => {
              const isCurrentItem = item.id === currentId;
              /* eslint-disable */
              return isCurrentItem
                ? {
                    ...item,
                    title: titleInput.value,
                    description: descriptionTextarea.value,
                  }
                : item;
              /* eslint-enable */
            });

            localStorage.setItem('todos', JSON.stringify(updatedTodoItems));

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

onChangeFilters(fetchTodos);

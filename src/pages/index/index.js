import createHeaderOrFooter from '../../components/headerFooter';
import filters from '../../components/filters/filters';
import modalWindow from '../../components/modalWindow/modalWindow';
import onChangeFilters from '../../components/filters/onChangeFilters';
import saveTodoItem from '../../components/todoItem/saveTodoItem';
import editStatusItem from '../../components/todoItem/editStatusItem';
import deleteItem from '../../components/todoItem/deleteItem';

import './index.scss';
import 'normalize.css';
import editContentItem from '../../components/todoItem/editContentItem';
import createTodoItem from '../../components/todoItem/createTodoItem';

const header = createHeaderOrFooter(['TODOList'], 'header');
const footer = createHeaderOrFooter(['Nataliia Verbenska'], 'footer');
const modal = document.getElementById('myModal');
const container = document.getElementById('container');

container.appendChild(header);
container.appendChild(filters());
container.appendChild(modalWindow());
container.appendChild(footer);

const resetFilters = () => {
  localStorage.removeItem('filters');
};

resetFilters();

// Fetch todos

export default function fetchTodos() {
  const todoItems = JSON.parse(localStorage.getItem('todos'));
  const selectedFilters = JSON.parse(localStorage.getItem('filters')) || {};

  const filtersToApply = Object.keys(selectedFilters).filter(
    filterKey => selectedFilters[filterKey],
  );

  const filteredTodoItems = Object.values(selectedFilters).some(Boolean)
    ? todoItems.filter(item => {
        /* eslint-disable */
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

  createTodoItem(filteredTodoItems);

  // create buttons after 'click' on 3dots button  (done edit delete)
  const dots = document.querySelectorAll('.dots-btn');
  const btnsWrap = document.querySelectorAll('.btns-wrap');

  for (let i = 0; i < dots.length; i += 1) {
    dots[i].addEventListener('click', () => {
      dots[i].innerHTML = 'close';

      const doneItem = document.createElement('div');
      const editItem = document.createElement('div');
      const delItem = document.createElement('div');

      doneItem.className = 'done-btn';
      editItem.className = 'edit-btn';
      delItem.className = 'delete-btn';

      doneItem.innerHTML = 'done';
      editItem.innerHTML = 'edit';
      delItem.innerHTML = 'delete';

      btnsWrap[i].appendChild(doneItem);
      btnsWrap[i].appendChild(editItem);
      btnsWrap[i].appendChild(delItem);

      dots[i].addEventListener('click', () => {
        btnsWrap[i].style.display = 'none';
        dots[i].innerHTML = '...';
        fetchTodos();
      });

      // Delete todo
      deleteItem(fetchTodos);

      // editStatus todo
      editStatusItem(fetchTodos);

      // EditContent todo
      editContentItem(fetchTodos);
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

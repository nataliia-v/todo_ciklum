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

const buttonClearLS = document.createElement('button');
buttonClearLS.id = 'clearBtn';
buttonClearLS.textContent = 'Clear Local Storage';

document.body.appendChild(header);
document.body.appendChild(filters());
document.body.appendChild(backdrop);
document.body.appendChild(modal());
document.body.appendChild(buttonClearLS);

// let clearBtn = document.getElementById('clearBtn');
// console.log(clearBtn);

// document.body.appendChild(todoItems);

// это нужно разнести по файлам
const tableKey = 'todo-table';

let clearBtn = document.getElementById('clearBtn');
console.log(clearBtn);

clearBtn.addEventListener('click', () => {
  localStorage.removeItem(tableKey);
});

let todoTable;

let todoTableDemo = [
  {
    title: 'coffee',
    description: 'make the coffee',
    priority: 'high',
    status: 'open',
  },
  {
    title: 'work',
    description: 'work 3 hours',
    priority: 'high',
    status: 'open',
  },
];

let refreshDOMTable = () => {
  todoTable = todoTableDemo;

  let todoTitles = todoTableDemo.map((el) => el.title);
  let tableContainer = document.getElementById('todos-table-container');
  let oldTableBody = document.getElementById('tableBody');

  tableContainer.removeChild(oldTableBody);
  let newTableBody = document.createElement('span');
  newTableBody.id = 'tableBody';

  tableContainer.appendChild(newTableBody);

  for (let i = 0; i < todoTitles.length; i++) {
    let currentRow = document.createElement('div');
    let currentTitleTodo = document.createElement('div');
    let currentDescription = document.createElement('div');
    let currentPriority = document.createElement('div');
    let currentStatusBtn = document.createElement('div');
    let currentEditBtn = document.createElement('div');
    let currentDeleteBtn = document.createElement('div');

    currentStatusBtn.className = 'status-btn';
    currentEditBtn.className = 'edit-btn';
    currentDeleteBtn.className = 'delete-btn';

    currentTitleTodo.innerHTML = todoTitles[i];
    currentDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>';

    currentRow.appendChild(currentTitleTodo);
    currentRow.appendChild(currentDescription);
    currentRow.appendChild(currentPriority);
    currentRow.appendChild(currentStatusBtn);
    currentRow.appendChild(currentEditBtn);
    currentRow.appendChild(currentDeleteBtn);

    newTableBody.appendChild(currentRow);
  }
  let enableDisableNewTodoModal = (option) => {

    let newTitleTodo = document.getElementById('title');
    let newDescriptionTodo = document.getElementById('description');
    // дописать уровень

    newTitleTodo.value = '';
    newDescriptionTodo.value = '';
    // дописать уровень

    let newTodoItem = document.getElementById('newTodoItem');
    let backdrop = document.getElementById('backdrop');

    newTodoItem.className = `${option}-modal`;
    backdrop.className = `${option}-modal`;
  };

  let addNewEntryBtn = document.getElementById('addNewTodo');
  let editBtns = document.getElementsByClassName('edit-btn');
  let deleteBtns = document.getElementsByClassName('delete-btn');

  let newTodoSubmitBtn = document.getElementById('submitModalBtn');
  let newTodoCancelBtn = document.getElementById('cancelModalBtn');

  newTodoSubmitBtn.addEventListener('click', () => {

    let newTitleTodo = document.getElementById('title').value.trim();
    let newDescriptionTodo = document.getElementById('description').value.trim();
    // дописать уровень

    if (newTitleTodo === '') {
      newTitleTodo.className = 'input-err';
    } else {
      newTitleTodo.className = '';
    } if (newDescriptionTodo === '') {
      newDescriptionTodo.className = 'input-err';
    } else {
      newDescriptionTodo.className = '';
    } if (newTitleTodo !== '' && newDescriptionTodo !== '') {
      let newTodo = [];
      todoTable = {
        title: newTitleTodo,
        description: newDescriptionTodo,
        priority: 'high',
        status: 'open',
      };
      localStorage.setItem(tableKey, JSON.stringify(todoTable));
      enableDisableNewTodoModal('disable');
      refreshDOMTable();
    }
  });

  newTodoCancelBtn.addEventListener('click', () => {
    enableDisableNewTodoModal('disable');
  });

  addNewEntryBtn.addEventListener('click', () => {
    enableDisableNewTodoModal('enable');
  });

};

refreshDOMTable();

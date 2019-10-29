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

// let clearBtn = document.getElementById('clearBtn');
// console.log(clearBtn);

// document.body.appendChild(todoItems);

// это нужно разнести по файлам
////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('newTodoItem').addEventListener('submit', saveTodoItem);

function saveTodoItem(e) {

  e.preventDefault();
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

}









//////////////////////////////////////////////////////////////////////////////////////////
// let refreshDOMTable = () => {
//   todoTable = todoTableDemo;
//
//   let todoTitles = todoTableDemo.map((el) => el.title);
//   let tableContainer = document.getElementById('todos-table-container');
//   let oldTableBody = document.getElementById('tableBody');
//
//   tableContainer.removeChild(oldTableBody);
//   let newTableBody = document.createElement('span');
//   newTableBody.id = 'tableBody';
//
//   tableContainer.appendChild(newTableBody);
//
//   for (let i = 0; i < todoTitles.length; i++) {
//     let currentRow = document.createElement('div');
//     let currentTitleTodo = document.createElement('div');
//     let currentDescription = document.createElement('div');
//     let currentPriority = document.createElement('div');
//     let currentStatusBtn = document.createElement('div');
//     let currentEditBtn = document.createElement('div');
//     let currentDeleteBtn = document.createElement('div');
//
//     currentStatusBtn.className = 'status-btn';
//     currentEditBtn.className = 'edit-btn';
//     currentDeleteBtn.className = 'delete-btn';
//
//     currentTitleTodo.innerHTML = todoTitles[i];
//     currentDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
//     currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>';
//
//     currentRow.appendChild(currentTitleTodo);
//     currentRow.appendChild(currentDescription);
//     currentRow.appendChild(currentPriority);
//     currentRow.appendChild(currentStatusBtn);
//     currentRow.appendChild(currentEditBtn);
//     currentRow.appendChild(currentDeleteBtn);
//
//     newTableBody.appendChild(currentRow);
//   }
//   let enableDisableNewTodoModal = (option) => {
//
//     let newTitleTodo = document.getElementById('title');
//     let newDescriptionTodo = document.getElementById('description');
//     // дописать уровень
//
//     newTitleTodo.value = '';
//     newDescriptionTodo.value = '';
//     // дописать уровень
//
//     let newTodoItem = document.getElementById('newTodoItem');
//     let backdrop = document.getElementById('backdrop');
//
//     newTodoItem.className = `${option}-modal`;
//     backdrop.className = `${option}-modal`;
//   };
//
//   let addNewEntryBtn = document.getElementById('addNewTodo');
//   let editBtns = document.getElementsByClassName('edit-btn');
//   let deleteBtns = document.getElementsByClassName('delete-btn');
//
//   let newTodoSubmitBtn = document.getElementById('submitModalBtn');
//   let newTodoCancelBtn = document.getElementById('cancelModalBtn');
//
//   newTodoSubmitBtn.addEventListener('click', () => {
//
//     let newTitleTodo = document.getElementById('title').value.trim();
//     let newDescriptionTodo = document.getElementById('description').value.trim();
//     // дописать уровень
//
//     if (newTitleTodo === '') {
//       newTitleTodo.className = 'input-err';
//     } else {
//       newTitleTodo.className = '';
//     } if (newDescriptionTodo === '') {
//       newDescriptionTodo.className = 'input-err';
//     } else {
//       newDescriptionTodo.className = '';
//     } if (newTitleTodo !== '' && newDescriptionTodo !== '') {
//       let newTodo = [];
//       todoTable = {
//         title: newTitleTodo,
//         description: newDescriptionTodo,
//         priority: 'high',
//         status: 'open',
//       };
//       localStorage.setItem(tableKey, JSON.stringify(todoTable));
//       enableDisableNewTodoModal('disable');
//       refreshDOMTable();
//     }
//   });
//
//   newTodoCancelBtn.addEventListener('click', () => {
//     enableDisableNewTodoModal('disable');
//   });
//
//   addNewEntryBtn.addEventListener('click', () => {
//     enableDisableNewTodoModal('enable');
//   });
//
// };
//
// refreshDOMTable();

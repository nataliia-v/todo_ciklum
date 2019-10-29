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

  // e.preventDefault();
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

function deleteCurrentTodoItem(id) {

  // Get todoItems from localStorage
  let todoItems = JSON.parse(localStorage.getItem('todos'));
  // Loop through the todoItems
  for(let i =0; i < todoItems.length; i++){
    if(todoItems[i].id === id){
      // Remove from array
      todoItems.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(todoItems));

  // Re-fetch todoItems
  fetchTodos();

  // let deleteBtns = document.querySelectorAll('.delete-btn');
  // for (let i = 0; i < deleteBtns.length; i++) {
  //   deleteBtns[i].addEventListener('click', ($event) => {
  //
  //     let currentId = $event.target.parentElement.parentElement.id;
  //     let todoItems = JSON.parse(localStorage.getItem('todos'));
  //
  //     for (let i = 0; i < todoItems.length; i++) {
  //       if (todoItems[i].id === currentId) {
  //         todoItems.splice(i, 1);
  //       }
  //     }
  //     localStorage.setItem('todos', JSON.stringify(todoItems));
  //     refreshDOMTable();
  //   });
  //
  // }

}


// Fetch bookmarks
function fetchTodos(){

  let todoItems = JSON.parse(localStorage.getItem('todos'));
  let tableContainer = document.getElementById('todos-table-container');
  let tableBody = document.getElementById('tableBody');

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

      tableBody.appendChild(currentRow);
    });




    // // Get todoItems from localStorage
    // let todoItems = JSON.parse(localStorage.getItem('todos'));
    // // Loop through the todoItems
    // for(let i =0; i < todoItems.length; i++){
    //   if(todoItems[i].id === id){
    //     // Remove from array
    //     todoItems.splice(i, 1);
    //   }
    // }
    // // Re-set back to localStorage
    // localStorage.setItem('bookmarks', JSON.stringify(todoItems));
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


  // tableBody.innerHTML = '';
  // for (let i = 0; i < todoItems.length; i++) {
  //   let title = todoItems[i].title;
  //   let description = todoItems[i].description;
  //   let option = todoItems[i].option;
  //   let id = todoItems[i].id;
  //
  //   tableBody.innerHTML += '<div class="well">'+
  //   '<h3>'+title+
  //   '<div>\''+description+'\</div>'+
  //   '<button onclick="deleteCurrentTodoItem(\''+id+'\')" class="btn btn-danger">Delete</button>' +
  //   '</h3>'+
  //
  //   '</div>';
  // }

  // // Get bookmarks from localStorage
  // var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // // Get output id
  // var bookmarksResults = document.getElementById('bookmarksResults');
  //
  // // Build output
  // bookmarksResults.innerHTML = '';
  // for(var i = 0; i < bookmarks.length; i++){
  //   var name = bookmarks[i].name;
  //   var url = bookmarks[i].url;
  //
  //   bookmarksResults.innerHTML += '<div class="well">'+
  //       '<h3>'+name+
  //       ' <a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
  //       ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
  //       '</h3>'+
  //       '</div>';
  // }
  // fetchTodos();
}
fetchTodos();











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

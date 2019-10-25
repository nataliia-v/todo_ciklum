import './filters.scss';

const array1 = ['all', 'open', 'done'];
const array2 = ['all', 'high', 'normal', 'low'];

//Search todo-item by title

const titleFilter = () => {
  let filter = document.createElement('div'); // is a node
  const name = "<input type=\"text\" placeholder=\"search by title\">";
  filter.innerHTML = name;
  return filter;
};

//Filter todo-item by status or priority;

const selectOption = (array, className) => {
  let filterStatus = document.createElement('select');
  filterStatus.className = className;
  let filterParameters = '';
  array.forEach(function (item) {
    filterParameters += '<option>' + item + '</option>';
  });
  filterStatus.innerHTML = filterParameters;

  return filterStatus;
};

//button for modal or priority

const createButton = () => {
  let btn = document.createElement('button');
  btn.id = 'addNewTodo';
  btn.innerHTML = 'Create';

  return btn;
};

const createBodyForTodos = () => {
  let bodyforTodos = document.createElement('span');
  bodyforTodos.id = 'tableBody';
  // bodyforTodos.innerHTML = 'Create';

  return bodyforTodos;
};

export default function () {
  const todosTableContainer = document.createElement('div');
  // todosTableContainer.className = 'todos-table-container';

  todosTableContainer.id = 'todos-table-container';

  const filtersContainer = document.createElement('div');
  filtersContainer.className = 'filters-container';

  filtersContainer.appendChild(titleFilter());
  filtersContainer.appendChild(selectOption(array1, 'status-filter'));
  filtersContainer.appendChild(selectOption(array2, 'priority-filter'));
  filtersContainer.appendChild(createButton());
  todosTableContainer.appendChild(filtersContainer);
  todosTableContainer.appendChild(createBodyForTodos());

  return todosTableContainer;
}

// eslint-disable-next-line no-undef
// console.log(filtersContainer);


// <input type="text" placeholder="search by title">

// let nnn = document.querySelector('.filtersContainer');
// console.log(nnn);
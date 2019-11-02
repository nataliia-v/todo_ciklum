import './filters.scss';

const arrayStatus = ['All', 'Open', 'Done'];
const arrayPriority = ['All', 'High', 'Normal', 'Low'];

// Search todo-item by title

const titleFilter = () => {
  const filter = document.createElement('div');
  const name = '<input type="text" id="search" placeholder="search by title">';
  filter.innerHTML = name;
  return filter;
};

// Filter todo-item by status or priority;

const selectOption = (array, className, id) => {
  const filter = document.createElement('select');
  filter.className = className;
  filter.id = id;
  let filterParameters = '';
  array.forEach(item => {
    filterParameters += `<option>${item}</option>`;
  });
  filter.innerHTML = filterParameters;

  return filter;
};

// button for modal or priority

const createButton = () => {
  const btn = document.createElement('button');
  btn.id = 'addNewTodo';
  btn.type = 'submit';
  btn.innerHTML = 'Create';

  return btn;
};

const createBodyForTodos = () => {
  const bodyforTodos = document.createElement('span');
  bodyforTodos.id = 'tableBody';
  return bodyforTodos;
};

export default function() {
  const todosTableContainer = document.createElement('div');

  todosTableContainer.id = 'todos-table-container';

  const filtersContainer = document.createElement('div');
  filtersContainer.className = 'filters-container';

  filtersContainer.appendChild(titleFilter());
  filtersContainer.appendChild(selectOption(arrayStatus, 'status-filter', 'status'));
  filtersContainer.appendChild(selectOption(arrayPriority, 'priority-filter', 'priority'));
  filtersContainer.appendChild(createButton());
  todosTableContainer.appendChild(filtersContainer);
  todosTableContainer.appendChild(createBodyForTodos());

  return todosTableContainer;
}

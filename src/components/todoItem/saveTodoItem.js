// import fetchTodos from '../../pages/index/index';

export default function(fetchTodos) {
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

  if (localStorage.getItem('todos') === null) {
    const todoItems = [];
    todoItems.push(todoItem);
    localStorage.setItem('todos', JSON.stringify(todoItems));
  } else {
    const todoItems = JSON.parse(localStorage.getItem('todos'));
    todoItems.push(todoItem);
    localStorage.setItem('todos', JSON.stringify(todoItems));
  }

  // Clear form
  document.getElementById('newTodoItem').reset();

  // Re-fetch todos
  fetchTodos();
}

// import './todoItem.scss';

export default function(filteredTodoItems) {
  const todoItems = JSON.parse(localStorage.getItem('todos'));
  const tableContainer = document.getElementById('todos-table-container');
  const oldTableBody = document.getElementById('tableBody');

  tableContainer.removeChild(oldTableBody);
  const newTableBody = document.createElement('ul');
  newTableBody.id = 'tableBody';

  tableContainer.appendChild(newTableBody);

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
}

export default function(fetchTodos) {
  const editBtns = document.querySelectorAll('.edit-btn');
  const todoItems = JSON.parse(localStorage.getItem('todos'));

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

      /* eslint-disable indent */
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
      /* eslint-enable indent */

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
          /* eslint-disable indent */
          return isCurrentItem
            ? {
                ...item,
                title: titleInput.value,
                description: descriptionTextarea.value,
              }
            : item;
          /* eslint-enable indent */
        });

        localStorage.setItem('todos', JSON.stringify(updatedTodoItems));

        fetchTodos();
      });
    });
  }
}

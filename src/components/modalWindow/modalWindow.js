export default function() {
  const modalWindowContainer = document.createElement('form');
  modalWindowContainer.className = 'disable-modal';
  modalWindowContainer.id = 'newTodoItem';

  const inputTitle = document.createElement('div');
  inputTitle.innerHTML =
    '<label for="title">Title</label>\n' +
    '<input id="title" type="text" placeholder="Title" class="cms-table-column">';
  modalWindowContainer.appendChild(inputTitle);

  const inputDescription = document.createElement('div');
  inputDescription.innerHTML =
    '<label for="description">Description</label>\n' +
    '<input type="text" id="description" placeholder="Description" class="cms-table-column">';
  modalWindowContainer.appendChild(inputDescription);

  const selectPriority = document.createElement('div');
  selectPriority.innerHTML =
    '<label for="priority">Priority</label>\n' +
    '    <select id="priority" required class="options">\n' +
    '        <option>High</option>\n' +
    '        <option>Normal</option>\n' +
    '        <option>Low</option>\n' +
    '    </select>';
  modalWindowContainer.appendChild(selectPriority);

  const buttons = document.createElement('div');
  buttons.innerHTML =
    '<button id="cancelModalBtn">cancel</button> <button id="submitModalBtn">save</button>';
  modalWindowContainer.appendChild(buttons);

  return modalWindowContainer;
}

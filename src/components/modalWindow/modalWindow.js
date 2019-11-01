import './modalWindow.scss';

const modalWindowFields = () => {
  const modalWindowContainer = document.createElement('form');
  modalWindowContainer.className = 'disable-modal';
  modalWindowContainer.id = 'newTodoItem';

  const inputTitle = document.createElement('div');
  inputTitle.innerHTML =
    '<label for="title">Title:</label>\n' +
    '<input id="title" type="text" placeholder="Title" class="cms-table-column">';
  modalWindowContainer.appendChild(inputTitle);

  const inputDescription = document.createElement('div');
  inputDescription.innerHTML =
    '<label for="description">Description:</label>\n' +
    '<input type="text" id="description" placeholder="Description" class="cms-table-column">';
  modalWindowContainer.appendChild(inputDescription);

  const selectPriority = document.createElement('div');
  selectPriority.innerHTML =
    '<label for="priority">Priority:</label>\n' +
    '    <select id="priority" required class="options">\n' +
    '        <option>High</option>\n' +
    '        <option>Normal</option>\n' +
    '        <option>Low</option>\n' +
    '    </select>';
  modalWindowContainer.appendChild(selectPriority);

  const buttons = document.createElement('div');
  buttons.className = 'form-btns-wrap';
  buttons.innerHTML =
    '<button id="cancelModalBtn">Cancel</button> <button id="submitModalBtn">Save</button>';
  modalWindowContainer.appendChild(buttons);

  return modalWindowContainer;
};

//modal window
export default function() {
  const btn = document.getElementById('addNewTodo');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'myModal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modal.appendChild(modalContent);
  modalContent.appendChild(modalWindowFields());

  btn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  return modal;
}

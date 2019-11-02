export default function(fetchTodos) {
  const doneBtns = document.querySelectorAll('.done-btn');
  const todoItems = JSON.parse(localStorage.getItem('todos'));
  for (let index = 0; index < doneBtns.length; index += 1) {
    doneBtns[index].addEventListener('click', $event => {
      const currentId = $event.target.parentElement.parentElement.id;

      for (let item = 0; item < todoItems.length; item += 1) {
        if (todoItems[item].id === currentId) {
          todoItems[item].status = true;
        }
      }
      localStorage.setItem('todos', JSON.stringify(todoItems));

      fetchTodos();
    });
  }
}

export default function(fetchTodos) {
  // Delete todos

  const deleteBtns = document.querySelectorAll('.delete-btn');

  for (let i = 0; i < deleteBtns.length; i += 1) {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns[i].addEventListener('click', $event => {
      console.log(deleteBtns);
      const currentId = $event.target.parentElement.parentElement.id;
      console.log(currentId);
      const todoItems = JSON.parse(localStorage.getItem('todos'));

      for (let item = 0; item < todoItems.length; item += 1) {
        if (todoItems[item].id === currentId) {
          todoItems.splice(item, 1);
        }
      }

      localStorage.setItem('todos', JSON.stringify(todoItems));

      fetchTodos();
    });
  }
}

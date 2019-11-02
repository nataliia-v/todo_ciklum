export default updateTodos => {
  const searchInput = document.getElementById('search');
  const prioritySelect = document.getElementById('priority');
  const statusSelect = document.getElementById('status');

  const changeListener = e => {
    const filterName = e.target.id;
    const value = e.target.value;

    const alreadySelectedFilters = JSON.parse(localStorage.getItem('filters'));

    const newFilters = {
      ...alreadySelectedFilters,
      [filterName]: value,
    };

    localStorage.setItem('filters', JSON.stringify(newFilters));

    updateTodos();
  };

  [searchInput, prioritySelect, statusSelect].forEach(filterInput => {
    filterInput.id === 'search'
      ? filterInput.addEventListener('input', changeListener)
      : filterInput.addEventListener('change', changeListener);
  });
};

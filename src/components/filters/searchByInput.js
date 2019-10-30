export default function() {
  // ////// searchByInput  - it's first filter

  const searchByInput = document.getElementById('searchByInput');
  searchByInput.addEventListener('keyup', () => {
    // Declare variables

    const input = document.getElementById('searchByInput');
    const filter = input.value.toUpperCase();
    console.log(`filer${filter}`);
    const ul = document.getElementById('tableBody');
    const li = ul.getElementsByTagName('li');
    console.log(li);

    // Loop through all list items, and hide those who don't match the search query
    for (let i = 0; i < li.length; i += 1) {
      console.log('hello');

      const a = li[i].getElementsByTagName('h3')[0];
      console.log(a);
      const txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  });
}

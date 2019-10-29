export default function() {
  // ////// searchByInput  - it's first filter

  const searchByInput = document.getElementById('searchByInput');
  searchByInput.addEventListener('keyup', () => {
    // Declare variables
    let input;
    let filter;
    let ul;
    let li;
    let a;
    let i;
    let txtValue;
    input = document.getElementById('searchByInput');
    filter = input.value.toUpperCase();
    console.log(`filer${filter}`);
    ul = document.getElementById('tableBody');
    li = ul.getElementsByTagName('li');
    console.log(li);

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      console.log('hello');

      a = li[i].getElementsByTagName('h3')[0];
      console.log(a);
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  });
}

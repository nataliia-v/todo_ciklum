export default function() {
  // ////// searchByPriority  - it's a second filter
  const searchByPriorityy = document.querySelector('.priority-filter');

  searchByPriorityy.addEventListener('change', () => {
    const optionsArr = searchByPriorityy.childNodes;
    let filter = '';
    const ul = document.getElementById('tableBody');
    const li = ul.getElementsByTagName('li');

    optionsArr.forEach(el => {
      if (el.selected === true) {
        filter = el.value;
      }
    });

    for (let i = 0; i < li.length; i += 1) {
      const a = li[i].getElementsByTagName('span')[0];
      const txtValue = a.textContent || a.innerText;
      const all = 'All';

      if (filter !== all) {
        if (txtValue.indexOf(filter) > -1) {
          li[i].style.display = '';
        } else {
          li[i].style.display = 'none';
        }
      } else {
        li[i].style.display = '';
      }
    }
  });
}

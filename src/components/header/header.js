import './header.scss';

export default function(array, className) {
  const header = document.createElement('ul');
  header.className = className;
  let listItems = '';
  array.forEach(item => {
    listItems += `<li>${item}</li>`;
  });

  header.innerHTML = listItems;
  return header;
}

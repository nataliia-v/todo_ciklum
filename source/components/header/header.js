import './header.scss';

export default function (array, className) {
  let header = document.createElement('ul');
  header.className = className;
  let listItems = '';
  array.forEach(function(item) {
    listItems += '<li>' + item + '</li>';
  });
  header.innerHTML = listItems;
  return header;
}

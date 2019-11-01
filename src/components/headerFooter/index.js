import './index.scss';

export default function(array, className) {
  const element = document.createElement('ul');
  element.className = className;
  let listItems = '';
  array.forEach(item => {
    listItems += `<li>${item}</li>`;
  });

  element.innerHTML = listItems;
  return element;
}

const tableKey = 'todo-table';

let clearBtn = document.getElementById('clearBtn');
console.log(clearBtn);

clearBtn.addEventListener('click', () => {
  localStorage.removeItem(tableKey);
});

let todoTable;

let todoTableDemo = [
  {
    title: 'coffee',
    description: 'make the coffee',
    priority: 'high',
    status: 'open',
  },
  {
    title: 'work',
    description: 'work 3 hours',
    priority: 'high',
    status: 'open',
  },
];

let refreshDOMTable = () => {
  let todoTitles = todoTableDemo.map((el)=> {
    console.log(el);
  });
  return todoTitles;
};

refreshDOMTable();
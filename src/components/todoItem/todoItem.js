const tableKey = 'todo-table';

const clearBtn = document.getElementById('clearBtn');
console.log(clearBtn);

clearBtn.addEventListener('click', () => {
  localStorage.removeItem(tableKey);
});

let todoTable;

const todoTableDemo = [
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

const refreshDOMTable = () => {
  const todoTitles = todoTableDemo.map(el => {
    console.log(el);
  });
  return todoTitles;
};

refreshDOMTable();

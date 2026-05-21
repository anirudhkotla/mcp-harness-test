document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';

        const todoTextSpan = document.createElement('span');
        todoTextSpan.textContent = todoText;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            todoItem.remove();
        });

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => {
            todoItem.classList.toggle('completed');
        });

        todoItem.appendChild(todoTextSpan);
        todoItem.appendChild(completeBtn);
        todoItem.appendChild(deleteBtn);
        todoList.appendChild(todoItem);

        todoInput.value = '';
    }
});
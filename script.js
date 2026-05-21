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
        if (todoText) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todoText}</span>
                <button class="delete-btn">Delete</button>
            `;
            todoList.appendChild(li);
            todoInput.value = '';

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                li.remove();
            });

            li.addEventListener('click', () => {
                li.classList.toggle('completed');
            });
        }
    }
});
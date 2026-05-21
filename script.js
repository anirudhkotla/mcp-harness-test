import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const addTodoBtn = document.getElementById('add-todo');
  const todoList = document.getElementById('todo-list');

  // Load todos from Supabase
  loadTodos();

  addTodoBtn.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  async function loadTodos() {
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading todos:', error);
      return;
    }

    todos.forEach(todo => {
      renderTodo(todo);
    });
  }

  async function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ task: todoText }])
        .select();

      if (error) {
        console.error('Error adding todo:', error);
        return;
      }

      renderTodo(data[0]);
      todoInput.value = '';
    }
  }

  function renderTodo(todo) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;
    li.innerHTML = `
      <span>${todo.task}</span>
      <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(li);

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', async () => {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todo.id);

      if (error) {
        console.error('Error deleting todo:', error);
        return;
      }

      li.remove();
    });

    li.addEventListener('click', async () => {
      const { error } = await supabase
        .from('todos')
        .update({ is_complete: !todo.is_complete })
        .eq('id', todo.id);

      if (error) {
        console.error('Error updating todo:', error);
        return;
      }

      li.classList.toggle('completed');
    });

    if (todo.is_complete) {
      li.classList.add('completed');
    }
  }
});
import React, { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

 
  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-4">To-Do App</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-4 rounded-md shadow-sm border transition ${
                todo.completed ? 'bg-green-100 border-green-400' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
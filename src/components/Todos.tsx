
import React, { useMemo, useState } from 'react';
import { BsTrash3 } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uid } from 'uuid';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type TodosProps = {
  initialState?: Todo[];
}

const Todos: React.FC<TodosProps> = ({ initialState }: TodosProps) => {
  console.log(initialState)
  const [todos, setTodos] = useState<Todo[]>(initialState ?? []);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTask = {
      id: uid(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedTodos = useMemo(() => todos.filter(todo => todo.completed).length, [todos]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-4">To-Do App</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
          />
          <button
            onClick={addTodo}
            className="flex items-center bg-blue-100 px-4 py-2 rounded-md hover:bg-blue-200 transition text-blue-500"
          >
            <AiOutlinePlus />
            New task
          </button>
        </div>


        <ul className="space-y-3">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-4 rounded-md shadow-sm border transition ${
                todo.completed ? 'bg-green-100 border-green-400' : 'bg-gray-50 border-gray-200'
              }`}
              data-testid={`todo-item-${todo.id}`}
            >
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-2 w-5 h-5 cursor-pointer rounded-full"
                  id={"checkbox-" + todo.id}
                  data-testid={"checkbox-" + todo.id}
                />
                <label 
                  htmlFor={"checkbox-" + todo.id}
                  className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                >
                  {todo.text}
                </label>
              </div>
              <button
                onClick={() => removeTodo(todo.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition">
                <BsTrash3 />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-end">
          <span className="text-sm text-gray-400" data-testid="summary">{completedTodos} completed of {todos.length} todos</span>
        </div>
      </div>
    </div>
  );
};

export default Todos;
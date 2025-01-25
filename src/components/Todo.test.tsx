import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest'
import Todos, { Todo } from './Todos';


it('renders the app title', () => {
  render(<Todos />);
  expect(screen.queryByText("To-Do App")).toBeInTheDocument();
});


it('renders the number of completed todos', () => {
  const todos: Array<Todo> = [
    { id: '1', text: 'Buy groceries', completed: false },
    { id: '2', text: 'Walk the dog', completed: true },
  ]

  render(<Todos initialState={todos} />);
  expect(screen.getByTestId('summary')).toHaveTextContent('1 completed');
});
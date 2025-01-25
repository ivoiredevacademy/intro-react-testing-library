import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest'
import Todos, { Todo } from './Todos';


it('renders the app title', () => {
  render(<Todos />);
  expect(screen.queryByText("To-Do App")).toBeInTheDocument();
  expect(document.querySelector("#title")).toBeInTheDocument();
});

let todos: Array<Todo> = [];

beforeEach(() => {
  todos = [
    { id: '1', title: 'Buy groceries', completed: false },
    { id: '2', title: 'Walk the dog', completed: true },
  ]
})

it('renders the number of completed todos', () => {
  render(<Todos initialState={todos} />);  

  expect(screen.getByTestId('summary')).toHaveTextContent('1 completed');
});


it('renders the list of todos', () => {
  render(<Todos initialState={todos} />);
  
  const todo1Item = screen.getByText('Buy groceries');
  expect(todo1Item).toBeInTheDocument();

  const todo2Item = screen.getByText('Walk the dog');
  expect(todo2Item).toBeInTheDocument();
});


it('renders the number of completed todos after changing the state', async () => {
  render(<Todos initialState={todos} />);

  const todo1Checkbox = screen.getByRole('checkbox', { name: 'Buy groceries' });
  
  await userEvent.click(todo1Checkbox);

  expect(screen.getByTestId('summary')).toHaveTextContent('2 completed');
});

it('adds a new todo', async () => {
  render(<Todos initialState={todos} />);

  const input = screen.getByTestId('todo-textinput');
  const button = screen.getByTestId('todo-submit-button');

  await userEvent.type(input, 'Feed the cat');
  await userEvent.click(button);

  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.getByTestId('summary')).toHaveTextContent('3 todos');
});

it('adds a new todo with typing "Enter"', async () => {
  render(<Todos initialState={todos} />);

  const input = screen.getByTestId('todo-textinput');

  await userEvent.type(input, 'Feed the cat');
  await userEvent.type(input, '{enter}');

  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.getByRole('checkbox', { name: /feed the cat/i })).toBeInTheDocument();

  expect(screen.getByTestId('summary')).toHaveTextContent('3 todos');
});

it("can fetch data from an API", async () => {

});
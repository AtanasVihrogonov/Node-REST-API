import { Router } from 'express';

import { Todo } from '../modules/todo';

let todos: Todo[] = [];

const router = Router();

// @ GET
router.get('/', (req, res, next) => {
  res.status(200).json({ todos: todos });
});

// @ POST
router.post('/todo', (req, res, next) => {
  // add new todo to todo array
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };

  todos.push(newTodo);

  res.status(201).json({ message: 'Added Todo', todo: newTodo, todos: todos });
});

// @ PUT
router.put('/todo/:todoId', (req, res, next) => {
  // replace todo
  const tid = req.params.todoId;
  // find the index of todo array
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    // updating todo
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    return res.status(200).json({ message: 'Updated Todo', todos: todos });
  }
  res.status(404).json({ message: 'Could not find todo for this id.' });
});

// @ DELETE
router.delete('/todo/:todoId', (req, res, next) => {
  // filter todo
  todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
  res.status(200).json({ message: 'Delete todo', todos: todos });
});

export default router;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let todoItems = [];
let nextItemId = 1;

// Create a new todo item
app.post('/todos', (req, res) => {
  const newItem = req.body;
  newItem.id = nextItemId++;
  todoItems.push(newItem);
  res.status(201).json(newItem);
});

// Read all todo items
app.get('/todos', (req, res) => {
  res.status(200).json(todoItems);
});

// Update a todo item
app.put('/todos/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const itemIndex = todoItems.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    todoItems[itemIndex] = { ...todoItems[itemIndex], ...updatedItem };
    res.status(200).json(todoItems[itemIndex]);
  } else {
    res.status(404).send('Todo item not found.');
  }
});

// Delete a todo item
app.delete('/todos/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  const itemIndex = todoItems.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    const deletedItem = todoItems.splice(itemIndex, 1)[0];
    res.status(200).json(deletedItem);
  } else {
    res.status(404).send('Todo item not found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

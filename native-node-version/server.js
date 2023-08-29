const http = require('http');
const url = require('url');

let todoItems = [];
let nextItemId = 1;

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (req.method === 'GET' && pathname === '/todos') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todoItems));
  } else if (req.method === 'POST' && pathname === '/todos') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const newItem = JSON.parse(body);
        newItem.id = nextItemId++;
        todoItems.push(newItem);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newItem));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON data');
      }
    });
  } else if (req.method === 'PUT' && pathname.startsWith('/todos/')) {
    const itemId = parseInt(pathname.substring('/todos/'.length), 10);

    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const updatedItem = JSON.parse(body);

        const itemIndex = todoItems.findIndex(item => item.id === itemId);

        if (itemIndex !== -1) {
          todoItems[itemIndex] = { ...todoItems[itemIndex], ...updatedItem };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(todoItems[itemIndex]));
        } else {
          res.writeHead(404);
          res.end('Todo item not found.');
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON data');
      }
    });
  } else if (req.method === 'DELETE' && pathname.startsWith('/todos/')) {
    const itemId = parseInt(pathname.substring('/todos/'.length), 10);

    const itemIndex = todoItems.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      const deletedItem = todoItems.splice(itemIndex, 1)[0];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(deletedItem));
    } else {
      res.writeHead(404);
      res.end('Todo item not found.');
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

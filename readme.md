# Todo CRUD Server

This repository contains a simple CRUD (Create, Read, Update, Delete) server for managing todo items. It includes two versions: one using the Express framework and another using native Node.js.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Getting Started

### Clone the Repository

```
git clone https://github.com/Aztenz/todo-crud-server.git
cd todo-crud-server
```

### Install Dependencies

For both versions, navigate to the respective directory and install the dependencies:

#### Express Version

```
cd express-version
npm install
```

#### Native Node.js Version

```
cd native-node-version
npm install
```

## Running the Servers

### Express Version

```
cd express-version
npm start
```

The Express server will be running at http://localhost:3000.

### Native Node.js Version

```
cd native-node-version
node server.js
```

The native Node.js server will be running at http://localhost:3000.

## Test Suite

To test the server endpoints, you can use a tool like Postman. Below are example test scripts for each CRUD operation:

### Create a new todo item

- Method: POST
- URL: http://localhost:3000/todos
- Headers: Content-Type: application/json
- Body (raw):
  ```json
  {
    "title": "Buy groceries"
  }
  ```
- Test:
  ```javascript
  pm.test("Status code is 201 Created", function () {
    pm.response.to.have.status(201);
  });

  pm.test("Response contains new todo item", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("id");
    pm.expect(jsonData.title).to.equal("Buy groceries");
  });
  ```

### Read all todo items

- Method: GET
- URL: http://localhost:3000/todos
- Test:
  ```javascript
  pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
  });

  pm.test("Response is an array of todo items", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("array");
  });
  ```

### Update a todo item

- Method: PUT
- URL: http://localhost:3000/todos/1 (Assuming you have added an item with ID 1)
- Headers: Content-Type: application/json
- Body (raw):
  ```json
  {
    "title": "Buy vegetables"
  }
  ```
- Test:
  ```javascript
  pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
  });

  pm.test("Response contains updated todo item", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.title).to.equal("Buy vegetables");
  });
  ```

### Delete a todo item

- Method: DELETE
- URL: http://localhost:3000/todos/1 (Assuming you have added an item with ID 1)
- Test:
  ```javascript
  pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
  });

  pm.test("Response contains deleted todo item", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.id).to.equal(1);
  });
  ```

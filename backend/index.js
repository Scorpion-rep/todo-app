const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Middleware to parse JSON bodies
app.use(express.json())
// Middleware to enable CORS
app.use(cors())
// Middleware for URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

//importing model
const TodoModel = require('./model/Todo');

// Route to get all todos _ add password and name of database "todoDB"
dotenv.config();
const connectionString = process.env.CONNECTION_STRING;

// Connect to MongoDB
mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

    // CRUD Operations
//GET method to retrieve all todos
app.get('/todos', async(req, res) => {
  //res.send('Hello!')

  try {
    const response = await TodoModel.find({});

    //console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);    
  }
    
});

//POST method to create a new todo
app.post('/todos', async(req, res) => {
    try {
        //console.log(req.body);

        // retrieve body data
        const todo = req.body;

        //add item to database
        await TodoModel.create(todo);
        
        res.status(200).send("New Todo created successfully!");       

    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating todo : ' + error);
    }
});

//Delete method to delete a todo by ID
app.delete('/todos/:id', async(req, res) => {
    try {
        // URL parameters are stored in req.params
        const id = req.params.id;
        console.log(id);

        // Find the todo by ID and delete it
        await TodoModel.findByIdAndDelete(id);

        res.status(200).send('Todo item deleted: ' + id);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting todo');
    }
})

//PUT method to update a todo item by ID
app.put('/todos/:id', async(req, res) => {
    try {
        
        const id = req.params.id;
        const newText = req.body.text;

        // Create a new todo item and update the existing one
        const newTodo = {
            text: newText
        };
        
        await TodoModel.findByIdAndUpdate(id, newTodo);
         
        res.status(200).send('updated todo ' + id + ' with new text: ' + newText);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating todo item: ' + error);
    }
});
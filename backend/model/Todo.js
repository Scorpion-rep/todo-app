//input mongoose
const mongoose = require('mongoose');

//create a schema for the Todo model
const todoSchema = new mongoose.Schema(
    {
        text: {type: String, required: true}
    }
)

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;
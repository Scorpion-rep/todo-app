// alert("Welcome to the Todo App!");

const dateElement = document.getElementById("date");
//const currentTime = document.getElementById("current-time");

// Set the URL for the API endpoint
// This URL should match the backend server's endpoint for fetching todos
const URL = 'http://localhost:3000/todos';

// Format the date to a more readable format
setInterval(() => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const todayDate = new Date().toLocaleDateString('en-AU', options);   
    dateElement.innerHTML = todayDate;
    // console.log(todayDate);
}, 1000);

//============================================================

// GET request
// Function to fetch and display todos items
async function getTodos() {
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(URL, options);
        const todos = await response.json();
        //console.log(todos);

        todos.forEach(todo => {
            console.log(todo);
            const todoContainer = document.getElementById("todo-items");

            // Create a new list item for each todo
            const newTask = document.createElement("li");
            newTask.setAttribute("id", "item-list")
            newTask.classList.add("todo-item", "d-flex", "justify-content-between", "align-items-center", "p-2", "border", "rounded", "mb-2", "bg-light", "text-dark", "shadow");            
            newTask.innerHTML = todo.text;

            // Create buttons
            const buttonDiv = document.createElement("div");
            buttonDiv.classList.add("btns","d-grid");                

            // Create update button
            const updateButton = document.createElement("button");
            updateButton.setAttribute("id", "updateBtn")
            updateButton.classList.add("btn", "border-dark", "btn-sm", "me-1", "rounded-pill");
            updateButton.style.margin ="4px";
            updateButton.innerHTML = "Update";
            // Create delete button
            const deleteButton = document.createElement("button");
            deleteButton.setAttribute("id", "deleteBtn")
            deleteButton.classList.add("btn", "border-dark", "btn-sm", "rounded-pill");
            deleteButton.style.margin = "4px";
            deleteButton.innerHTML = "Delete";

            buttonDiv.appendChild(updateButton);
            buttonDiv.appendChild(deleteButton);

            // Append buttons to the new task
            newTask.appendChild(buttonDiv);               

            // Append the new task to the todo container
            todoContainer.appendChild(newTask);

            // Add eventListener to updateButton
            updateButton.addEventListener("click", function (){
                console.log("update button clicked");
                updateItem(todo);
            })

            // Add event listeners to deleteButton
            deleteButton.addEventListener("click", function(){
                console.log("delete button clicked");
                deleteItem(todo._id);
            })           
        });   
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}

getTodos(); 

let isUpdating;

let todo;
//setting up the form to add new task
// Get the input field and add an event listener for changes
const inputField = document.getElementById("todo-input");
inputField.addEventListener("change", (event) => {
    event.preventDefault();
    //console.log(event.target.value);
    todo = event.target.value;
});

// Add an event listener for the form submission
const addButton = document.getElementById("add-todo");
addButton.addEventListener("click", function(event) {
    //event.preventDefault();       
    //postHandler();  

    if (!isUpdating) {
        postHandler();
    } else {
        updateItem(newItem);
        location.reload();
    }
    
});

//==============================================================

// POST request
// Function to post a new todo
async function postHandler() {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                text: todo 
            })
        };
        const response = await fetch(URL, options);
        // handle response
        if (response.ok) {
            console.log("Todo posted successfully");
            location.reload();
        } else {
            console.log("Error: post request unsuccessful");
        }
    } catch (error) {
        console.error("Error posting todo:", error);
    }
};

//============================================================

// DELETE request to delete todos item by id
async function deleteItem(id) {
    //console.log(id);
    //URL parameters
    
    try {
        // define HTTP request options
        const options = {
            method: "DELETE"
        };        
        const ItemTobeDeleted = await fetch(URL + "/" + id, options);
        // window reload
        location.reload();
        // handling request
        if (ItemTobeDeleted.ok) {
            console.log("Delete succsessful");            
        } else {
            console.log("Delete unccessful");
        }
    } catch (error) {
        console.log(error);
    }    
}

//=============================================================

// PUT request to update todos items
async function updateItem(itemToUpdate) {
    console.log(itemToUpdate); 
    
    const {_id, text} = itemToUpdate;
    const updateURL = `http://www.localhost:3000/todos/${_id}`;

    inputField.value = text;

    isUpdating = true;

    newItem = itemToUpdate;

    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text:todo
            })
        }
        const response = await fetch (updateURL, options);
        if (response.ok) {
            console.log ("Update successful")
        } else {
            console.log ("Failed to update item")
        }

    } catch (error) {
        console.log(error);
    }
}

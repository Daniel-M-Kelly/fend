// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app

const app = express();
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
listening = () => console.log(`Server running on port:${port}`);
const server = app.listen(port, listening);

/* Get Route 1 
    Server Side GET route to return data from array
*/
app.get('/all', sendData);

function sendData (req, res) {
    res.send(data);
};

//Create data array for storing journal entries
const data = [];

/* Post Route
    Add journal entry to data array
*/

app.post('/journalEntry', addEntry);

function addEntry (req, res) {
    data.push(req.body);
    res.send('POST received');
};

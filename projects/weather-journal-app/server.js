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
    Server Side GET route to return projectData
*/
app.get('/projData', (req, res) => {
    res.send(projectData);
});


/* Post Route
    Add user data 
*/

app.post('/addEntry', addEntry);

function addEntry ( req, res ) {
    newEntry = {
        temperature: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings
        }

    //projectData.push(newEntry);
    //res.send(newEntry);
    console.log(`New data added: 
        Temp: ${newEntry.temp}
        Date: ${newEntry.date}
        Feelings: ${newEntry.feelings}`);
    };

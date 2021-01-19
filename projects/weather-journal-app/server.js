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

// One API base url
const baseURL = 'api.openweathermap.org/data/2.5/weather?'

// Variable for Open Weather Map API Key
const OWMApiKey = '46d47cb411bbb0290b9ff89a6610aaed';

/* Get Route 1 
    Server Side GET route to return projectData
*/
app.get('/projData', (req, res) => {
    res.send(projectData);
});


/* Post Route
    Add user data 
*/

app.post('/submit', (req, res) => {
    projectData.push(req.body)
});

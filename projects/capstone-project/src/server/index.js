var path = require('path')
const express = require('express')
const cors = require('cors');
const fetch = require('node-fetch')
//const bodyParser = require('body-parser')
const dotenv = require('dotenv');

const app = express()


app.use(cors());

app.use(express.json());

app.use(express.static('dist'))

//Pull API Keys from .env
dotenv.config();
const weatherBit_API_Key = process.env.weatherBit_API_Key
const pixabay_API_Key = process.env.pixabay_API_Key
const geonames_username = process.env.geonames_username

// API Call
const geonamesURL = 'http://api.geonames.org/searchJSON?q='

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Get Route 1 
    Server Side GET route to return data from array
*/
app.get('/all', sendData);

function sendData (req, res) {
    res.send(projectData);
};

/* Post Route
    Add journal entry to data array
*/

app.post('/journalEntry', addEntry);

function addEntry (req, res) {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.feelings = req.body.feelings;
    res.send('POST received');
};

// Post route to get summary information from API
app.post('/locationSearch', async function (req, res) {
    searchLocation = req.body.location;
    console.log(`Location to Search for: ${searchLocation}`)

    const api_res = await fetch(`${geonamesURL}${searchLocation}&maxRows=1&username=${geonames_username}`);
    console.log(api_res)

    try {
        const apiData = await api_res.json();
        projectData.location = apiData["geonames"][0].name
        projectData.country = apiData["geonames"][0].countryName
        projectData.latitude = apiData["geonames"][0].lat
        projectData.longitude = apiData["geonames"][0].lng 
        res.send(apiData)
        console.log(`Geonames api Data Sent! ${apiData}`)
    } catch (error) {
        console.log('Error: ', error);
    }

})

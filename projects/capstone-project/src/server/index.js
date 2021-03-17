const path = require('path')
const express = require('express')
const cors = require('cors');
const fetch = require('node-fetch')
//const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const { Console } = require('console');

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
    console.log(`initial data ${projectData.location}`)
    res.send(projectData);
};

/* Post Route
    Add journal entry to data array
*/

app.post('/addTrip', addTrip);

async function addTrip (req, res) {
    const locData = await locationSearch(req.body.location)
    const departDate = req.body.departDate
    console.log(`Saving Trip departing on ${departDate} to ${locData["geonames"][0].name}`)

    try {
        projectData.location = locData["geonames"][0].name
        projectData.country = locData["geonames"][0].countryName
        projectData.latitude = locData["geonames"][0].lat
        projectData.longitude = locData["geonames"][0].lng
        projectData.departDate = departDate
        console.log('Trip Saved');
        console.log(projectData)
        res.send(projectData)
    } catch (error) {
        console.log('Error: ', error);
    }
};

async function locationSearch (searchLoc) {
    console.log(`Location to Search for: ${searchLoc}`)
    const api_res = await fetch(`${geonamesURL}${searchLoc}&maxRows=1&username=${geonames_username}`);
    try {
        const apiData = await api_res.json();
        console.log(`Geonames api Data Sent!`)
        return apiData
    } catch (error) {
        console.log('Error: ', error);
    }
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
        console.log(`Geonames api Data Sent!`)
    } catch (error) {
        console.log('Error: ', error);
    }

})

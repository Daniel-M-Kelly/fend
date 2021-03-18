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
const weatherForecastURL = 'http://api.weatherbit.io/v2.0/forecast/daily?&lat='
const weatherCurrentURL = 'http://api.weatherbit.io/v2.0/current?&lat='

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
    let now = new Date();
    let departDate = new Date(projectData.departDate);
    let dateDiff = Math.floor((departDate - now) / (1000 * 60 * 60 * 24));
    projectData.dateDiff = dateDiff
    res.send(projectData);
};

/* Post Route
    Add journal entry to data array
*/

app.post('/addTrip', addTrip);

async function addTrip (req, res) {
    const locData = await locationSearch(req.body.location)
    const departDate = req.body.departDate
    const weatherData = await weatherLookup(locData["geonames"][0].lat, locData["geonames"][0].lng, departDate )
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

async function weatherLookup (lat,lng,depart) {
    console.log(`Looking up weather for: ${depart}`)
    let now = new Date();
    let departDate = new Date(depart);
    let dateDiff = Math.floor((departDate - now) / (1000 * 60 * 60 * 24)) + 1 ;
    projectData.dateDiff = dateDiff
    console.log(`Date Diff = ${dateDiff}`)

    if (dateDiff < 16) { 
        console.log('Get Forecasted Weather')
        console.log(`${weatherForecastURL}${lat}&lon=${lng}&key=${weatherBit_API_Key}`)
        let api_res = await fetch(`${weatherForecastURL}${lat}&lon=${lng}&key=${weatherBit_API_Key}`);
        try {
            const apiData = await api_res.json();
            console.log(`WeatherBit api Data Sent!`)
            console.log(`Forecast for ${apiData['data'][dateDiff].valid_date}`)
            projectData.temp = apiData["data"][dateDiff].temp 
            projectData.weather = apiData["data"][dateDiff]['weather'].description
            projectData.weatherIcon = apiData["data"][dateDiff]['weather'].icon
        } catch (error) {
            console.log('Error: ', error);
        }

    } else {
        console.log('Get Current Weather')
        console.log(`${weatherCurrentURL}${lat}&lon=${lng}&start_date=${depart}&end_date=${depart}&key=${weatherBit_API_Key}`)
        let api_res = await fetch(`${weatherCurrentURL}${lat}&lon=${lng}&key=${weatherBit_API_Key}`);
        try {
            const apiData = await api_res.json();
            console.log(`WeatherBit api Data Sent!`)

            projectData.temp = apiData["data"][0].temp
            projectData.weather = apiData["data"][0]['weather'].description
            projectData.weatherIcon = apiData["data"][0]['weather'].icon
        } catch (error) {
            console.log('Error: ', error);
        }
    }



};


// Post route to get summary information from API
/* app.post('/locationSearch', async function (req, res) {
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

})*/

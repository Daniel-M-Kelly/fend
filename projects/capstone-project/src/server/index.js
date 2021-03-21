const path = require('path')
const express = require('express')
const cors = require('cors');
const fetch = require('node-fetch')
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

// API URLs
const geonamesURL = 'http://api.geonames.org/searchJSON?q='
const weatherForecastURL = 'http://api.weatherbit.io/v2.0/forecast/daily?&lat='
const weatherCurrentURL = 'http://api.weatherbit.io/v2.0/current?&lat='
const pixabayURL = 'https://pixabay.com/api/?key='

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// Setup empty JS object to act as endpoint for all routes
projectData = {};


//function sendData (req, res) {
const sendData = (req, res) => {
    //Re-calculate DateDifference
    dateCalc (projectData.departDate);
    res.send(projectData);
};

// Get Route - Server Side GET route to return data from array
app.get('/all', sendData);

//Function to lookup data from APIs and save to projectData array
const addTrip = async (req, res) => {

    //Calculate how many days from now until departure
    dateCalc(req.body.departDate);

    //Run locationSearch Function to get location Name, Latitude, and Logitude for use in subsequent APIs
    const locData = await locationSearch(req.body.location);

    //Lookup weather information for the location
    await weatherLookup(locData["geonames"][0].lat, locData["geonames"][0].lng, projectData.dateDiff );
    
    //Find a picture of the location
    await pictureLookup(locData["geonames"][0].name);

    //Send the complete projectData back to the client
    res.send(projectData);

};

// Post Route - Add trip to data array
app.post('/addTrip', addTrip);

//Function to get location information from geonames
//async function locationSearch (searchLoc) {
const locationSearch = async searchLoc => {
    console.log(`Location to Search for: ${searchLoc}`);
    const api_res = await fetch(`${geonamesURL}${searchLoc}&maxRows=1&username=${geonames_username}`);
    try {
        const apiData = await api_res.json();
        //Add Location name, country, latitude, and longitude to project data array
        //Latitude and Longitued used to find weather forecast
        projectData.location = apiData["geonames"][0].name;
        projectData.country = apiData["geonames"][0].countryName;
        projectData.latitude = apiData["geonames"][0].lat;
        projectData.longitude = apiData["geonames"][0].lng;
        return apiData;
    } catch (error) {
        console.log('Error: ', error);
    }
};

//Function to lookup an image of the searched for location
const pictureLookup = async searchLoc => {
    //URI encode search location string 
    encodedLoc = encodeURI(searchLoc);
    
    //Pixabay API image search
    const api_res = await fetch(`${pixabayURL}${pixabay_API_Key}&q=${encodedLoc}&image_type=photo&safesearch=true`);
        try {
            const apiData = await api_res.json();
            //Take the first hit image from the query string
            projectData.imgURL = apiData['hits'][0].webformatURL;
        } catch (error) {
            console.log('Error: ', error);
        }
};

//Look up weather from weatherbits.io API using latitude and longitude
const weatherLookup = async (lat, lng, dateDiff) => {

    //If the depart date is within 16 days, get the weather forecast for that day
    if (dateDiff < 16 && dateDiff >= 0) { 

        let api_res = await fetch(`${weatherForecastURL}${lat}&lon=${lng}&key=${weatherBit_API_Key}`);
        try {
            const apiData = await api_res.json();
            projectData.temp = apiData["data"][dateDiff].temp;
            projectData.weather = apiData["data"][dateDiff]['weather'].description;
            projectData.weatherIcon = apiData["data"][dateDiff]['weather'].icon;
        } catch (error) {
            console.log('Error: ', error);
        }

    } else {
        //If the departure date is more than 16 days away, get the current weather.
        let api_res = await fetch(`${weatherCurrentURL}${lat}&lon=${lng}&key=${weatherBit_API_Key}`);
        try {
            const apiData = await api_res.json();
            projectData.temp = apiData["data"][0].temp;
            projectData.weather = apiData["data"][0]['weather'].description;
            projectData.weatherIcon = apiData["data"][0]['weather'].icon;
        } catch (error) {
            console.log('Error: ', error);
        }
    }
};

//Function to calculate # of days from current date, until departure.
const dateCalc = depart => {
    const now = new Date();
    const departDate = new Date(depart);
    const dateDiff = Math.floor((departDate - now) / (1000 * 60 * 60 * 24)) + 1 ;
    projectData.departDate = depart;
    projectData.dateDiff = dateDiff;
};


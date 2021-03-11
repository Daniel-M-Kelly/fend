var path = require('path')
const express = require('express')
const cors = require('cors');
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
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

// Post route to get summary information from API
app.post('/locationSearch', async function (req, res) {
    searchLocation = req.body.location;
    console.log(`Location to Search for: ${searchLocation}`)

    const api_res = await fetch(`${geonamesURL}${searchLocation}&maxRows=1&username=${geonames_username}`);
    console.log(api_res)

    try {
        const apiData = await api_res.json();
        res.send(apiData)
        console.log(`Geonames api Data Sent! ${apiData}`)
    } catch (error) {
        console.log('Error: ', error);
    }

})

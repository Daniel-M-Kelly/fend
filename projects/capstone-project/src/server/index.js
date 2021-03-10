var path = require('path')
const express = require('express')
const cors = require('cors');
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');

const app = express()


app.use(cors());

app.use(bodyParser.json())

app.use(express.static('dist'))

//Pull API Keys from .env
dotenv.config();
const weatherBit_API_Key = process.env.weatherBit_API_Key
const pixabay_API_Key = process.env.pixabay_API_Key
const geonames_username = process.env.geonames_username

// API Call
const baseURL = 'https://api.meaningcloud.com/summarization-1.0?key='



app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// Post route to get summary information from API
app.post('/summary', async function (req, res) {
    articleURL = req.body.url;
    //console.log(`URL of article to summarize: ${articleURL}`)

    const api_res = await fetch(`${baseURL}${apiKey}&url=${articleURL}&sentences=5`);
    
    try {
        const summaryData = await api_res.json();
        res.send(summaryData)
        //console.log(`Article Summary Sent! ${summaryData}`)
    } catch (error) {
        console.log('Error: ', error);
    }

})

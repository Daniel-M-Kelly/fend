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

//MeaningCloud API Key
dotenv.config();
// API Call
const baseURL = 'https://api.meaningcloud.com/summarization-1.0?key='
const apiKey = process.env.API_KEY


app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
    console.log(`Your API key is ${process.env.API_KEY}`);
})

// Post route to get summary information from API
app.post('/summary', async function (req, res) {
    articleURL = req.body.url;
    console.log(`URL of article to summarize: ${articleURL}`)

    const api_res = await fetch(`${baseURL}${apiKey}&url=${articleURL}&sentences=5`);
    
    try {
        const summaryData = await api_res.json();
        res.send(summaryData)
        console.log(`Article Summary Sent! ${summaryData}`)
    } catch (error) {
        console.log('Error: ', error);
    }

})

var path = require('path')
const express = require('express')
const cors = require('cors');
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const app = express()

app.use(cors());

app.use(bodyParser.json())

//MeaningCloud API Key

const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
    console.log(`Your API key is ${process.env.API_KEY}`);
})

app.post('/summary', function (req, res) {
    data = req.body.url;
    console.log(data)
    
    res.send(retrieveData(data))
})

// API Call
const baseURL = 'https://api.meaningcloud.com/summarization-1.0?key='
const apiKey = process.env.API_KEY
//const textURL = 'https://www.cbc.ca/news/canada/british-columbia/dog-rescued-from-shaft-under-back-porch-in-white-rock-b-c-1.5922507'


// Async get data from API
const retrieveData = async (textURL = '') => {
    console.log(`Retrieving summary for article at url ${textURL}`)
    const res = await fetch(`${baseURL}${apiKey}&url=${textURL}&sentences=5`  );
    try {
        const summaryData = await res.json();
        console.log(summaryData)
        return(summaryData)
    } catch (error) {
        console.log('Error: ', error);
    }
}

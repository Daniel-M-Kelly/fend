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


// API Call
const baseURL = 'https://api.meaningcloud.com/summarization-1.0?key='
const apiKey = process.env.API_KEY


app.post('/summary', async function (req, res) {
    textURL = req.body.url;
    console.log(`URL of article to summarize: ${textURL}`)

    const api_res = await fetch(`${baseURL}${apiKey}&url=${textURL}&sentences=5`  );
    try {
        const summaryData = await api_res.json();
        res.send(summaryData)
        console.log('Article Summary Sent')
    } catch (error) {
        console.log('Error: ', error);
    }

})

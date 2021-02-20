var path = require('path')
const express = require('express')
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js')

const app = express()
app.use(cors());

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

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// API Call
const baseURL = 'api.meaningcloud.com/summarization-1.0?key='
const apikey = process.env.API_KEY
const textUrl = 


// Async get data from API
const getData = async (baseURL, zipCode, apikey) => {
    const res = await fetch(baseURL + apikey + '&url'  );
    try {
        const weatherData = await res.json();
        const temp = weatherData.main.temp;
        return(temp)
    } catch (error) {
        console.log('Error: ', error);
    }
}

/*
const https = require('follow-redirects').https;
const fs = require('fs');

const options = {
    'method': 'POST',
    'hostname': 'api.meaningcloud.com',
    'path': '/summarization-1.0?key=<your_key>&txt=<text>&sentences=<number_sentences>',
    'headers': {
    },
    'maxRedirects': 20
    };

app.get('/nlp', function (req, res) {

}

    const req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.end();

)
*/
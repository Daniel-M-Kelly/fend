/* Global Variables */


// One API base url
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='

// Variable for Open Weather Map API Key
const OWMAPIKey = '46d47cb411bbb0290b9ff89a6610aaed';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Create event listener on generate button to run performAction

document.getElementById('generate').addEventListener('click', performAction);

//

function performAction () {
    const zipCode = document.getElementById('zip').value
    const feelingsEntry = document.getElementById('feelings').value
    //console.log(`Selected Zipcode: ${zipCode} Feelings: ${feelingsEntry}`);
    getData(baseURL, zipCode, OWMAPIKey)
    .then(function(data){
        //console.log(`Data for posting ${data}`);
        postData('/addEntry', {temp:data, date:newDate, feelings: feelingsEntry });
    })
    .then(
        updateUI()
    )
}

// Async get data from API
const getData = async (baseURL, zipCode, apikey) => {
    const res = await fetch(baseURL + zipCode + "&units=imperial&appid=" + apikey );
    try {
        const weatherData = await res.json();
        const temp = weatherData.main.temp
        //console.log(`The temperature is ${temp} F`);
        return(temp)
    } catch (error) {
        console.log('Error: ', error);
    }
}

/* Post Data */

const postData = async (url = '', data = {} ) => {
    console.log(`The following will be posted ${data.temp} ${data.date} ${data.feelings}`)
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    try  {
        const newData = await res.json();
        console.log('Posted');
    }catch(error) {
        console.log("error", error);
        }
    }


const updateUI = async () => {
        const request = await fetch('/all');
        try{
        const allData = await request.json();
        document.getElementById('').innerHTML = allData[0].animal;
        document.getElementById('animalFact').innerHTML = allData[0].facts;
        document.getElementById('animalFav').innerHTML = allData[0].fav;
        }catch(error){
        console.log("error", error);
        }
    }
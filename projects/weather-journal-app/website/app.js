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
    console.log(`Selected Zipcode: ${zipCode}
        Feelings: ${feelingsEntry}`);
    postData(baseURL, zipCode, OWMAPIKey);
}

// Async Post
const postData = async (baseURL, zipCode, apikey) => {
    const res = await fetch(baseURL + zipCode + "&units=imperial&appid=" + apikey );
    try {
        const weatherData = await res.json();
        console.log(weatherData);
    } catch (error) {
        console.log('Error: ', error);
    }
}


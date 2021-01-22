/* Global Variables */

// One API base url
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='

// Variable for Open Weather Map API Key
const OWMAPIKey = '46d47cb411bbb0290b9ff89a6610aaed';

// Create a new date instance dynamically with JS
//let d = new Date();
//let newDate = months[d.getMonth()+' '+ d.getDate()+' '+ d.getFullYear();
let d = new Date()
let newDate = d.toDateString()

// Create event listener on generate button to run performAction
document.getElementById('generate').addEventListener('click', performAction);


// Function when generate button clicked
function performAction () {
    const zipCode = document.getElementById('zip').value
    const feelingsEntry = document.getElementById('feelings').value
    getData(baseURL, zipCode, OWMAPIKey)
    .then(function(data){
        postData('/journalEntry', {temp:data, date:newDate, feelings: feelingsEntry });
    }
    )
    .then(function(){
        updateUI()
    })
}


// Async get data from API
const getData = async (baseURL, zipCode, apikey) => {
    const res = await fetch(baseURL + zipCode + "&units=imperial&appid=" + apikey );
    try {
        const weatherData = await res.json();
        const temp = weatherData.main.temp;
        return(temp)
    } catch (error) {
        console.log('Error: ', error);
    }
}


// Post Data 
const postData = async (url = '', data = {} ) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const newData = await res.text();
    }catch(error) {
        console.log("error", error);
        }
    }


// Update webpdate UI
const updateUI = async () => {
        const req = await fetch('/all');
        try{
            const projectData = await req.json();
            document.getElementById('date').innerText = `Entry Date: ${projectData.date}`;
            document.getElementById('temp').innerText = `Temperature: ${projectData.temp} F`;
            document.getElementById('content').innerText = `Feelings: ${projectData.feelings}`;
        }catch(error) {
            console.log("error", error);
        }
    }
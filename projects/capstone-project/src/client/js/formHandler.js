//function handleSubmit(event) {
const handleSubmit = event => {
    event.preventDefault();

    // Get the trip data from the form field
    let locationName = document.getElementById('locationName').value;
    let departDate = document.getElementById('departDate').value;

    // Get the location data, then update the UI
    getLocation({location: locationName, departDate: departDate})
        // When API response is received, update the results section of the page with the summary
        .then(updateUI);
};

//Get data from a saved trip.
const loadSaved = async () => {
    //Build Get request
    const res =  await fetch('http://localhost:8080/all', {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    try {
        return await res.json();
    } catch (error) {
        console.log('error', error);
    };
    
};

const initialData = () => {
    console.log('Loading Data');
    loadSaved()
        .then(updateUI);
};

//update the page UI
const updateUI = res => {
    //Check for location data before updating UI
    if(res.location) {
    console.log(`updating UI with data for ${res.location}`);
    document.getElementById('results').innerText = `
    Trip to: ${res.location}
    Country: ${res.country}
    Departure Date: ${res.departDate}
    Days until Departure: ${res.dateDiff}
    Temperature: ${res.temp}
    The weather will be: ${res.weather}`;
    document.getElementById('weatherIcon').src = `/icons/${res.weatherIcon}.png`;
    document.getElementById('locPic').src = res.imgURL;
    } else {document.getElementById('results').innerText = 'No Saved Trip'};
};

    // Build the post request function
    const getLocation = async (data = {}) => {
        const res = await fetch('http://localhost:8080/addTrip', {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'cors',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            try {
                return await res.json();
            } catch (error) {
                console.log('error', error);
            };
        };

//Export function to include in index.js
export { handleSubmit };
export { initialData };
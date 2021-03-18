function handleSubmit(event) {
    event.preventDefault()

    // Get the trip data from the form field
    let locationName = document.getElementById('locationName').value
    let departDate = document.getElementById('departDate').value

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
                const locationInfo = await res.json();
                return locationInfo;
            } catch (error) {
                console.log('error', error);
            }
        };

    getLocation({location: locationName, departDate: departDate})
        // When API response is received, update the results section of the page with the summary
        .then(
            function (res) {
                document.getElementById('results').innerText = `
                    Trip to: ${res.location}
                    Country: ${res.country}
                    Departure Date: ${res.departDate}
                    Days until Departure: ${res.dateDiff}
                    Temperature: ${res.temp}
                    The weather will be: ${res.weather}`
                    ;
                document.getElementById('locPic').src = res.imgURL
            }
        )
};

async function loadSaved () {
    const res = await fetch('http://localhost:8080/all', {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        //body: JSON.stringify(data)
    });
    try {
        const locationInfo = await res.json();
        return locationInfo;
    } catch (error) {
        console.log('error', error);
    }
    
};

function initialData () {
    console.log('Loading Data')
    loadSaved()
        .then(
            function (res) {
                document.getElementById('results').innerText = `
                Trip to: ${res.location}
                Country: ${res.country}
                Departure Date: ${res.departDate}
                Days until Departure: ${res.dateDiff}
                Temperature: ${res.temp}
                The weather will be: ${res.weather}`;
                    
            }
        );
}


//Export function to include in index.js
export { handleSubmit }
export { initialData }
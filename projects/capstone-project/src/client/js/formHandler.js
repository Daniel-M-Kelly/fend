function handleSubmit(event) {
    event.preventDefault()

    // Get the URL from the form field
    let locationName = document.getElementById('locationName').value

    // Build the post request function
    const getLocation = async (data = {}) => {
        const res = await fetch('http://localhost:8080/locationSearch', {
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

        getLocation({location: locationName})
        // When API response is received, update the results section of the page with the summary
        .then(
            function (res) {
                document.getElementById('results').innerText = `
                    Location Information: ${res["geonames"][0].name}
                    Country: ${res["geonames"][0].countryName}
                    Latitude: ${res["geonames"][0].lat}
                    Longitude: ${res["geonames"][0].lng}`;
            }
        )
};

//Export function to include in index.js
export { handleSubmit }

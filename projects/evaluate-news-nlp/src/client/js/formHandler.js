function handleSubmit(event) {
    event.preventDefault()

    // Get the URL from the form field
    let formText = document.getElementById('url').value

    // Build the post request function
    const getSummary = async (data = {}) => {
        const res = await fetch('http://localhost:8080/summary', {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'cors',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            try {
                const summary = await res.json();
                return summary;
            } catch (error) {
                console.log('error', error);
            }
        };
    // Check if valid URL was Entered
    if (Client.validURL(formText)) {

        // If valid URL, run getSummary function
        getSummary({url: formText})
        // When API response is received, update the results section of the page with the summary
        .then(
            function (res) {
                document.getElementById('results').innerText = `Article Summary: ${res.summary}`;
            }
        )
    } else {
        // Notify user of invalid URL
        alert('Invalid URL');
    }
};

//Export function to include in index.js
export { handleSubmit }

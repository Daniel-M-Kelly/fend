function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value

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
            console.log(data)
            const summary = await res.json();
            console.log('Summary Received', summary)
            return summary;
        } catch (error) {
            console.log('error', error);
        }
    };
    
    if (Client.validURL(formText)) {
        console.log("::: Form Submitted :::");
        console.log(formText)

        getSummary({url: formText})

        .then(
            function (res) {
                document.getElementById('results').innerText = `Article Summary: ${res.summary}`;
            }
        )
    } else {
        alert('Invalid URL');
    }
};


    
export { handleSubmit }

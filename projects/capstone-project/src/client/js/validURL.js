// Check for valid URL string
function validURL(url) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?'+ 
    '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'
    ); 
    return !!pattern.test(url);
}

// Export function for index.js
export{ validURL }
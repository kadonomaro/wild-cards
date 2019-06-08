function getData(dataURL) {
    return fetch(dataURL)
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.info(error);
        });
    
}

export default getData;

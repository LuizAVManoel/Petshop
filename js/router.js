function getCurrentLocation() {
    getParameters();
    return location.hash.split('?')[0].replace('#', '');
}

function getParameters() {
    var params = location.hash.split('?')[1];
    if (params !== undefined)
        params = params.split('&');
}
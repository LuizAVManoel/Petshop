function getCurrentLocation() {
    return location.hash.split('?')[0].replace('#', '');
}

function getParameters() {
    var params = location.hash.split('?')[1];
    var obj = {};

    // existem params
    if (params) {
        var arr = params.split('&');

        for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=');

            var paramName = a[0];

            // valor do parametro, true caso vazio
             var paramValue = typeof(a[1])==='undefined' ? true : a[1];

            if (obj[paramName]) {
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                
                obj[paramName].push(paramValue);
            }
            else 
                obj[paramName] = paramValue;
        }
    }

    return obj;
}

function changeLocation(location, params=[]) {
    var dest = '#' + location + (params.length > 0 ? '?' : '');
    
    for (var i = 0; i < params.length - 1; i++)
        dest += params[i] + '&';
    
    if (params.length > 0)
        dest += params[i];
    
    window.location.href = dest;
}
function fetchProductsData(productsFile, filter = []) {
    var result = [];
    
    return new Promise(resolve => {
        $.getJSON(productsFile, function(data) {
            data.forEach(function(element) {
                var finalProduct = {
                    'categoria': element.categoria,
                    'produtos': []
                };
            
                if (filter.length == 0 || filter.indexOf(element.categoria) > -1) {
                    element.produtos.forEach(function(product) {
                        finalProduct['produtos'].push(product);
                    });
                    result.push(finalProduct);
                }
            });
            resolve(result);
        });
    });
}
function fetchProductsData(productsFile, filter) {
    $.getJSON(productsFile, function(data) {
        data.forEach(function(currentType) {
            var type = currentType.categoria;
            currentType.produtos.forEach(function(product) {
                if (filter.length == 0 || filter.indexOf(type) > -1)
                    insertTableProduct(product, type);
            });
        });
    });
}
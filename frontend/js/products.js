function fetchProduct(productsFile, id) {
    return new Promise(resolve => {
        $.getJSON('data/' + productsFile + '.json', function(data) {
            var product = undefined;

            for (var i = 0; i < data.length; i++) {
                var element = data[i];

                if (element['id'] === id) {
                    product = element;
                    break;
                }
            }

            resolve(product);
        });
    });
}

function fetchAllProducts(productsFile, categorie = '') {
    var result = [];
    
    return new Promise(resolve => {
        $.getJSON('data/' + productsFile + '.json', function(data) {
            data.forEach(function(element) {           
                if (categorie === '' || element['categoria'] === categorie) {
                    result.push(element);
                }
            });
            resolve(result);
        });
    });
}

function createProductPreview(product) {
    return `
        <div class="col-md-3 arrival-grid simpleCart_shelfItem">
            <div class="grid-arr">
                <div class="grid-arrival">
                    <figure>		
                        <a href="#product?id=` + product['id'] + `">
                            <div class="grid-img">
                                <img src="` + product['foto'] + `" class="img-responsive" alt="">
                            </div>		
                        </a>		
                    </figure>	
                </div>
                <div class="women" style="min-height: 100px;">
                    <h6><a href="#product?id=` + product['id'] + `">` + product['nome'] + `</a></h6>
                    <p><em class="item_price">R$ ` + product['preco'].toFixed(2) + `</em></p>
                    <a href="#product?id=` + product['id'] + `"data-text="Comprar" class="my-cart-b item_add">Comprar</a>
                </div>
            </div>
        </div>`;
}
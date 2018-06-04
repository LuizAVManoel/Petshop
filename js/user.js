/** Variáveis globais para controlar o usuário */
var user = {
    'logged': false,
    'id': 0,
    'num_itens': 0,
    'total_cart': 0,
    'services': [],
    'products': []
};

var userDB = [
    {
        'name': 'Admin',
        'email': 'petshop@petshop.com',
        'password': 'admin'
    }
];

var updateNavCallback = undefined;
var updateFooterCallback = undefined;

/**  */
function updateStaticContent() {
    updateNavCallback();
    updateFooterCallback();
}

function userLogin(email, password) {
    for (var i = 0; i < userDB.length; i++) {
        var element = userDB[i];
        if(element['email'] == email && element['password'] == password) {
            user['logged'] = true;
            user['id'] = i;
            resetUserData();
            updateStaticContent();
            return true;
        }
    }
    return false;
}

function userLogout() {
    user['logged'] = false;
    updateStaticContent();
}

function resetUserData() {
    user['num_itens'] = 0;
    user['total_cart'] = 0;
    user['products'] =  [];
    updateStaticContent();
}

function isUserLogged() {
    return user['logged'];
}

function getUserInfo() {
    return userDB[user['id']];
}

function addUser(name, email, password) {
    var newUser = {
        'name': name,
        'email': email,
        'password': password
    }
    userDB.push(newUser);
}

function userAddService(date, type, hour) {
    if (isUserLogged()) {
        var newService = {
            'date': date,
            'type': type,
            'hour': hour
        };
        user['services'].push(newService);
    }
}

function userGetServices() {
    return user['services'];
}

function userAddProduct(product, count=1) {
    if (isUserLogged()) {
        user['num_itens'] += count;
        user['total_cart'] += count * product['preco'];
        updateNavCallback();

        for(var i = 0; i < user['products'].length; i++) {
            var existProduct = user['products'][i];
            if (product['id'] == existProduct['id']) {
                existProduct['count'] += count;
                
                return;
            }
        }

        var newProduct = {
            'id': product['id'],
            'count': count
        };
        user['products'].push(newProduct);
    }
}

function userRemoveProduct(productToRemove) {
    var index = -1;

    for (var i = 0; i < user['products'].length; i++) {
        var prod = user['products'];
        if (productToRemove['id'] === prod['id']) {
            index = i;
            break;
        }
    }

    if (index > -1) {
        user['num_itens'] -= prod['count'];
        user['total_cart'] -= prod['count'] * productToRemove['preco'];
        user['products'].splice(index, 1);
    }
}
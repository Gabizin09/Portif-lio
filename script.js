const products = {
    burgers: [
        {
            id: 1,
            nome: 'X-Burger',
            price: 25.90,
            description: 'Pão, hambúrguer, queijo, alface, tomate',
            category: 'burgers',
            imagem: "./xburger.jpg"
        },
        {
            id: 2,
            name: 'X-Bacon Cheddar',
            price: 30.00,
            description: 'Pão, hambúrguer, bacon, cheddar, tomate, maionese',
            category: 'burgers',
            image: './images/x-bacon-cheddar.jpg'
        },
        {
            id: 3,
            name: 'KiDelicia',
            price: 28.00,
            description: 'Pão, hambúrguer, presunto, ovo, maionese, milho, queijo, alface, tomate',
            category: 'burgers',
            image: './images/kidelicia.jpg'
        },
        {
            id: 4,
            name: 'Americano',
            price: 22.00,
            description: 'Pão, maionese, hambúrguer, presunto, 2 ovo, queijo, alface, tomate',
            category: 'burgers',
            image: './images/americano.jpg'
        },
        {
            id: 5,
            name: 'X-Bacon',
            price: 28.90,
            description: 'Pão, hambúrguer, bacon, queijo, alface, tomate',
            category: 'burgers',
            image: './images/x-bacon.jpg'
        },
        {
            id: 6,
            name: 'X-Tudo',
            price: 32.90,
            description: 'Pão, 2 hambúrgueres, bacon, queijo, ovo, alface, tomate',
            category: 'burgers',
            image: './images/x-tudo.jpg'
        }
    ],
    portions: [
        {
            id: 7,
            name: 'Batata Frita',
            price: 19.90,
            description: 'Porção de batatas fritas crocantes (300g)',
            category: 'portions',
            image: './images/batata-frita.jpg'
        },
        {
            id: 8,
            name: 'Frango a Passarinho',
            price: 34.00,
            description: 'Frango com molho especal',
            category: 'portions',
            image: './images/frango-passarinho.jpg'
        },
        {
            id: 9,
            name: 'Mista Frango',
            price: 60.00,
            description: 'Batata com Filé de Frango e pão na chapa',
            category: 'portions',
            image: './images/mista-frango.jpg'
        }
    ],
    drinks: [
        {
            id: 10,
            name: 'Coca-Cola',
            price: 11.00,
            description: '(Coca-Cola 2 Litros)',
            category: 'drinks',
            image: './coca.jpg'
        },
        {
            id: 11,
            name: 'Guárana',
            price: 9.00,
            description: '(Guárana 2 Litros)',
            category: 'drinks',
            image: './images/guarana.jpg'
        },
        {
            id: 12,
            name: 'Pepsi',
            price: 10.00,
            description: '(Pepsi 2 Litros)',
            category: 'drinks',
            image: './images/pepsi.jpg'
        },
        {
            id: 14,
            name: 'Suco Natural c/ àgua',
            price: 9.50,
            description: 'Laranja, Limão, Morango, Melão, Abacaxi, Abacaxi c/ Hortelã (500ml)',
            category: 'drinks',
            image: './images/suco-natural-agua.jpg'
        },
        {
            id: 15,
            name: 'Suco Natural c/ leite',
            price: 10.50,
            description: 'Laranja, Limão, Morango, Melão, Abacaxi, Abacaxi c/ Hortelã (500ml)',
            category: 'drinks',
            image: './images/suco-natural-leite.jpg'
        }
    ]
};

let cart = [];
let currentCategory = 'all';

function loadProducts(category = 'all') {
    const container = document.getElementById('productsContainer');
    let items = [];
    
    if (category === 'all') {
        Object.values(products).forEach(categoryProducts => {
            items = [...items, ...categoryProducts];
        });
    } else {
        items = products[category] || [];
    }
    
    container.innerHTML = items.map(product => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text mt-auto"><strong>R$ ${product.price.toFixed(2)}</strong></p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    let product = null;
    Object.values(products).some(category => {
        product = category.find(p => p.id === productId);
        return product;
    });

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItems.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
                ${item.name} x ${item.quantity}
                <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${item.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
            <div>R$ ${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    document.querySelectorAll('[data-category]').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('[data-category]').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            loadProducts(e.target.dataset.category);
        });
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        alert('Pedido finalizado! Total: R$ ' + document.getElementById('cartTotal').textContent);
        cart = [];
        updateCartDisplay();
    });
});
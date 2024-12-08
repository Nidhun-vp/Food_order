// JavaScript for managing cart functionality

// Select necessary elements
const dashboardContent = document.querySelector('.dashboard-content');
const orderWrapper = document.querySelector('.order-wrapper');
const orderTotal = document.querySelector('.order-total');
let cartItems = [];

// Function to render cart items
function renderCart() {
    orderWrapper.innerHTML = ''; // Clear existing cart items

    cartItems.forEach((item, index) => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');
        orderCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="order-image">
            <div class="order-detail">
                <p>${item.name}</p>
                <i class="fas fa-times" data-index="${index}"></i>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
            </div>
            <h4 class="order-price">$${(item.price * item.quantity).toFixed(2)}</h4>
        `;

        orderWrapper.appendChild(orderCard);
    });

    updateTotal();
}

// Function to update total amount
function updateTotal() {
    let subtotal = 0;
    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.1; // 10% tax
    const deliveryFee = 3; // Flat delivery fee
    const total = subtotal + tax + deliveryFee;

    orderTotal.innerHTML = `
        <p>Subtotal<span>$${subtotal.toFixed(2)}</span></p>
        <p>Tax(10%)<span>$${tax.toFixed(2)}</span></p>
        <p>Delivery Fee<span>$${deliveryFee.toFixed(2)}</span></p>
        <hr class="divider">
        <p>Total<span>$${total.toFixed(2)}</span></p>
    `;
}

// Function to add item to cart
function addToCart(item) {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);
    
    if (existingItemIndex >= 0) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push(item);
    }

    renderCart();
}

// Event listener for adding items to the cart
if (dashboardContent) {
    dashboardContent.addEventListener('click', (e) => {
        const card = e.target.closest('.dashboard-card');

        if (card) {
            const name = card.querySelector('h4').textContent.split('$')[0].trim();
            const price = parseFloat(card.querySelector('h4 span').textContent.replace('$', ''));
            const image = card.querySelector('img').src;

            const item = {
                name,
                price,
                image,
                quantity: 1
            };

            addToCart(item);
        }
    });
}

// Event listener for removing items and updating quantities
orderWrapper.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('fa-times')) {
        const index = parseInt(target.dataset.index, 10);
        cartItems.splice(index, 1);
        renderCart();
    }

    if (target.classList.contains('quantity-input')) {
        const index = parseInt(target.dataset.index, 10);
        const newQuantity = parseInt(target.value, 10);
        cartItems[index].quantity = newQuantity > 0 ? newQuantity : 1;
        renderCart();
    }
});

// Initial rendering
renderCart();

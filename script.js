const products = [
  { id: 1, name: 'Laptop', category: 'electronics', price: 50000, image: 'images/laptop.jpg' },
  { id: 2, name: 'Headphones', category: 'electronics', price: 2000, image: 'images/headphones.jpg' },
  { id: 3, name: 'Smartphone', category: 'electronics', price: 30000, image: 'images/smartphone.jpg' },
  { id: 4, name: 'Bluetooth Speaker', category: 'electronics', price: 2500, image: 'images/speaker.jpg' },
  { id: 5, name: 'T-Shirt', category: 'clothing', price: 500, image: 'images/tshirt.jpg' },
  { id: 6, name: 'Jeans', category: 'clothing', price: 1200, image: 'images/jeans.jpg' },
  { id: 7, name: 'Jacket', category: 'clothing', price: 2500, image: 'images/jacket.jpg' },
  { id: 8, name: 'Sweatshirt', category: 'clothing', price: 1800, image: 'images/sweatshirt.jpg' },
  { id: 9, name: 'Watch', category: 'accessories', price: 1500, image: 'images/watch.jpg' },
  { id: 10, name: 'Sunglasses', category: 'accessories', price: 800, image: 'images/sunglasses.jpg' },
  { id: 11, name: 'Backpack', category: 'accessories', price: 1800, image: 'images/backpack.jpg' },
  { id: 12, name: 'Wallet', category: 'accessories', price: 600, image: 'images/wallet.jpg' }
];

function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category');
}

function displayProducts(filtered = products) {
  const container = document.getElementById('product-list');
  if (!container) return;
  container.innerHTML = '';

  filtered.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product';

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <div class="product-buttons">
          <button onclick="viewProduct(${product.id})">View Details</button>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
    container.appendChild(productCard);
  });
}

function viewProduct(id) {
  const product = products.find(p => p.id === id);
  alert(`Product: ${product.name}\nPrice: ₹${product.price}`);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(item => item.id === id);
  if (!existingItem) {
    cart.push(product); // quantity removed
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

function applyFilter() {
  const maxPrice = parseFloat(document.getElementById('max-price')?.value);
  const category = getCategoryFromURL();

  const filtered = products.filter(p => {
    const matchCategory = category ? p.category === category : true;
    const matchPrice = !isNaN(maxPrice) ? p.price <= maxPrice : true;
    return matchCategory && matchPrice;
  });

  displayProducts(filtered);
}

if (document.getElementById('product-list')) {
  const category = getCategoryFromURL();
  const filtered = category ? products.filter(p => p.category === category) : products;
  displayProducts(filtered);
}

// Cart Page
function displayCart() {
  const cartContainer = document.getElementById('cart-items');
  const cartMessage = document.getElementById('cart-message');
  if (!cartContainer) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cart.length) {
    cartMessage.textContent = "Your cart is empty.";
    cartContainer.innerHTML = '';
    return;
  }

  cartMessage.textContent = `You have ${cart.length} item(s) in your cart:`;
  cartContainer.innerHTML = '';

  cart.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}</p>
        <div class="product-buttons">
          <button onclick="removeFromCart(${product.id})">Remove</button>
        </div>
      </div>
    `;
    cartContainer.appendChild(card);
  });
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

if (document.getElementById('cart-items')) displayCart();

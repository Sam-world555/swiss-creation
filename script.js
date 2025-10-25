// Real Fashion Products with High-Quality Images
const products = [
  {
    id:1, 
    name:"Black Formal Pants", 
    price:1299, 
    img:"https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:"Premium formal pants with perfect fit"
  },
  {
    id:2, 
    name:"Cotton Shirting Fabric", 
    price:899, 
    img:"https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:"100% pure cotton shirting material"
  },
  {
    id:3, 
    name:"Designer Ladies Kurti", 
    price:1499, 
    img:"https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:"Ethnic designer kurti, premium quality"
  },
  {
    id:4, 
    name:"Slim Fit Formal Pant", 
    price:1199, 
    img:"https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:"Modern slim fit design"
  },
  {
    id:5, 
    name:"Premium Silk Fabric", 
    price:1599, 
    img:"https://images.pexels.com/photos/6568967/pexels-photo-6568967.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:"Luxurious silk fabric material"
  },
  {
    id:6, 
    name:"Ladies Palazzo Set", 
    price:1699, 
    img:"https://images.pexels.com/photos/16170/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    description:"Trendy palazzo with kurti set"
  },
  {
    id:7, 
    name:"Navy Blue Formal Pants", 
    price:1399, 
    img:"https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:"Classic navy blue formal wear"
  },
  {
    id:8, 
    name:"Printed Dress Material", 
    price:899, 
    img:"https://images.pexels.com/photos/9594672/pexels-photo-9594672.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:"Beautiful printed fabric for suits"
  }
];

// Check if user is logged in
function checkLogin() {
  const user = localStorage.getItem('loggedInUser');
  updateNavbar(user);
  return user;
}

// Update navbar based on login status
function updateNavbar(username) {
  const cartLink = document.querySelector('.nav-links a[href="cart.html"]');
  if(!cartLink) return;
  
  if(username) {
    const existingProfile = document.getElementById('user-profile');
    if(!existingProfile) {
      const profileHTML = `<span id="user-profile" style="margin-left:20px;color:#667eea;font-weight:600">👤 ${username} | <a href="#" onclick="logout();return false;" style="color:#764ba2">Logout</a></span>`;
      cartLink.insertAdjacentHTML('afterend', profileHTML);
    }
  }
}

// Display products with improved layout
function displayProducts(){
  const grid = document.getElementById('products-grid');
  if(!grid) return;
  grid.innerHTML = products.map(p=>`
    <div class="product-card">
      <div class="product-image-wrapper">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="product-badge">New</div>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-price-row">
          <span class="product-price">₹${p.price}</span>
          <button class="cta-btn product-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Add to cart (requires login)
function addToCart(id){
  const user = checkLogin();
  if(!user) {
    alert('Please login first to add items to cart');
    window.location = 'user-login.html';
    return;
  }
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Show toast notification
  showToast('Added to cart!');
  updateCartCount();
}

// Toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Update cart count
function updateCartCount(){
  const count = document.getElementById('cart-count');
  if(!count) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  count.innerText = cart.length;
}

// Display cart with images
function displayCart(){
  const user = checkLogin();
  if(!user) {
    window.location = 'user-login.html';
    return;
  }
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  if(!container) return;
  
  if(cart.length===0){
    container.innerHTML = '<p style="text-align:center;padding:40px">Your cart is empty<br><a href="products.html" style="color:#667eea">Browse Products</a></p>';
    return;
  }
  
  let sum = 0;
  container.innerHTML = cart.map((id, index)=>{
    const p = products.find(x=>x.id===id);
    sum += p.price;
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px">
        <div style="flex:1;margin-left:15px">
          <h4>${p.name}</h4>
          <p style="color:#667eea;font-weight:600">₹${p.price}</p>
        </div>
        <button onclick="removeFromCart(${index})" style="background:#ff4444;color:#fff;border:none;padding:8px 15px;border-radius:5px;cursor:pointer">Remove</button>
      </div>
    `;
  }).join('');
  total.innerHTML = `<h3>Total: ₹${sum}</h3>`;
}

// Remove from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Place order
function placeOrder(){
  const user = checkLogin();
  if(!user) return;
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if(cart.length===0){alert('Cart is empty');return;}
  
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push({id:Date.now(), user:user, items:cart, date:new Date().toLocaleString()});
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('cart');
  alert('Order placed successfully! We will contact you soon on WhatsApp: 9376108601');
  location.reload();
}

// User Registration
function userRegister(){
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  
  if(!name || !email || !password) {
    alert('All fields required');
    return;
  }
  
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if(users.find(u=>u.email===email)) {
    alert('Email already registered');
    return;
  }
  
  users.push({name, email, password});
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful! Please login.');
  window.location = 'user-login.html';
}

// User Login
function userLogin(){
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u=>u.email===email && u.password===password);
  
  if(user) {
    localStorage.setItem('loggedInUser', user.name);
    alert('Login successful!');
    window.location = 'index.html';
  } else {
    alert('Invalid credentials');
  }
}

// Admin login
function adminLogin(){
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  if(u==='admin' && p==='admin123'){
    localStorage.setItem('admin', 'true');
    window.location='admin-panel.html';
  }else{
    alert('Invalid admin credentials');
  }
}

// Check admin
function checkAdmin(){
  if(localStorage.getItem('admin')!=='true'){
    window.location='admin-login.html';
  }
}

// Logout
function logout(){
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('admin');
  alert('Logged out successfully');
  window.location='index.html';
}

// Display orders (admin)
function displayOrders(){
  const container = document.getElementById('admin-orders');
  if(!container) return;
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  if(orders.length===0){
    container.innerHTML='<p>No orders yet</p>';
    return;
  }
  container.innerHTML = orders.map(o=>`
    <div class="order-item">
      <strong>Order #${o.id}</strong><br>
      Customer: ${o.user || 'Guest'}<br>
      Date: ${o.date}<br>
      Items: ${o.items.length}<br>
      <button onclick="alert('Contact customer via WhatsApp: 9376108601')" style="margin-top:10px;padding:8px 15px;background:#25D366;color:#fff;border:none;border-radius:5px;cursor:pointer">Contact Customer</button>
    </div>
  `).join('');
}

// Init
window.addEventListener('DOMContentLoaded', ()=>{
  checkLogin();
  updateCartCount();
});
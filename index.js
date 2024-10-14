// Fetch products and render them on the page
fetch("https://fakestoreapi.com/products/")
  .then((res) => res.json())
  .then((data) => {
    renderProducts(data); // Render fetched products
    updateCartCount(); // Update cart count after products are rendered
  });

// Function to render products
const renderProducts = (products) => {
  const productGrid = document.querySelector('.product-grid');
  productGrid.innerHTML = ''; // Clear existing products

  products.forEach((product) => {
    const productCard = document.createElement('a');
    productCard.href = `product.html?id=${product.id}`; // Link to product detail page
    productCard.className = 'product-card';
    productCard.setAttribute('data-category', product.category); // Set data-category for filtering

    // Truncate the title if it's longer than 16 characters
    const truncatedTitle = product.title.length > 16 
      ? product.title.slice(0, 16) + '...' 
      : product.title;

    // Construct product card HTML
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <div class="product-details">
        <h3>${truncatedTitle}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;

    productGrid.appendChild(productCard); // Append product card to the grid
  });
};

// Function to update cart count
const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from local storage
    const cartCount = document.getElementById("cart-count");
    cartCount.innerText = cart.length; // Update count display
    cartCount.style.display = cart.length > 0 ? "block" : "none"; // Show or hide based on count
};

// Function to add to cart and update count
function addToCart(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(product => {
          const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve existing cart
          cart.push(product); // Add new product to cart
          localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
          updateCartCount(); // Update cart count immediately
      });
}

// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");

// Function to set theme from local storage
const setTheme = () => {
  const theme = localStorage.getItem("theme") || "light"; // Default to light theme
  document.body.classList.toggle("dark", theme === "dark"); // Apply dark theme if set
  themeToggle.innerHTML = theme === "dark"
    ? '<i class="fas fa-sun"></i>' // Sun icon for light mode
    : '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
};

// Call setTheme on page load
setTheme();

// Add click event for theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark"); // Toggle dark class on body
  const newTheme = document.body.classList.contains("dark") ? "dark" : "light"; // Determine new theme
  localStorage.setItem("theme", newTheme); // Save new theme to local storage
  themeToggle.innerHTML = newTheme === "dark"
    ? '<i class="fas fa-sun"></i>' // Update icon
    : '<i class="fas fa-moon"></i>';
});

// Product Filtering Functionality
const categoryFilter = document.getElementById("category-filter");
categoryFilter?.addEventListener("change", function () {
  const selectedCategory = this.value; // Get selected category
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const category = product.dataset.category; // Get category from data attribute
    product.style.display =
      selectedCategory === "" || category === selectedCategory
        ? "block" // Show product if it matches the filter
        : "none"; // Hide otherwise
  });
});

// Hamburger Menu Functionality
const hamburger = document.getElementById("hamburger");
const closeHamburger = document.getElementById("close-hamburger");
const navLinks = document.getElementById("nav-links");

// Function to check window size and adjust icon visibility
const checkWindowSize = () => {
  if (window.innerWidth > 480) {
    hamburger.style.display = "none"; // Hide hamburger icon
    closeHamburger.style.display = "none"; // Hide close icon
    navLinks.classList.remove("active"); // Hide nav links if active
  } else {
    hamburger.style.display = "block"; // Show hamburger if under 480px
  }
};

// Initial check on page load
checkWindowSize();

// Event listener for window resize
window.addEventListener('resize', checkWindowSize);

// Add click event for hamburger icon
hamburger.addEventListener("click", () => {
  navLinks.classList.add("active"); // Show nav links
  closeHamburger.style.display = "block"; // Show close icon
  hamburger.style.display = "none"; // Hide hamburger icon
});

// Add click event for close icon
closeHamburger.addEventListener("click", () => {
  navLinks.classList.remove("active"); // Hide nav links
  closeHamburger.style.display = "none"; // Hide close icon
  hamburger.style.display = "block"; // Show hamburger icon
});

// Render Cart Items
const renderCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart items
    const cartContainer = document.querySelector('.cart-container'); // Ensure this element exists in your HTML

    cartContainer.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>$${item.price.toFixed(2)}</p>
            </div>
        `;
        cartContainer.appendChild(cartItem); // Append item to cart
    });

    // Optionally add a message if the cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>'; // Message for empty cart
    }
};

// Add an event listener to the cart icon
const cartIcon = document.getElementById("cart-icon"); // Ensure you have an element with this ID
cartIcon.addEventListener("click", renderCartItems); // Render cart items on click

// Call this function on page load
window.onload = () => {
    updateCartCount(); // Update cart count on load
};

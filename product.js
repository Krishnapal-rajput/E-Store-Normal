// Function to fetch product details from the API
const fetchProductDetails = async () => {
  // Get the product ID from the URL parameters
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // Check if an ID is provided
  if (id) {
    // Fetch product details from the API
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json(); // Parse the response as JSON

    // Update the page with product details
    document.getElementById("product-title").innerText = product.title; // Set product title
    document.getElementById("product-image").src = product.image; // Set product image
    document.getElementById("product-category").innerText = `Category: ${product.category}`; // Set product category
    document.getElementById("product-price").innerText = `Price: $${product.price}`; // Set product price
    document.getElementById("product-description").innerText = `Description: ${product.description}`; // Set product description
    document.getElementById("product-rating").innerText = `Rating: ${product.rating.rate} (${product.rating.count} reviews)`; // Set product rating and review count

    // Add to Cart functionality
    document.getElementById("add-to-cart").onclick = () => {
      // Retrieve the cart from localStorage or initialize it if empty
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product); // Add the current product to the cart
      localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart back to localStorage

      // Display success message
      const messageDiv = document.getElementById("message");
      messageDiv.innerText = `${product.title} has been added to your cart!`; // Set success message
      messageDiv.style.color = "green"; // Optional: Style the message to indicate success

      updateCartCount(); // Update cart count displayed on the page
    };
  }
};

// Call the function when the page loads to fetch and display product details
window.onload = fetchProductDetails;

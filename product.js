// Function to fetch product details
const fetchProductDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
  
    if (id) {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await response.json();
  
      // Update the page with product details
      document.getElementById("product-title").innerText = product.title;
      document.getElementById("product-image").src = product.image;
      document.getElementById("product-category").innerText = `Category: ${product.category}`;
      document.getElementById("product-price").innerText = `Price: $${product.price}`;
      document.getElementById("product-description").innerText = `Description: ${product.description}`;
      document.getElementById("product-rating").innerText = `Rating: ${product.rating.rate} (${product.rating.count} reviews)`;
  
      // Add to Cart functionality
      document.getElementById("add-to-cart").onclick = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
  
        // Display success message
        const messageDiv = document.getElementById("message");
        messageDiv.innerText = `${product.title} has been added to your cart!`;
        messageDiv.style.color = "green"; // Optional: Style the message
  
        updateCartCount(); // Update cart count
      };
    }
  };
  
  // Call the function when the page loads
  window.onload = fetchProductDetails;
  
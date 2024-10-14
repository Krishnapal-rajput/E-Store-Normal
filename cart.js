// Function to load items from the cart and display them
const loadCartItems = () => {
  // Retrieve cart items from local storage or initialize as an empty array
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items"); // Container to hold cart items
  let total = 0; // Variable to keep track of the total price
  cartContainer.innerHTML = ""; // Clear existing items in the container

  // Check if the cart is empty
  if (cartItems.length === 0) {
    // Display a message if the cart is empty
    cartContainer.innerHTML =
      "<p style='color: #f00c'>Your cart is empty! Add some products to your cart.</p>";
    document.getElementById("total-price").innerText = "Total Price: $0.00"; // Set total price to $0
    return; // Exit the function if the cart is empty
  }

  // Loop through each product in the cart
  cartItems.forEach((product, index) => {
    const item = document.createElement("div"); // Create a div for each cart item
    item.classList.add("cart-item"); // Add a class for styling
    item.innerHTML = `
            <h3>${product.title}</h3> <!-- Product title -->
            <img src="${product.image}" alt="${
      product.title
    }" style="width: 100px;"> <!-- Product image -->
            <p>Price: $${product.price.toFixed(2)}</p> <!-- Product price -->
            <button onclick="removeFromCart(${index})">Remove</button> <!-- Button to remove item from cart -->
        `;
    cartContainer.appendChild(item); // Add the item to the cart container
    total += product.price; // Add the product price to the total
  });

  // Display the total price in the designated area
  document.getElementById(
    "total-price"
  ).innerText = `Total Price: $${total.toFixed(2)}`;
};

// Function to remove an item from the cart
function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart items

  // Remove the item at the specified index
  cartItems.splice(index, 1);

  // Update local storage with the new cart items
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // Reload cart items to reflect changes in the UI
  loadCartItems();

  // Update the cart count if needed
  updateCartCount();
}

// Call this function on page load to display cart items
window.onload = loadCartItems;

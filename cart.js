const loadCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    let total = 0;
    cartContainer.innerHTML = ""; // Clear existing items

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p style='color: #f00c'>Your cart is empty! Add some products to your cart.</p>";
        document.getElementById("total-price").innerText = "Total Price: $0.00";
        return;
    }

    cartItems.forEach((product, index) => {
        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}" style="width: 100px;">
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(item);
        total += product.price;
    });

    document.getElementById("total-price").innerText = `Total Price: $${total.toFixed(2)}`;
};

function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Remove the item at the specified index
    cartItems.splice(index, 1);
    
    // Update local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    // Reload cart items to reflect changes
    loadCartItems();
    
    // Update the cart count if needed
    updateCartCount();
}

// Call this function on page load to display cart items
window.onload = loadCartItems;

const searchBar = document.getElementById("search-bar");
const categoryFiltering = document.getElementById("category-filtering");
const bookCards = document.getElementById("book-card-container");
const cartButton = document.getElementById("cart-btn");
const paymentButton = document.getElementById("payment-btn");
const couponButtn = document.getElementById("coupon-btn");
const clearCartButton = document.getElementById("clear-cart-btn");
const productsContainer = document.getElementById("products-container");
const inputCoupon = document.getElementById("input-coupon");
const applyCoupon = document.getElementById("apply-coupon");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubtotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const checkoutButton = document.getElementById("check-out");
const cartContainer = document.getElementById("cart-container");
const closeCartButton = document.getElementById("close-cart-btn");

let isCartShowing = false;

const products = [
    { id: 1, name: "The Rise of Rome", price: 25.99, category: "History" },
    { id: 2, name: "Modern Physics", price: 18.50, category: "Education" },
    { id: 3, name: "Mystic River", price: 13.75, category: "Fiction" },
    { id: 4, name: "Thinking, Fast and Slow", price: 16.89, category: "Non-fiction" },
    { id: 5, name: "Steve Jobs", price: 22.49, category: "Biography" },
    { id: 6, name: "Ancient Civilizations", price: 30.00, category: "History" },
    { id: 7, name: "Mathematics for Dummies", price: 10.99, category: "Education" },
    { id: 8, name: "The Last Kingdom", price: 14.55, category: "Fiction" },
    { id: 9, name: "The Art of War", price: 19.99, category: "Non-fiction" },
    { id: 10, name: "Leonardo da Vinci", price: 27.99, category: "Biography" },
    { id: 11, name: "Napoleon Bonaparte", price: 20.75, category: "History" },
    { id: 12, name: "Chemistry Essentials", price: 14.20, category: "Education" },
    { id: 13, name: "Harry Potter", price: 25.00, category: "Fiction" },
    { id: 14, name: "Atomic Habits", price: 21.90, category: "Non-fiction" },
    { id: 15, name: "The Wright Brothers", price: 17.85, category: "Biography" },   
];

// destructure the object properties in the array
products.forEach(({ name, id, price, category }) => {
  bookCards.innerHTML += `
  <div class="book-card">
  <h2>${name}</h2>
  <p class="book-price">$${price}</p>
  <p class="product-category">${category}</p>
  <button id="${id}" class="add-to-cart-btn">Add to cart</button>
  </div>`;
});

// Get the class of the object
class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);
    const totalCountPerProduct = {};
    this.items.forEach((book) => {
      totalCountPerProduct[book.id] = (totalCountPerProduct[book.id] || 0) + 1;
    });

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${product.id}`
    );

    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x`)
      : (productsContainer.innerHTML += `<div class="product" id="book${id}">
      <p>
      <span class="product-count" id="product-count-for-id${id}"></spa>
      ${name}
      </p>
      <p>$${price}</p>
      </div>`);
  }

  // Access the total number of items in the cart
  getCounts() {
    return this.items.length;
  }

  // Handles clearing the cart
  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }
    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  // handles the taxes
  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  // Handles updates od the price total of the cart
  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax; //updates the total values
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;

    return this.total;
  }
}

// Assignning the shopping cart class to cart variable
const cart = new ShoppingCart();

const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

// converts the addToCardBtns into an array using the spread op. to get iterate it using forEach()
[...addToCartBtns].forEach((btn) =>
  btn.addEventListener("click", (e) => {
    cart.addItem(Number(e.target.id), products);
    totalNumberOfItems.textContent = cart.getCounts();
    cart.calculateTotal();
  })
);

cartButton.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

closeCartButton.addEventListener("click", () => {
  if (isCartShowing) {
    cartContainer.style.display = "none";
  }
});

clearCartButton.addEventListener("click", cart.clearCart.bind(cart));


//TO-DO: Fix cart items display
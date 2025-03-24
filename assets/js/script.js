const searchBarInput = document.getElementById("search-bar");
const categoryFilter = document.getElementById("category-filtering");
const bookCardContainer = document.getElementById("book-card-container");
const cartButton = document.getElementById("cart-btn");
const clearCartButton = document.getElementById("clear-cart-btn");
const productsContainer = document.getElementById("products-container");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const checkoutButton = document.getElementById("check-out");
const cartContainer = document.getElementById("cart-container");
const closeCartButton = document.getElementById("close-cart-btn");

let isCartShowing = false;

const products = [
  { id: 1, name: "The Rise of Rome", price: 25.99, category: "History" },
  { id: 2, name: "Modern Physics", price: 18.5, category: "Education" },
  { id: 3, name: "Mystic River", price: 13.75, category: "Fiction" },
  {
    id: 4,
    name: "Thinking, Fast and Slow",
    price: 16.89,
    category: "Non-fiction",
  },
  { id: 5, name: "Steve Jobs", price: 22.49, category: "Biography" },
  { id: 6, name: "Ancient Civilizations", price: 30.0, category: "History" },
  {
    id: 7,
    name: "Mathematics for Dummies",
    price: 10.99,
    category: "Education",
  },
  { id: 8, name: "The Last Kingdom", price: 14.55, category: "Fiction" },
  { id: 9, name: "The Art of War", price: 19.99, category: "Non-fiction" },
  { id: 10, name: "Leonardo da Vinci", price: 27.99, category: "Biography" },
  { id: 11, name: "Napoleon Bonaparte", price: 20.75, category: "History" },
  { id: 12, name: "Chemistry Essentials", price: 14.2, category: "Education" },
  { id: 13, name: "Harry Potter", price: 25.0, category: "Fiction" },
  { id: 14, name: "Atomic Habits", price: 21.9, category: "Non-fiction" },
  { id: 15, name: "The Wright Brothers", price: 17.85, category: "Biography" },
];

// destructure the object properties in the array
products.forEach(({ name, id, price, category }) => {
  bookCardContainer.innerHTML += `
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
      <p class="p-name">${name}</p>
      <p class="p-price">$${price}</p>
      <p>
       <span class="product-count" id="product-count-for-id${id}"></span>
      </p>
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

const bookSections = document.querySelector(".book-sections");

// Handles search bar filtering products
searchBarInput.addEventListener("input", (e) => {
  const inputValue = e.target.value.toLowerCase();

  const bookCardElements = document.querySelectorAll(".book-card");

  products.forEach((book, index) => {
    const isVisible =
      book.name.toLowerCase().includes(inputValue) ||
      book.category.toLowerCase().includes(inputValue);

    bookCardElements[index].classList.toggle("hide", !isVisible);
  });
});

// Handles select-filtering categories
categoryFilter.addEventListener("change", function () {
  const selectedCategory = this.value;
  bookCardContainer.innerHTML = ""; // clears the current book container

  // Filter and display book based on category
  if (selectedCategory === "all-categories") {
    products.forEach(({ name, id, price, category }) => {
      bookCardContainer.innerHTML += `
    <div class="book-card">
    <h2>${name}</h2>
    <p class="book-price">$${price}</p>
    <p class="product-category">${category}</p>
    <button id="${id}" class="add-to-cart-btn">Add to cart</button>
    </div>`;
    });
  } else {
    // Filter by category
    const filteredProducts = products.filter(
      (product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
    );

    filteredProducts.forEach(({ name, id, price, category }) => {
      bookCardContainer.innerHTML += `
    <div class="book-card">
    <h2>${name}</h2>
    <p class="book-price">$${price}</p>
    <p class="product-category">${category}</p>
    <button id="${id}" class="add-to-cart-btn">Add to cart</button>
    </div>`;
    });
  }

  // Update section heading
  updateSectionHeading(selectedCategory);

  // reattach event listeners to the new add-to-cart btns
  attachAddToCartListener();
});

// Updates the section heading based on selected category
const updateSectionHeading = (category) => {
  let headingText = "All Categories";

  if (category !== "all-categories") {
    headingText = category.charAt(0).toUpperCase() + category.slice(1);
  }

  // Find the section element or create
  let sectionElement = document.querySelector(
    `section[data-category="${category}"]`
  );

  if (!sectionElement) {
    bookSections.innerHTML = "";

    // Create new section for this category
    sectionElement = document.createElement("section");
    sectionElement.id = category;
    sectionElement.setAttribute("data-category", category);

    const heading = document.createElement("h2");
    heading.textContent = headingText;

    sectionElement.appendChild(heading);
    sectionElement.appendChild(bookCardContainer);
    bookSections.appendChild(sectionElement);
  }
};

// handles reattach event listener to add-to-cat-btn
const attachAddToCartListener = () => {
  const addToCardBtns = document.getElementsByClassName("add-to-cart-btn");

  [...addToCartBtns].forEach((btn) => {
    btn.addEventListener("click", (e) => {
      cart.addItem(Number(e.target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cart.calculateTotal();
    });
  });
};

// Initialize the page with all books
window.addEventListener("DOMContentLoaded", () => {
  // Trigger the change event to lead all books initially
  categoryFilter.dispatchEvent(new Event("change"));
});

const couponSelect = document.getElementById("coupon-select");

// Add event listener for the coupon selection
couponSelect.addEventListener("change", function () {
  const selectedCoupon = this.value;
  applyDiscount(selectedCoupon);
});

// Function to apply discount based on select coupon
const applyDiscount = (couponValue) => {
  let discountPercentage = 0;

  // Determine discount percentage based on counpon value
  switch (couponValue) {
    case "1":
      discountPercentage = 5;
      break;
    case "2":
      discountPercentage = 20;
      break;
    case "3":
      discountPercentage = 100;
      break;
    default:
      discountPercentage = 0;
  }

  // Recalculate the total with discount
  if (discountPercentage > 0) {
    // get the current subtotal
    const subTotalText = cartSubTotal.textContent;
    const subTotal = parseFloat(subTotalText.replace("$", ""));

    // calculate discount amount
    const discountAmount = (discountPercentage / 100) * subTotal;
    const discountSubTotal = subTotal - discountAmount;

    // calculate tax on the discounted subtotal
    const tax = cart.calculateTaxes(discountSubTotal);

    // update the total
    const newTotal = discountSubTotal + tax;

    // Update display with discount
    cartSubTotal.textContent = `$${discountSubTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${newTotal.toFixed(2)}`;

    // Add discount info. if not already exist
    let discountInfoElement = document.getElementById("discount-info");
    if (!discountInfoElement) {
      discountInfoElement = document.createElement("div");
      discountInfoElement.id = "discount-info";

      // insert it before the total
      cartTotal.parentNode.insertBefore(
        discountInfoElement,
        cartTotal
      );
    }
    discountInfoElement.textContent = `Discount (${discountPercentage}%): -$${discountAmount.toFixed(
      2
    )}`;
  } else {
    // if no discount, revert to original
    cart.calculateTotal();

    // Remove discount info it it exist
    const discountInfoElement = document.getElementById("discount-info");
    if (discountInfoElement) {
      discountInfoElement.remove();
    }
  }
};

// Modify the carts calculatetotal method to heck for acive discount
const originalCalculateTotal = cart.calculateTotal;
cart.calculateTotal = function () {
  // Calls the original method first
  originalCalculateTotal.call(this);

  // check if a discount is already use
  const selectedCoupon = couponSelect.value;
  if (selectedCoupon !== "") {
    // Re-apply the discount
    applyDiscount(selectedCoupon);
  }

  return this.total;
};

const originalClearCart = cart.clearCart;
cart.clearCart = function () {
  const result = originalClearCart.call(this);
  couponSelect.value = ""; //Reset coupon selection

  // Remove discount info if it exist
  const discountInfoElement = document.getElementById("discount-info");
  if (discountInfoElement) {
    discountInfoElement.remove();
  }

  return result;
};

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
})

// TO-DO: make the app dark mode or light mode vice versa

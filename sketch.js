let currentScreen = 'home'; // Possible values: 'home', 'selectProduct', 'checkout'
let products = [
  { name: "Water", price: 1.00, img: "water.png", nutrition: "Calories: 0\nFat: 0g\nSugar: 0g" },
  { name: "Coke", price: 1.50, img: "coke.png", nutrition: "Calories: 140\nFat: 0g\nSugar: 39g" },
  { name: "Diet Coke", price: 1.50, img: "dietcoke.png", nutrition: "Calories: 140\nFat: 0g\nSugar: 39g" },
  { name: "Oreos", price: 2.00, img: "oreos.jpg", nutrition: "Calories: 110\nFat: 0g\nSugar: 20g" },
  { name: "Doritos", price: 5.00, img: "doritos.png", nutrition: "Calories: 147\nFat: 5g\nSugar: 40g" },
  { name: "Reese's Cups", price: 5.00, img: "reese.png", nutrition: "Calories: 231.8\nFat: 13g\nSugar: 21.2g" },
  { name: "Kind Bar", price: 5.00, img: "kind.png", nutrition: "Calories: 231.8\nFat: 13g\nSugar: 21.2g" },
  { name: "Cheetos", price: 5.00, img: "cheetos.png", nutrition: "Calories: 231.8\nFat: 13g\nSugar: 21.2g" },
  { name: "Stabucks Brew", price: 5.00, img: "coldbrew.png", nutrition: "Calories: 231.8\nFat: 13g\nSugar: 21.2g" },
  { name: "Beef Jerky", price: 5.00, img: "beef.png", nutrition: "Calories: 231.8\nFat: 13g\nSugar: 21.2g" },
  { name: "Celsius", price: 5.00, img: "celsius.jpg", nutrition: "Calories: 231.8\nFat: 13g\nSugar: 21.2g" },

];
let selectedProduct = {};
let selectedQuantity = 1;
let productImage;
let nutritionText = "";
let productY; 
let isAnimating = false; 

function setup() {
  createCanvas(600, 1200);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  productImage = loadImage("oreos.jpg"); // Placeholder for actual product images
}

function draw() {
  background(255, 182, 193); // Use a pleasant background color
  
  if (currentScreen === 'home') {
    drawHomeScreen();
  } else if (currentScreen === 'selectProduct') {
    drawProductSelectionScreen();
  } else if (currentScreen === 'checkout') {
    drawCheckoutScreen();
  }
}

function drawHomeScreen() {
  fill(255); // White text
  textSize(32);
  text("Digital Vending Machine", width / 2, height / 3);
  
  // Start button
  fill(230,230,250); // Green button
  rect(width / 2, height / 2, 200, 50, 20);
  fill(0); // Black text
  textSize(24);
  text("Start", width / 2, height / 2);
}

function drawProductSelectionScreen() {
  clear(); // Clear the canvas before drawing the new screen
  background(255, 182, 193); // Reapply background
  
  fill(255); // White text
  textSize(24);
  text("Select a Product", width / 2, 50);
  
  products.forEach((product, index) => {
    let startY = 100 + index * 50; // Adjusted for clarity
    fill(230,230,250); // Green button
    rect(width / 2, startY, 200, 40, 20);
    fill(0); // Black text for product name
    text(product.name, width / 2, startY);
  });

  if (selectedProduct.name) {
    drawProductDetails();
    text("Go to Checkout", width / 2, 900);
  }
}

function drawProductDetails() {
  // Assume productImage is a placeholder for actual image loading
  fill(255); // Background for product details
  rect(width / 2, height / 2 + 150, 250, 180); // Background rect for details
  
  image(productImage, width / 2 - 100, height / 2 + 100, 100, 100); // Display product image
  
  fill(0); // Text color
  textSize(16);
  text(`Nutrition:\n${nutritionText}`, width / 2 + 50, height / 2 + 100); // Display nutritional info
  
  // Quantity selection
  text(`Quantity: ${selectedQuantity}`, width / 2, 820);
  fill(230,230,250); // Light green buttons
  rect(width / 2 - 60, 820, 20, 20); // Minus button
  rect(width / 2 + 60, 820, 20, 20); // Plus button
  fill(0); // Text color for buttons
  textSize(20);
  text("-", width / 2 - 60, 820);
  text("+", width / 2 + 60, 820);

}

function mousePressed() {
  // Home Screen Start Button
  if (currentScreen === 'home') {
    let btnWidth = 200;
    let btnHeight = 50;
    let btnX = width / 2 - btnWidth / 2;
    let btnY = height / 2 - btnHeight / 2;
    if (mouseX > btnX && mouseX < btnX + btnWidth && mouseY > btnY && mouseY < btnY + btnHeight) {
      currentScreen = 'selectProduct';
      redraw(); // Redraw the screen to update the view
    }
  }

  // Product Selection Screen - Product Buttons
  if (currentScreen === 'selectProduct') {
    let startY = 100;
    let btnHeight = 40;
    let spacing = 50; // Spacing between buttons
    products.forEach((product, index) => {
      let btnY = startY + index * spacing - btnHeight / 2;
      if (mouseY > btnY && mouseY < btnY + btnHeight) {
        selectedProduct = product;
        nutritionText = selectedProduct.nutrition; // Load nutritional info
        productImage = loadImage(selectedProduct.img); // Dynamically load the selected product's image
        selectedQuantity = 1; // Reset quantity for new selection
        redraw(); // Redraw to show selected product details
      }
    });
    let btnWidth = 150;
    let btnHeight2 = 40;
    let btnX = width / 2 - btnWidth / 2;
    let btnY = 900 - btnHeight / 2;

    if (mouseX > btnX && mouseX < btnX + btnWidth && mouseY > btnY && mouseY < btnY + btnHeight2) {
      currentScreen = 'checkout';
      redraw(); // Ensure the screen is updated to show the checkout screen
    }

    // Check for Quantity +/- Buttons
    if (dist(mouseX, mouseY, width / 2 - 60, 820) < 10 && selectedQuantity > 1) {
      selectedQuantity--; // Decrease quantity
      redraw();
    } else if (dist(mouseX, mouseY, width / 2 + 60, 820) < 10) {
      selectedQuantity++; // Increase quantity
      redraw();
    }
  }

  if (currentScreen === 'checkout') {
    let btnWidth = 200;
    let btnHeight = 50;
    let btnX = width / 2 - btnWidth / 2;
    let btnY = 300 - btnHeight / 2;

    if (mouseX > btnX && mouseX < btnX + btnWidth && mouseY > btnY && mouseY < btnY + btnHeight) {
      let total = selectedProduct.price * selectedQuantity;
      alert(`Total Price: $${total.toFixed(2)}`);
      // After showing total, you can choose to go back to the home screen or stay on checkout for further actions
      // Example: Return to home screen
      currentScreen = 'home'; // Reset to start a new transaction
      selectedProduct = {}; // Reset selected product
      selectedQuantity = 1; // Reset quantity
      redraw(); // Redraw to update the view to the home screen
    }
  }

  // Add other screen interactions as needed
}

// Ensure you replace placeholder image URLs with actual paths to your images


function drawCheckoutScreen() {
  fill(255); // White text
  textSize(24);
  text("Checkout", width / 2, 50);
  
  text(`Product: ${selectedProduct.name}`, width / 2, 120);
  text(`Price: $${selectedProduct.price}`, width / 2, 160);
  text(`Quantity: ${selectedQuantity}`, width / 2, 200);
  
  // Calculate Total Price
  let totalPrice = selectedProduct.price * selectedQuantity;
  text(`Total: $${totalPrice.toFixed(2)}`, width / 2, 240); // Display Total Price
  
  // Check out button is drawn here but checked in mousePressed
  fill(230,230,250); // Light gray button
  rect(width / 2, 300, 200, 50, 20);
  fill(0); // Black text
  text("Check out", width / 2, 300);
}

  
  function checkCheckoutScreenClick() {
    let btnWidth = 200;
    let btnHeight = 50;
    let btnX = width / 2 - btnWidth / 2;
    let btnY = 300 - btnHeight / 2;
    if (mouseX > btnX && mouseX < btnX + btnWidth && mouseY > btnY && mouseY < btnY + btnHeight) {
      let total = selectedProduct.price * selectedQuantity;
      alert(`Total Price: $${total.toFixed(2)}`);
      currentScreen = 'home'; // Optionally reset to home or to a confirmation screen
    }
  }

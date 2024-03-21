function calculateRewardRate(products) {
  // Step 1: Initialize variables to store category revenues and costs
  let categoryRevenues = {};
  let categoryCosts = {};

  // Step 2: Calculate total revenue and cost for each category
  products.forEach((product) => {
    let category = product.category;
    let revenue = product.price * product.quantity;
    let cost = product.cost * product.quantity; // Assuming each product has a 'cost' attribute

    // Update category revenues and costs
    if (!categoryRevenues[category]) {
      categoryRevenues[category] = 0;
      categoryCosts[category] = 0;
    }
    categoryRevenues[category] += revenue;
    categoryCosts[category] += cost;
  });

  console.log("Category Wise Revenu: ", categoryRevenues);
  console.log("Category Cost : ", categoryCosts);

  // Step 3: Calculate profit margin for each category
  let categoryProfitMargin = {};
  for (let category in categoryRevenues) {
    let revenue = categoryRevenues[category];
    let cost = categoryCosts[category];
    categoryProfitMargin[category] = (revenue - cost) / revenue;
  }
  console.log("Category Reward Margin: ", categoryProfitMargin);

  // Step 4: Determine reward percentage for each category (increase with quantity)
  let categoryBaseRewardPercentage = {
    electronic: 50, // Base reward percentage for electronics
    clothing: 20, // Base reward percentage for clothing
    cosmetics: 20, // Base reward percentage for cosmetics
  };

  // Step 5: Calculate reward rate for each category (adjust based on quantity)
  let rewardRates = {};
  for (let category in categoryProfitMargin) {
    let profitMargin = categoryProfitMargin[category];
    let baseRewardPercentage = categoryBaseRewardPercentage[category];
    let rewardPercentage =
      baseRewardPercentage *
      (1 +
        products.filter((product) => product.category === category)[0]
          .quantity /
          10); // Increase by 10% for each item
    rewardRates[category] = profitMargin * (rewardPercentage / 100);
  }

  console.log("Reward Rates Category Wise:", rewardRates);

  let sum = Object.values(rewardRates).reduce((acc, val) => acc + val, 0);

  return Math.round(sum * 1000);
}

// Example usage:
let products = [
  // {
  //   id: 1,
  //   name: "Smartphone",
  //   price: 50000,
  //   cost: 44000,
  //   quantity: 1,
  //   category: "electronic",
  // },
  // { id: 2, name: "T-shirt", price: 250, cost : 200, quantity: 10, category: "clothing" },
  // { id: 3, name: "Lipstick", price: 150,cost : 100,  quantity: 1, category: "cosmetics" }
  {
    id: 2,
    name: "Smart Watch",
    price: 2949,
    cost: 2500,
    quantity: 1,
    category: "electronic",
  },
];

const reward = calculateRewardRate(products);

console.log(reward);

// New Approach:
// Sample data representing the cart items and their categories
// const cartItems = [
//   { name: 'Smartphone', category: 'Electronics', price: 15000, quantity: 1 },
//   { name: 'Laptop', category: 'Electronics', price: 60000, quantity: 1 },
//   { name: 'Lipstick', category: 'Cosmetics', price: 250, quantity: 2 },
//   { name: 'Dress', category: 'Fashion', price: 800, quantity: 1 }
// ];

// // Sample profit margins for each category
// const profitMargins = {
//   Electronics: 0.2, // 20%
//   Cosmetics: 0.1, // 10%
//   Fashion: 0.15 // 15%
// };

// // Function to calculate points for each category based on profit margin
// function calculatePoints(cartItems, profitMargins) {
//   const categoryPoints = {};

//   // Calculate points for each category
//   cartItems.forEach(item => {
//       const category = item.category;
//       const price = item.price * item.quantity;
//       const profitMargin = profitMargins[category];
//       const points = Math.floor(price * profitMargin);

//       if (categoryPoints[category]) {
//           categoryPoints[category] += points;
//       } else {
//           categoryPoints[category] = points;
//       }
//   });

//   return categoryPoints;
// }

// // Function to calculate total points
// function calculateTotalPoints(categoryPoints) {
//   let totalPoints = 0;

//   // Sum up points from all categories
//   for (const category in categoryPoints) {
//       totalPoints += categoryPoints[category];
//   }

//   return totalPoints;
// }

// // Simulate payment completion
// function processPayment(cartItems, profitMargins) {
//   // Calculate points for each category
//   const categoryPoints = calculatePoints(cartItems, profitMargins);

//   // Calculate total points
//   const totalPoints = calculateTotalPoints(categoryPoints);

//   // Return total points
//   return totalPoints;
// }

// Simulate payment completion and reward allocation
// const totalPoints = processPayment(cartItems, profitMargins);
// console.log('Total points awarded:', totalPoints);

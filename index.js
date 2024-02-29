function calculateRewardRate(products) {
  // Step 1: Initialize variables to store category revenues and costs
  let categoryRevenues = {};
  let categoryCosts = {};


  // Step 2: Calculate total revenue and cost for each category
  products.forEach(product => {
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
  console.log("Category Cost : " , categoryCosts);

  // Step 3: Calculate profit margin for each category
  let categoryProfitMargin = {};
  for (let category in categoryRevenues) {
      let revenue = categoryRevenues[category];
      let cost = categoryCosts[category];
      categoryProfitMargin[category] = (revenue - cost) / revenue;
  }
  console.log("Category Reward Margin: ",categoryProfitMargin)

  // Step 4: Determine reward percentage for each category (increase with quantity)
  let categoryBaseRewardPercentage = {
    "electronics": 5,   // Base reward percentage for electronics
    "clothing": 2,      // Base reward percentage for clothing
    "cosmetics": 2      // Base reward percentage for cosmetics
};

  // Step 5: Calculate reward rate for each category (adjust based on quantity)
  let rewardRates = {};
    for (let category in categoryProfitMargin) {
      let profitMargin = categoryProfitMargin[category];
      let baseRewardPercentage = categoryBaseRewardPercentage[category];
      let rewardPercentage = baseRewardPercentage * (1 + (products.filter(product => product.category === category)[0].quantity / 10)); // Increase by 10% for each item
      rewardRates[category] = profitMargin * (rewardPercentage / 100);
    }

  console.log("Reward Rates Category Wise:",rewardRates);

}

// Example usage:
let products = [
  { id: 1, name: "Smartphone", price: 50000,cost : 40000, quantity: 1, category: "electronics" },
  { id: 2, name: "T-shirt", price: 250, cost : 200, quantity: 3, category: "clothing" },
  { id: 3, name: "Lipstick", price: 150,cost : 100,  quantity: 2, category: "cosmetics" }
];

calculateRewardRate(products);


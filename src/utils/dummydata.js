export const generateDummyProducts = (count) => {
    const categories = ['Electronics', 'Clothing', 'Home Goods', 'Books', 'Toys'];
    const products = [];
    
    for (let i = 0; i < count; i++) {
      const stockQuantity = Math.floor(Math.random() * 100) + 1;
      const stockThreshold = Math.floor(Math.random() * 10) + 5;
      
      products.push({
        id: `prod-${i + 1}`,
        name: `Product ${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        price: parseFloat((Math.random() * 100 + 5).toFixed(2)),
        stockQuantity,
        stockThreshold,
        sku: `SKU-${1000 + i}`,
        image: `/api/placeholder/${300}/${200}`
      });
    }
    
    return products;
  };
  
  // Function to generate random sales data for the last 90 days
  export const generateDummySales = (products) => {
    if (!products.length) return [];
    
    const sales = [];
    const now = new Date();
    
    // Generate sales for the last 90 days
    for (let i = 0; i < 90; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      // Random number of sales per day (0-5)
      const salesPerDay = Math.floor(Math.random() * 6);
      
      for (let j = 0; j < salesPerDay; j++) {
        // Random number of items per sale (1-5)
        const itemCount = Math.floor(Math.random() * 5) + 1;
        const items = [];
        let saleTotal = 0;
        
        for (let k = 0; k < itemCount; k++) {
          const randomProduct = products[Math.floor(Math.random() * products.length)];
          const quantity = Math.floor(Math.random() * 5) + 1;
          const itemTotal = randomProduct.price * quantity;
          saleTotal += itemTotal;
          
          items.push({
            productId: randomProduct.id,
            name: randomProduct.name,
            price: randomProduct.price,
            quantity
          });
        }
        
        sales.push({
          id: `sale-${date.getTime()}-${j}`,
          date: date.toISOString(),
          items,
          total: saleTotal
        });
      }
    }
    
    return sales;
  };
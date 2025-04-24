import { useState, useEffect } from 'react';

function SalesReport({ products, salesData }) {
  const [timeFrame, setTimeFrame] = useState('30days');
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  
  useEffect(() => {
    const now = new Date();
    let startDate;
    
    switch (timeFrame) {
      case '7days':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30);
    }
    
    // Filter sales based on date range
    const filtered = salesData.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= startDate && saleDate <= now;
    });
    
    setFilteredSales(filtered);
    
    // Calculate total revenue
    const revenue = filtered.reduce((total, sale) => total + sale.total, 0);
    setTotalRevenue(revenue);
    
    // Calculate top selling products
    const productSales = {};
    filtered.forEach(sale => {
      sale.items.forEach(item => {
        if (productSales[item.productId]) {
          productSales[item.productId].quantity += item.quantity;
          productSales[item.productId].revenue += item.price * item.quantity;
        } else {
          productSales[item.productId] = {
            productId: item.productId,
            quantity: item.quantity,
            revenue: item.price * item.quantity
          };
        }
      });
    });
    
    // Convert to array and sort by quantity
    const topSellingProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          ...item,
          name: product ? product.name : 'Unknown Product',
          image: product ? product.image : null
        };
      });
    
    setTopProducts(topSellingProducts);
    
  }, [timeFrame, salesData, products]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sales Report</h2>
        <div>
          <select 
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="px-4 py-2 border rounded bg-white"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">R{totalRevenue.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Sales</h3>
          <p className="text-3xl font-bold">{filteredSales.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Avg. Order Value</h3>
          <p className="text-3xl font-bold">
            R{filteredSales.length ? (totalRevenue / filteredSales.length).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Sales</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Items</th>
                <th className="py-2 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.slice(0, 10).map(sale => (
                <tr key={sale.id} className="border-t">
                  <td className="py-2 px-4">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{sale.id}</td>
                  <td className="py-2 px-4">{sale.items.reduce((total, item) => total + item.quantity, 0)}</td>
                  <td className="py-2 px-4 text-right">R{sale.total.toFixed(2)}</td>
                </tr>
              ))}
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">No sales data for this period</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {topProducts.map(product => (
            <div key={product.productId} className="bg-gray-50 p-4 rounded">
              <div className="h-24 w-full mb-2">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
              </div>
              <h4 className="font-semibold truncate">{product.name}</h4>
              <p className="text-sm text-gray-600">Sold: {product.quantity} units</p>
              <p className="text-sm font-medium">R{product.revenue.toFixed(2)}</p>
            </div>
          ))}
          {topProducts.length === 0 && (
            <div className="col-span-full py-4 text-center text-gray-500">
              No sales data for this period
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalesReport;
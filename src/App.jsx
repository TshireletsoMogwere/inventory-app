import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm'
import Header from './components/Header';
import SalesReport from './components/SalesReport';
import { generateDummyProducts, generateDummySales } from './utils/dummydata';


function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : generateDummyProducts(10);
  });
  
  const [salesData, setSalesData] = useState(() => {
    const savedSales = localStorage.getItem('sales');
    return savedSales ? JSON.parse(savedSales) : generateDummySales(products);
  });
  
  const [activeTab, setActiveTab] = useState('products');
  const [notifications, setNotifications] = useState([]);
  
  // Save to localStorage whenever products or sales change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    checkLowStock();
  }, [products]);
  
  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(salesData));
  }, [salesData]);
  
  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
  };
  
  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };
  
  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };
  
  const checkLowStock = () => {
    const lowStockItems = products.filter(product => 
      product.stockQuantity <= product.stockThreshold
    );
    
    if (lowStockItems.length > 0) {
      lowStockItems.forEach(item => {
        alert(`Low stock alert: ${item.name} has only ${item.stockQuantity} units left!`);
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow p-6">
        {activeTab === 'products' && (
          <>
            <AddProductForm addProduct={addProduct} />
            <ProductList 
              products={products} 
              updateProduct={updateProduct} 
              deleteProduct={deleteProduct}
            />
          </>
        )}
        
        {activeTab === 'sales' && (
          <SalesReport products={products} salesData={salesData} />
        )}
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>Inventory Management System - 2025</p>
      </footer>
    </div>
  );
}

export default App;
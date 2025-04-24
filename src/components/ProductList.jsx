import { useState } from 'react';
import EditProductForm from './EditProductForm';

function ProductList({ products, updateProduct, deleteProduct }) {
  const [editingProduct, setEditingProduct] = useState(null);
  
  const handleEdit = (product) => {
    setEditingProduct(product);
  };
  
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };
  
  const handleUpdate = (updatedProduct) => {
    updateProduct(updatedProduct);
    setEditingProduct(null);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Product Inventory</h2>
      
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <EditProductForm 
              product={editingProduct} 
              updateProduct={handleUpdate} 
              cancelEdit={handleCancelEdit} 
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-50 h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">R{product.price.toFixed(2)}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  product.stockQuantity <= product.stockThreshold 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  Stock: {product.stockQuantity}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4">SKU: {product.sku}</p>
              <div className="flex justify-between">
                <button 
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
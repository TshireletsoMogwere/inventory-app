import { useState } from 'react';

function EditProductForm({ product, updateProduct, cancelEdit }) {
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    stockQuantity: product.stockQuantity,
    stockThreshold: product.stockThreshold,
    sku: product.sku,
    image: product.image
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, image: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert string values to numbers where appropriate
    const updatedProduct = {
      ...formData,
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stockQuantity),
      stockThreshold: parseInt(formData.stockThreshold)
    };
    
    updateProduct(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Price (R)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Stock Threshold</label>
          <input
            type="number"
            name="stockThreshold"
            value={formData.stockThreshold}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border rounded"
        />
        {formData.image && (
          <div className="mt-2">
            <img 
              src={formData.image} 
              alt="Product preview" 
              className="h-32 object-contain"
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={cancelEdit}
          className="mr-2 px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </div>
    </form>
  );
}

export default EditProductForm;
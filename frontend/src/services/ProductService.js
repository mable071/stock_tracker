import api from './api';

const ProductService = {
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getProductById: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (productId, productData) => {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  },

  deleteProduct: async (productId) => {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  },

  // Product Search and Filtering
  searchProducts: async (searchTerm) => {
    const response = await api.get('/products/search', {
      params: { q: searchTerm }
    });
    return response.data;
  },

  getProductsByCategory: async (categoryId) => {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  },

  // Stock Management
  updateStock: async (productId, stockData) => {
    const response = await api.put(`/products/${productId}/stock`, stockData);
    return response.data;
  },

  getLowStockProducts: async (threshold = 10) => {
    const response = await api.get('/products/low-stock', {
      params: { threshold }
    });
    return response.data;
  },

  // Product Statistics
  getProductStats: async (productId) => {
    const response = await api.get(`/products/${productId}/stats`);
    return response.data;
  },

  // Bulk Operations
  bulkUpdateProducts: async (productsData) => {
    const response = await api.put('/products/bulk-update', productsData);
    return response.data;
  },

  bulkDeleteProducts: async (productIds) => {
    const response = await api.delete('/products/bulk-delete', {
      data: { productIds }
    });
    return response.data;
  },
};

export default ProductService; 
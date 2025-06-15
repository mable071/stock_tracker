import api from './api';

const MainCategoryService = {
  getAllCategories: async () => {
    const response = await api.get('/main-categories');
    return response.data;
  },

  getCategoryById: async (categoryId) => {
    const response = await api.get(`/main-categories/${categoryId}`);
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post('/main-categories', categoryData);
    return response.data;
  },

  updateCategory: async (categoryId, categoryData) => {
    const response = await api.put(`/main-categories/${categoryId}`, categoryData);
    return response.data;
  },

  deleteCategory: async (categoryId) => {
    const response = await api.delete(`/main-categories/${categoryId}`);
    return response.data;
  },

  // Get categories with their subcategories
  getCategoriesWithSubcategories: async () => {
    const response = await api.get('/main-categories/with-subcategories');
    return response.data;
  },

  // Get category statistics
  getCategoryStats: async (categoryId) => {
    const response = await api.get(`/main-categories/${categoryId}/stats`);
    return response.data;
  },
};

export default MainCategoryService; 
import api from './api';

const SubCategoryService = {
  getAllSubCategories: async () => {
    const response = await api.get('/sub-categories');
    return response.data;
  },

  getSubCategoryById: async (subCategoryId) => {
    const response = await api.get(`/sub-categories/${subCategoryId}`);
    return response.data;
  },

  createSubCategory: async (subCategoryData) => {
    const response = await api.post('/sub-categories', subCategoryData);
    return response.data;
  },

  updateSubCategory: async (subCategoryId, subCategoryData) => {
    const response = await api.put(`/sub-categories/${subCategoryId}`, subCategoryData);
    return response.data;
  },

  deleteSubCategory: async (subCategoryId) => {
    const response = await api.delete(`/sub-categories/${subCategoryId}`);
    return response.data;
  },

  // Get subcategories by main category
  getSubCategoriesByMainCategory: async (mainCategoryId) => {
    const response = await api.get(`/sub-categories/main-category/${mainCategoryId}`);
    return response.data;
  },

  // Get subcategory statistics
  getSubCategoryStats: async (subCategoryId) => {
    const response = await api.get(`/sub-categories/${subCategoryId}/stats`);
    return response.data;
  },
};

export default SubCategoryService; 
import api from './api';

const StockMovementService = {
  getAllMovements: async (params = {}) => {
    const response = await api.get('/stock-movements', { params });
    return response.data;
  },

  getMovementById: async (movementId) => {
    const response = await api.get(`/stock-movements/${movementId}`);
    return response.data;
  },

  createMovement: async (movementData) => {
    const response = await api.post('/stock-movements', movementData);
    return response.data;
  },

  updateMovement: async (movementId, movementData) => {
    const response = await api.put(`/stock-movements/${movementId}`, movementData);
    return response.data;
  },

  deleteMovement: async (movementId) => {
    const response = await api.delete(`/stock-movements/${movementId}`);
    return response.data;
  },

  // Movement Type Specific
  getMovementsByType: async (type) => {
    const response = await api.get(`/stock-movements/type/${type}`);
    return response.data;
  },

  // Product-specific Movements
  getMovementsByProduct: async (productId) => {
    const response = await api.get(`/stock-movements/product/${productId}`);
    return response.data;
  },

  // Date Range Movements
  getMovementsByDateRange: async (startDate, endDate) => {
    const response = await api.get('/stock-movements/by-date-range', {
      params: { startDate, endDate }
    });
    return response.data;
  },

  // Movement Statistics
  getMovementStats: async (params = {}) => {
    const response = await api.get('/stock-movements/stats', { params });
    return response.data;
  },

  // Reference-specific Movements
  getMovementsByReference: async (referenceType, referenceId) => {
    const response = await api.get(`/stock-movements/reference/${referenceType}/${referenceId}`);
    return response.data;
  },

  // Bulk Movement Operations
  createBulkMovements: async (movementsData) => {
    const response = await api.post('/stock-movements/bulk', movementsData);
    return response.data;
  },

  // Movement Validation
  validateMovement: async (movementData) => {
    const response = await api.post('/stock-movements/validate', movementData);
    return response.data;
  },

  // Movement Reversal
  reverseMovement: async (movementId, reason) => {
    const response = await api.post(`/stock-movements/${movementId}/reverse`, { reason });
    return response.data;
  },
};

export default StockMovementService; 
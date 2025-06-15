import api from './api';

const SaleService = {
  getAllSales: async (params = {}) => {
    const response = await api.get('/sales', { params });
    return response.data;
  },

  getSaleById: async (saleId) => {
    const response = await api.get(`/sales/${saleId}`);
    return response.data;
  },

  createSale: async (saleData) => {
    const response = await api.post('/sales', saleData);
    return response.data;
  },

  updateSale: async (saleId, saleData) => {
    const response = await api.put(`/sales/${saleId}`, saleData);
    return response.data;
  },

  deleteSale: async (saleId) => {
    const response = await api.delete(`/sales/${saleId}`);
    return response.data;
  },

  // Sale Status Management
  updateSaleStatus: async (saleId, status) => {
    const response = await api.put(`/sales/${saleId}/status`, { status });
    return response.data;
  },

  // Sale Items Management
  addSaleItem: async (saleId, itemData) => {
    const response = await api.post(`/sales/${saleId}/items`, itemData);
    return response.data;
  },

  updateSaleItem: async (saleId, itemId, itemData) => {
    const response = await api.put(`/sales/${saleId}/items/${itemId}`, itemData);
    return response.data;
  },

  removeSaleItem: async (saleId, itemId) => {
    const response = await api.delete(`/sales/${saleId}/items/${itemId}`);
    return response.data;
  },

  // Sale Statistics and Reports
  getSaleStats: async (params = {}) => {
    const response = await api.get('/sales/stats', { params });
    return response.data;
  },

  getSalesByDateRange: async (startDate, endDate) => {
    const response = await api.get('/sales/by-date-range', {
      params: { startDate, endDate }
    });
    return response.data;
  },

  // Customer-specific Sales
  getSalesByCustomer: async (customerId) => {
    const response = await api.get(`/sales/customer/${customerId}`);
    return response.data;
  },

  // Sale Processing
  processSale: async (saleId) => {
    const response = await api.put(`/sales/${saleId}/process`);
    return response.data;
  },

  cancelSale: async (saleId, reason) => {
    const response = await api.put(`/sales/${saleId}/cancel`, { reason });
    return response.data;
  },

  // Refund Management
  createRefund: async (saleId, refundData) => {
    const response = await api.post(`/sales/${saleId}/refund`, refundData);
    return response.data;
  },

  getRefunds: async (saleId) => {
    const response = await api.get(`/sales/${saleId}/refunds`);
    return response.data;
  },
};

export default SaleService; 
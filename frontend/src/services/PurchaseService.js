import api from './api';

const PurchaseService = {
  getAllPurchases: async () => {
    const response = await api.get('/purchases');
    return response.data;
  },

  getPurchaseById: async (purchaseId) => {
    const response = await api.get(`/purchases/${purchaseId}`);
    return response.data;
  },

  createPurchase: async (purchaseData) => {
    const response = await api.post('/purchases', purchaseData);
    return response.data;
  },

  updatePurchase: async (purchaseId, purchaseData) => {
    const response = await api.put(`/purchases/${purchaseId}`, purchaseData);
    return response.data;
  },

  deletePurchase: async (purchaseId) => {
    const response = await api.delete(`/purchases/${purchaseId}`);
    return response.data;
  },

  // Purchase Status Management
  updatePurchaseStatus: async (purchaseId, status) => {
    const response = await api.put(`/purchases/${purchaseId}/status`, { status });
    return response.data;
  },

  // Purchase Items Management
  addPurchaseItem: async (purchaseId, itemData) => {
    const response = await api.post(`/purchases/${purchaseId}/items`, itemData);
    return response.data;
  },

  updatePurchaseItem: async (purchaseId, itemId, itemData) => {
    const response = await api.put(`/purchases/${purchaseId}/items/${itemId}`, itemData);
    return response.data;
  },

  removePurchaseItem: async (purchaseId, itemId) => {
    const response = await api.delete(`/purchases/${purchaseId}/items/${itemId}`);
    return response.data;
  },

  // Purchase Statistics and Reports
  getPurchaseStats: async (purchaseId) => {
    const response = await api.get(`/purchases/${purchaseId}/stats`);
    return response.data;
  },

  getPurchaseByDateRange: async (startDate, endDate) => {
    const response = await api.get('/purchases/by-date-range', {
      params: { startDate, endDate }
    });
    return response.data;
  },

  // Supplier-specific Purchases
  getPurchasesBySupplier: async (supplierId) => {
    const response = await api.get(`/purchases/supplier/${supplierId}`);
    return response.data;
  },

  // Purchase Approval Workflow
  approvePurchase: async (purchaseId) => {
    const response = await api.put(`/purchases/${purchaseId}/approve`);
    return response.data;
  },

  rejectPurchase: async (purchaseId, reason) => {
    const response = await api.put(`/purchases/${purchaseId}/reject`, { reason });
    return response.data;
  },
};

export default PurchaseService; 
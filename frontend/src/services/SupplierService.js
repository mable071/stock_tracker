import api from './api';

const SupplierService = {
  getAllSuppliers: async () => {
    const response = await api.get('/suppliers');
    return response.data;
  },

  getSupplierById: async (supplierId) => {
    const response = await api.get(`/suppliers/${supplierId}`);
    return response.data;
  },

  createSupplier: async (supplierData) => {
    const response = await api.post('/suppliers', supplierData);
    return response.data;
  },

  updateSupplier: async (supplierId, supplierData) => {
    const response = await api.put(`/suppliers/${supplierId}`, supplierData);
    return response.data;
  },

  deleteSupplier: async (supplierId) => {
    const response = await api.delete(`/suppliers/${supplierId}`);
    return response.data;
  },

  // Get supplier statistics
  getSupplierStats: async (supplierId) => {
    const response = await api.get(`/suppliers/${supplierId}/stats`);
    return response.data;
  },
};

export default SupplierService; 
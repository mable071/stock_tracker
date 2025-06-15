import React, { useState, useEffect } from 'react';
import SupplierService from '../services/SupplierService';
import AddSupplierModal from '../components/modals/suppliers/AddSupplierModal';
import UpdateSupplierModal from '../components/modals/suppliers/UpdateSupplierModal';
import DeleteSupplierModal from '../components/modals/suppliers/DeleteSupplierModal';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await SupplierService.getAllSuppliers();
      setSuppliers(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch suppliers');
      console.error('Error fetching suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    fetchSuppliers();
  };

  const handleUpdateSuccess = () => {
    setIsUpdateModalOpen(false);
    setSelectedSupplier(null);
    fetchSuppliers();
  };

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    setSelectedSupplier(null);
    fetchSuppliers();
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchSuppliers}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Supplier
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{supplier.contact_email || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{supplier.contact_phone || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      supplier.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {supplier.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(supplier)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(supplier)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

      <UpdateSupplierModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedSupplier(null);
        }}
        onSuccess={handleUpdateSuccess}
        supplierId={selectedSupplier?.id}
      />

      <DeleteSupplierModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSupplier(null);
        }}
        onSuccess={handleDeleteSuccess}
        supplierId={selectedSupplier?.id}
        supplierName={selectedSupplier?.name}
      />
    </div>
  );
};

export default SuppliersPage; 
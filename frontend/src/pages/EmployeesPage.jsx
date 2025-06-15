import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import AddUserModal from '../components/modals/users/AddUserModal';
import UpdateUserModal from '../components/modals/users/UpdateUserModal';
import DeleteUserModal from '../components/modals/users/DeleteUserModal';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await UserService.getAllUsers();
      // Filter only employees (users with role 'employee')
      const employeeUsers = response.data.filter(user => user.role === 'employee');
      setEmployees(employeeUsers);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees. Please try again later.');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddSuccess = () => {
    fetchEmployees();
    setShowAddModal(false);
  };

  const handleUpdateSuccess = () => {
    fetchEmployees();
    setShowUpdateModal(false);
    setSelectedEmployee(null);
  };

  const handleDeleteSuccess = () => {
    fetchEmployees();
    setShowDeleteModal(false);
    setSelectedEmployee(null);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={fetchEmployees}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Employee
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
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
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{employee.full_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{employee.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {employee.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee)}
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

      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
        defaultRole="employee"
      />

      {selectedEmployee && (
        <>
          <UpdateUserModal
            isOpen={showUpdateModal}
            onClose={() => {
              setShowUpdateModal(false);
              setSelectedEmployee(null);
            }}
            onSuccess={handleUpdateSuccess}
            userId={selectedEmployee.id}
          />

          <DeleteUserModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedEmployee(null);
            }}
            onSuccess={handleDeleteSuccess}
            userId={selectedEmployee.id}
            userName={selectedEmployee.full_name}
          />
        </>
      )}
    </div>
  );
};

export default EmployeesPage; 
import React, { useState, useEffect } from 'react';
import MainCategoryService from '../services/MainCategoryService';
import SubCategoryService from '../services/SubCategoryService';
import AddMainCategoryModal from '../components/modals/categories/AddMainCategoryModal';
import UpdateMainCategoryModal from '../components/modals/categories/UpdateMainCategoryModal';
import DeleteMainCategoryModal from '../components/modals/categories/DeleteMainCategoryModal';
import AddSubCategoryModal from '../components/modals/categories/AddSubCategoryModal';
import UpdateSubCategoryModal from '../components/modals/categories/UpdateSubCategoryModal';
import DeleteSubCategoryModal from '../components/modals/categories/DeleteSubCategoryModal';

const CategoriesPage = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showAddMainModal, setShowAddMainModal] = useState(false);
  const [showUpdateMainModal, setShowUpdateMainModal] = useState(false);
  const [showDeleteMainModal, setShowDeleteMainModal] = useState(false);
  const [showAddSubModal, setShowAddSubModal] = useState(false);
  const [showUpdateSubModal, setShowUpdateSubModal] = useState(false);
  const [showDeleteSubModal, setShowDeleteSubModal] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const [mainResponse, subResponse] = await Promise.all([
        MainCategoryService.getAllCategories(),
        SubCategoryService.getAllSubCategories()
      ]);
      setMainCategories(mainResponse);
      setSubCategories(subResponse);
      setError(null);
    } catch (err) {
      setError('Failed to fetch categories. Please try again later.');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleMainCategoryAddSuccess = () => {
    fetchCategories();
    setShowAddMainModal(false);
  };

  const handleMainCategoryUpdateSuccess = () => {
    fetchCategories();
    setShowUpdateMainModal(false);
    setSelectedMainCategory(null);
  };

  const handleMainCategoryDeleteSuccess = () => {
    fetchCategories();
    setShowDeleteMainModal(false);
    setSelectedMainCategory(null);
  };

  const handleSubCategoryAddSuccess = () => {
    fetchCategories();
    setShowAddSubModal(false);
  };

  const handleSubCategoryUpdateSuccess = () => {
    fetchCategories();
    setShowUpdateSubModal(false);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryDeleteSuccess = () => {
    fetchCategories();
    setShowDeleteSubModal(false);
    setSelectedSubCategory(null);
  };

  const handleMainCategoryEdit = (category) => {
    setSelectedMainCategory(category);
    setShowUpdateMainModal(true);
  };

  const handleMainCategoryDelete = (category) => {
    setSelectedMainCategory(category);
    setShowDeleteMainModal(true);
  };

  const handleSubCategoryEdit = (category) => {
    setSelectedSubCategory(category);
    setShowUpdateSubModal(true);
  };

  const handleSubCategoryDelete = (category) => {
    setSelectedSubCategory(category);
    setShowDeleteSubModal(true);
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
            onClick={fetchCategories}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Categories Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Main Categories</h2>
            <button
              onClick={() => setShowAddMainModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Main Category
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mainCategories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          category.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {category.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleMainCategoryEdit(category)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleMainCategoryDelete(category)}
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
        </div>

        {/* Sub Categories Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Sub Categories</h2>
            <button
              onClick={() => setShowAddSubModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Sub Category
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
                    Main Category
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
                {subCategories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {mainCategories.find(mc => mc.id === category.main_category_id)?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          category.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {category.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleSubCategoryEdit(category)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleSubCategoryDelete(category)}
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
        </div>
      </div>

      {/* Modals */}
      <AddMainCategoryModal
        isOpen={showAddMainModal}
        onClose={() => setShowAddMainModal(false)}
        onSuccess={handleMainCategoryAddSuccess}
      />

      {selectedMainCategory && (
        <>
          <UpdateMainCategoryModal
            isOpen={showUpdateMainModal}
            onClose={() => {
              setShowUpdateMainModal(false);
              setSelectedMainCategory(null);
            }}
            onSuccess={handleMainCategoryUpdateSuccess}
            categoryId={selectedMainCategory.id}
          />

          <DeleteMainCategoryModal
            isOpen={showDeleteMainModal}
            onClose={() => {
              setShowDeleteMainModal(false);
              setSelectedMainCategory(null);
            }}
            onSuccess={handleMainCategoryDeleteSuccess}
            categoryId={selectedMainCategory.id}
            categoryName={selectedMainCategory.name}
          />
        </>
      )}

      <AddSubCategoryModal
        isOpen={showAddSubModal}
        onClose={() => setShowAddSubModal(false)}
        onSuccess={handleSubCategoryAddSuccess}
      />

      {selectedSubCategory && (
        <>
          <UpdateSubCategoryModal
            isOpen={showUpdateSubModal}
            onClose={() => {
              setShowUpdateSubModal(false);
              setSelectedSubCategory(null);
            }}
            onSuccess={handleSubCategoryUpdateSuccess}
            subCategoryId={selectedSubCategory.id}
          />

          <DeleteSubCategoryModal
            isOpen={showDeleteSubModal}
            onClose={() => {
              setShowDeleteSubModal(false);
              setSelectedSubCategory(null);
            }}
            onSuccess={handleSubCategoryDeleteSuccess}
            subCategoryId={selectedSubCategory.id}
            subCategoryName={selectedSubCategory.name}
          />
        </>
      )}
    </div>
  );
};

export default CategoriesPage; 
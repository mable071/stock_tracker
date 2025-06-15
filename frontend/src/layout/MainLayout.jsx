import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/products', label: 'Products', icon: '📦' },
    { path: '/categories', label: 'Categories', icon: '🏷️' },
    { path: '/stock-movements', label: 'Stock Movement', icon: '🔄' },
    { path: '/sales', label: 'Sales', icon: '💰' },
    { path: '/purchases', label: 'Purchases', icon: '🛒' },
    { path: '/employees', label: 'Employees', icon: '👥' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/suppliers', label: 'Suppliers', icon: '�' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 w-64`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-primary-600">Stock Tracker</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
            <span className="sr-only">Close sidebar</span>
            ✕
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-lg ${
                location.pathname === item.path
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-full px-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="sr-only">Open sidebar</span>
              ☰
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <span className="sr-only">Notifications</span>
                🔔
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <span className="sr-only">Profile</span>
                👤
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
         <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 
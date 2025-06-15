const Dashboard = () => {
  const stats = [
    { title: 'Total Products', value: '1,234', change: '+12%', icon: '📦' },
    { title: 'Total Sales', value: '$45,678', change: '+8%', icon: '💰' },
    { title: 'Total Purchases', value: '$23,456', change: '-3%', icon: '🛒' },
    { title: 'Low Stock Items', value: '23', change: '-5%', icon: '⚠️' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 bg-primary-50 rounded-full">
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm font-medium ${
                  stat.change.startsWith('+')
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-600"> from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary-50 rounded-full">
                  <span>📝</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Product stock updated
                  </p>
                  <p className="text-sm text-gray-600">iPhone 13 Pro Max</p>
                </div>
              </div>
              <span className="text-sm text-gray-600">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
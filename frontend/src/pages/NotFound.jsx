import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-900">
          Page not found
        </p>
        <p className="mt-2 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 
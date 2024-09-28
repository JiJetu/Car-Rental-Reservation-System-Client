import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
        >
          Go to Home
        </Link>
        <Link
          to="/signIn"
          className="ml-4 px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center px-4">
        <h1 className="mb-4 text-8xl font-bold text-gray-800">404</h1>
        <p className="mb-2 text-2xl font-semibold text-gray-700">Page Not Found</p>
        <p className="mb-8 text-lg text-gray-500">
          Looks like you've ventured into uncharted territory. Let's get you back on track!
        </p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

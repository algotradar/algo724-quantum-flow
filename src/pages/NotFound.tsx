
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-algo-dark-green">
      <div className="text-center glass-card p-12 max-w-md">
        <h1 className="text-6xl font-display font-bold mb-4 text-algo-lime">404</h1>
        <p className="text-xl text-gray-300 mb-6">This page doesn't exist in your algorithm</p>
        <Link to="/" className="px-6 py-3 bg-algo-lime text-algo-dark-green font-medium rounded-lg hover:bg-opacity-90 transition-colors">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

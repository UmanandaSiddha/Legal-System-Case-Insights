import React from "react";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-x-4">
      {/* Login Button */}
      <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
        Log in →
      </button>

      {/* Get Started Button */}
      <button className="px-4 py-2 bg-[#5C53E9] text-white rounded-md hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>
  );
};

export default AuthButtons;

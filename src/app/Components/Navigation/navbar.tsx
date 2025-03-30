import React from "react";
import Link from "next/link";
import AuthButtons from "../AuthButtons/Login";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-white shadow-md flex justify-between items-center px-8 sticky top-0">
      {/* Logo */}
      <div className="text-gray-600 text-lg font-semibold">Legal</div>

      {/* Navigation Links */}
      <ul className="flex gap-x-8 text-gray-700">
        <li>
          <Link href="/LandingPage" className="hover:text-blue-600 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/About" className="hover:text-blue-600 transition">
            About
          </Link>
        </li>
        <li>
          <Link href="/FAQ" className="hover:text-blue-600 transition">
            FAQ
          </Link>
        </li>
      </ul>

      <AuthButtons />
    </div>
  );
};

export default Navbar;

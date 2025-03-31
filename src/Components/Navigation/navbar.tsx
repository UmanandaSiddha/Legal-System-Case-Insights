import React from "react";
import Link from "next/link";
import AuthButtons from "../AuthButtons/AuthButtons";

const Navbar = () => {
  return (
    <div className="w-full h-20 shadow-md flex justify-between items-center px-8 sticky top-0 bg-white">
      {/* Logo */}
      <div className="text-gray-600 text-lg font-semibold">Legal Case Summarizer</div>

      {/* Navigation Links */}
      <ul className="flex gap-x-8 text-gray-700">
        <li>
          <Link href="/" className="hover:text-[#5C53E9] transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/About" className="hover:text-[#5C53E9] transition">
            About
          </Link>
        </li>
        <li>
          <Link href="/FAQ" className="hover:text-[#5C53E9] transition">
            FAQ
          </Link>
        </li>
      </ul>

      <AuthButtons />
    </div>
  );
};

export default Navbar;

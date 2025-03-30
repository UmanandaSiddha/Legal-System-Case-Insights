"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Edit,
  List,
  Bell,
  User,
  Users,
  Settings,
  Upload,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname(); // Get current path

  // Function to check if link is active
  const isActive = (path: string) => pathname === path;

  // Hide sidebar on homepage
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col justify-between fixed top-0 left-0">
      <div>
        <div className="p-6">
          <Link href="/">
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </Link>
        </div>

        <nav className="flex flex-col gap-y-2">
          <Link
            href="/"
            className={`flex items-center gap-3 p-4 ${
              isActive("/")
                ? "text-indigo-700 bg-indigo-100 rounded-lg font-bold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Home size={20} /> Home
          </Link>

          <Link
            href="/SearchCases"
            className={`flex items-center gap-3 p-4 ${
              isActive("/SearchCases")
                ? "text-indigo-700 bg-indigo-100 rounded-lg font-bold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Edit size={20} /> Browse
          </Link>

          <Link
            href="/cases"
            className={`flex items-center gap-3 p-4 ${
              isActive("/cases")
                ? "text-indigo-700 bg-indigo-100 rounded-lg font-bold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <List size={20} /> My Cases
          </Link>

          <Link
            href="/Notifications"
            className={`flex items-center gap-3 p-4 ${
              isActive("/Notifications")
                ? "text-indigo-700 bg-indigo-100 rounded-lg font-bold"
                : "text-gray-600 hover:bg-gray-100"
            } relative`}
          >
            <Bell size={20} /> Notifications
            <span className="absolute right-6 top-4 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              1
            </span>
          </Link>

          <Link
            href="/profile"
            className={`flex items-center gap-3 p-4 ${
              isActive("/profile")
                ? "text-indigo-700 bg-indigo-100 rounded-lg font-bold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User size={20} /> My Profile
          </Link>

          <Link
            href="/MyGroups"
            className={`flex items-center gap-3 p-4 ${
              isActive("/MyGroups")
                ? "text-indigo-700 bg-indigo-100 rounded-lg font-bold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users size={20} /> My Groups
          </Link>

          <Link
            href="/settings"
            className={`flex items-center gap-3 p-4 ${
              isActive("/settings")
                ? "text-indigo-700 bg-indigo-100 rounded-lg font-bold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </div>

      <div className="p-4 flex flex-col gap-y-4">
        <Link
          href="/UploadCase"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg flex items-center justify-center"
        >
          <Upload size={18} className="mr-2" />
          Upload a new case
        </Link>

        <Link
          href="/logout"
          className="flex items-center gap-3 p-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          <LogOut size={20} /> Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

"use client";
import { useState } from "react";
import { Search, Users, Folder } from "lucide-react";

export default function BrowseGroups() {
  const groups = [
    {
      id: 1,
      name: "Corporate Legal Team",
      description: "Lorem ipsum dolor sit amet...",
      members: 7,
      cases: 12,
    },
    {
      id: 2,
      name: "Corporate Legal Team",
      description: "Lorem ipsum dolor sit amet...",
      members: 7,
      cases: 12,
    },
    {
      id: 3,
      name: "Corporate Legal Team",
      description: "Lorem ipsum dolor sit amet...",
      members: 7,
      cases: 12,
    },
    {
      id: 4,
      name: "Corporate Legal Team",
      description: "Lorem ipsum dolor sit amet...",
      members: 7,
      cases: 12,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto text-black">
      {/* Header section with title and buttons */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Groups</h1>
          <p className="text-gray-600">Manage your groups</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border border-[#5C53E9] text-[#5C53E9] bg-white rounded-lg font-medium hover:bg-[#5C53E9] hover:text-white transition">
            Join Group
          </button>
          <button className="px-6 py-3 bg-[#5C53E9] text-white rounded-lg font-medium hover:bg-[#4838e3] transition">
            Create Group
          </button>
        </div>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{group.name}</h3>
            <p className="text-gray-600 mb-4">{group.description}</p>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Users className="text-[#5C53E9]" size={20} />
                <span className="text-[#5C53E9] font-medium">
                  {group.members} members
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="text-gray-500" size={20} />
                <span className="text-gray-500">{group.cases} cases</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 border border-[#5C53E9] text-[#5C53E9] bg-white rounded-lg font-medium hover:bg-[#5C53E9] hover:text-white transition">
                Invite
              </button>
              <button className="px-4 py-2 bg-[#5C53E9] text-white rounded-lg font-medium hover:bg-[#4838e3] transition">
                View Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

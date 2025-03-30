"use client";

import { useState } from "react";
import { Search } from "lucide-react";

// Input Component
function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className={`border p-2 rounded w-full ${className}`} {...props} />
  );
}

// Button Component
function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 bg-purple-600 text-white rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Card Components
function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border p-4 rounded shadow ${className}`}>{children}</div>
  );
}
function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 font-bold">{children}</div>;
}
function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}
function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-600">{children}</div>;
}

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
    name: "Criminal Defense Team",
    description: "Dedicated to defending justice...",
    members: 10,
    cases: 8,
  },
  {
    id: 3,
    name: "Privacy Law Experts",
    description: "Focused on digital privacy rights...",
    members: 5,
    cases: 15,
  },
  {
    id: 4,
    name: "Environmental Law Taskforce",
    description: "Advocating for environmental policies...",
    members: 9,
    cases: 11,
  },
];

export default function BrowseGroups() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">My Groups</h1>
      <p className="text-gray-600 mb-4">Manage your groups</p>
      <div className="flex gap-4 mb-6">
        <Button className="border border-purple-600 text-purple-600 bg-transparent">
          Join Group
        </Button>
        <Button>Create Group</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="p-6 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{group.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-purple-600 font-semibold">
                  👥 {group.members} members
                </p>
                <p className="text-gray-500">{group.cases} cases</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="border border-purple-600 text-purple-600 bg-transparent">
                  Invite
                </Button>
                <Button>View Group</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

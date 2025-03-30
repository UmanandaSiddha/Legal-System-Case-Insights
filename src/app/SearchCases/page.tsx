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

// Select Component
function Select({
  onValueChange,
  children,
  ...props
}: {
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      className="border p-2 rounded"
      onChange={(e) => onValueChange(e.target.value)}
      {...props}
    >
      {children}
    </select>
  );
}
function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <option value={value}>{children}</option>;
}

const cases = [
  {
    id: 1,
    title: "Landmark Privacy Case",
    description: "A major ruling on digital privacy rights.",
    status: "Pending",
    category: "Privacy Law",
  },
];

export default function SearchCases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const filteredCases = cases.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Browse Cases</h1>
      <p className="text-gray-600 mb-4">Search and explore legal cases</p>
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search for cases ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button>
          <Search className="w-5 h-5" />
        </Button>
        <Select onValueChange={setStatus}>
          <SelectItem value="">Status</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Resolved">Resolved</SelectItem>
        </Select>
        <Select onValueChange={setCategory}>
          <SelectItem value="">Category</SelectItem>
          <SelectItem value="Privacy Law">Privacy Law</SelectItem>
          <SelectItem value="Criminal Law">Criminal Law</SelectItem>
        </Select>
      </div>
      <div className="space-y-4">
        {filteredCases.map((caseItem) => (
          <Card key={caseItem.id}>
            <CardHeader>
              <CardTitle>{caseItem.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{caseItem.description}</p>
              <p className="text-sm text-gray-500">Status: {caseItem.status}</p>
              <p className="text-sm text-gray-500">
                Category: {caseItem.category}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SearchCases() {
  const [cases, setCases] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedCases = localStorage.getItem("uploadedCases");
    if (storedCases) {
      setCases(JSON.parse(storedCases));
    }
  }, []);

  const filteredCases = cases.filter((item) =>
    item.caseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen text-black p-8">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-auto shadow-lg">
        <div className="px-8 py-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Search Cases</h1>

          <input
            type="text"
            placeholder="Search by case name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg mb-6"
          />

          {filteredCases.length > 0 ? (
            <div className="space-y-6">
              {filteredCases.map((item, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold">{item.caseName}</h2>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-gray-500">Category: {item.category}</p>
                  <p className="text-gray-500">
                    Public: {item.isPublic ? "Yes" : "No"}
                  </p>

                  {item.file && (
                    <div className="mt-4">
                      <p className="text-gray-700">File:</p>
                      <a
                        href={item.file}
                        download={item.fileName}
                        className="text-blue-500 underline"
                      >
                        {item.fileName}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No cases found.</p>
          )}

          <div className="mt-8">
            <Link href="/MyCases" className="text-purple-600 underline">
              View My Cases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

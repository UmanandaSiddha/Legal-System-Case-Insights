"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyCases() {
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    const storedCases = localStorage.getItem("uploadedCases");
    if (storedCases) {
      setCases(JSON.parse(storedCases));
    }
  }, []);

  const handleDelete = (index: number) => {
    const updatedCases = [...cases];
    updatedCases.splice(index, 1); // Remove the case at the given index
    setCases(updatedCases);
    localStorage.setItem("uploadedCases", JSON.stringify(updatedCases));
    alert("Case deleted successfully!");
  };

  return (
    <div className="min-h-screen text-black p-8">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-auto shadow-lg">
        <div className="px-8 py-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">My Cases</h1>

          {cases.length > 0 ? (
            <div className="space-y-6">
              {cases.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-sm relative"
                >
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

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No cases uploaded yet.</p>
          )}

          <div className="mt-8">
            <Link href="/SearchCases" className="text-purple-600 underline">
              Go to Search Cases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

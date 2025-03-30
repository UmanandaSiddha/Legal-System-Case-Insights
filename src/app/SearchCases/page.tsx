"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SearchCases() {
  const [cases, setCases] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [enteredPasswords, setEnteredPasswords] = useState<{
    [key: string]: string;
  }>({});
  const [showPasswordPrompt, setShowPasswordPrompt] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const storedCases = localStorage.getItem("uploadedCases");
    if (storedCases) {
      setCases(JSON.parse(storedCases));
    }
  }, []);

  const categories = ["All", ...new Set(cases.map((item) => item.category))];

  const filteredCases = cases.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.caseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePasswordChange = (index: number, password: string) => {
    setEnteredPasswords((prev) => ({
      ...prev,
      [index]: password,
    }));
  };

  const verifyPassword = (index: number, correctPassword: string | null) => {
    if (enteredPasswords[index] === correctPassword) {
      setShowPasswordPrompt((prev) => ({
        ...prev,
        [index]: false,
      }));
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="px-8 py-6 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-4">Search Cases</h1>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by case name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-lg mb-6"
        />

        {/* Case List */}
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

                {!item.isPublic ? (
                  showPasswordPrompt[index] ? (
                    <div className="mt-2">
                      <input
                        type="password"
                        placeholder="Enter password"
                        value={enteredPasswords[index] || ""}
                        onChange={(e) =>
                          handlePasswordChange(index, e.target.value)
                        }
                        className="border border-gray-300 p-2 rounded-lg"
                      />
                      <button
                        className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => verifyPassword(index, item.password)}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <button
                      className="mt-2 text-blue-600 underline"
                      onClick={() =>
                        setShowPasswordPrompt((prev) => ({
                          ...prev,
                          [index]: true,
                        }))
                      }
                    >
                      Enter Password to View
                    </button>
                  )
                ) : (
                  item.file && (
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
                  )
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
  );
}

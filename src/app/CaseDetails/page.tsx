"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CaseDetails() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("id");

  const [caseData, setCaseData] = useState<any>(null);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (caseId) {
      const storedCases = localStorage.getItem("uploadedCases");
      if (storedCases) {
        const cases = JSON.parse(storedCases);
        const selectedCase = cases.find((c: any) => c.id === caseId);
        if (selectedCase) setCaseData(selectedCase);
      }
    }
  }, [caseId]);

  const handlePasswordSubmit = () => {
    if (caseData?.password === password) {
      setIsAuthorized(true);
    } else {
      alert("Incorrect password!");
    }
  };

  if (!caseData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="px-8 py-6 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-4">
          {caseData.caseName}
        </h1>

        {/* Case Overview */}
        <div className="border p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold">Case Overview</h2>
          <div className="flex items-center gap-4 mt-2">
            <span className="bg-gray-200 px-3 py-1 rounded-full">
              {caseData.category}
            </span>
            <span className="bg-green-200 px-3 py-1 rounded-full">Active</span>
            <span className="bg-blue-200 px-3 py-1 rounded-full">
              {caseData.file ? "Files Attached" : "No Files"}
            </span>
          </div>
        </div>

        {/* Password Prompt for Private Cases */}
        {!caseData.isPublic && !isAuthorized ? (
          <div className="border p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold">This case is private</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full mt-2"
            />
            <button
              onClick={handlePasswordSubmit}
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        ) : (
          <>
            {/* Case Summary */}
            <div className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Case Summary</h2>
              <p className="text-gray-600">{caseData.description}</p>
            </div>

            {/* Case Files */}
            {caseData.file && (
              <div className="mt-4 border p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Files</h2>
                <a
                  href={caseData.file}
                  download={caseData.fileName}
                  className="text-blue-500 underline"
                >
                  {caseData.fileName}
                </a>
              </div>
            )}

            {/* Chat Section */}
            <div className="mt-6 border p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Chat</h2>
              <div className="h-40 border p-2 rounded-lg bg-gray-100 overflow-y-auto">
                <p className="text-gray-600">I would be glad to help</p>
                <p className="text-gray-600">Actually there is.</p>
                <p className="text-gray-600">
                  I need to know the privacy policy of your business in a very
                  short summary.
                </p>
              </div>
              <input
                type="text"
                placeholder="Type a query..."
                className="border border-gray-300 p-2 rounded-lg w-full mt-2"
              />
            </div>
          </>
        )}

        {/* Back to Cases */}
        <div className="mt-8">
          <Link href="/SearchCases" className="text-purple-600 underline">
            Back to Cases
          </Link>
        </div>
      </div>
    </div>
  );
}

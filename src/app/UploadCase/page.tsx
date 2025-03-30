"use client";
import { useState, useRef, ChangeEvent } from "react";

export default function UploadCase() {
  const [caseName, setCaseName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setShowCategoryDropdown(false);
  };

  const handleCancel = () => {
    setCaseName("");
    setDescription("");
    setCategory("");
    setIsPublic(true);
    setPassword("");
    setFile(null);
  };

  const handleSubmit = () => {
    if (
      !caseName ||
      !description ||
      !category ||
      (!isPublic && !password) ||
      !file
    ) {
      alert("Please fill out all fields and upload a file.");
      return;
    }

    // Prepare the case data
    const reader = new FileReader();
    reader.onload = () => {
      const caseData = {
        caseName,
        description,
        category,
        isPublic,
        password: isPublic ? null : password,
        file: reader.result, // Store file data as base64
        fileName: file.name,
      };

      const storedCases = localStorage.getItem("uploadedCases");
      const cases = storedCases ? JSON.parse(storedCases) : [];

      cases.push(caseData);
      localStorage.setItem("uploadedCases", JSON.stringify(cases));

      alert("Case uploaded successfully!");

      // Clear form fields
      setCaseName("");
      setDescription("");
      setCategory("");
      setIsPublic(true);
      setPassword("");
      setFile(null);
    };

    reader.readAsDataURL(file);
  };

  // Array of category options
  const categoryOptions: string[] = [
    "Civil",
    "Criminal",
    "Corporate",
    "Family",
    "Environmental",
    "Others",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="px-8 py-6 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-2">Upload a Case</h1>
        <p className="text-gray-600 mb-6">Upload a case for AI analysis</p>

        <div className="space-y-6">
          {/* Case Name */}
          <div>
            <label className="block font-semibold mb-2">Case Name</label>
            <input
              type="text"
              placeholder="Type the case name"
              value={caseName}
              onChange={(e) => setCaseName(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg"
            />
          </div>

          {/* Case Description */}
          <div>
            <label className="block font-semibold mb-2">Case Description</label>
            <textarea
              placeholder="Enter a brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg"
              rows={5}
            />
          </div>

          {/* Category and Public Case */}
          <div className="flex gap-6">
            <div className="w-1/2 relative">
              <label className="block font-semibold mb-2">Category</label>
              <input
                type="text"
                placeholder="Select category"
                value={category}
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="border border-gray-300 p-3 w-full rounded-lg cursor-pointer"
                readOnly
              />
              {showCategoryDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  {categoryOptions.map((cat) => (
                    <div
                      key={cat}
                      className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCategorySelect(cat)}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-1/2">
              <label className="block font-semibold mb-2">Public Case</label>
              <div
                className="flex items-center justify-between border border-gray-300 p-3 rounded-lg cursor-pointer"
                onClick={() => setIsPublic(!isPublic)}
              >
                <span className="text-gray-500">
                  {isPublic ? "Anyone can view" : "Password required"}
                </span>
                <div
                  className={`w-12 h-6 rounded-full transition-all ${
                    isPublic ? "bg-[#5C53E9]" : "bg-gray-300"
                  } relative`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${
                      isPublic ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Password Input (Only if Private) */}
          {!isPublic && (
            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg"
              />
            </div>
          )}

          {/* Upload Files */}
          <div>
            <label className="block font-semibold mb-2">Upload Files</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              className="bg-[#5C53E9] text-white px-6 py-3 rounded-lg"
              onClick={() => fileInputRef.current?.click()}
            >
              {file ? `File: ${file.name}` : "Browse files"}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: .pdf, .doc, .jpg, .png
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              className="px-6 py-3 border border-red-500 text-red-500 rounded-lg"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 bg-[#5C53E9] text-white rounded-lg"
              onClick={handleSubmit}
            >
              Create Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

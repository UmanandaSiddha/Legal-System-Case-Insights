"use client";

import { useState } from "react";

export default function UploadCase() {
  const [caseName, setCaseName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Upload a Case</h1>
      <p className="text-gray-600 mb-4">Upload a case for AI analysis</p>

      <label className="block font-semibold mt-4">Case Name</label>
      <input
        type="text"
        placeholder="Type the case name"
        value={caseName}
        onChange={(e) => setCaseName(e.target.value)}
        className="border p-2 w-full rounded mt-1"
      />

      <label className="block font-semibold mt-4">Case Description</label>
      <textarea
        placeholder="Enter a brief description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded mt-1"
        rows={4}
      />

      <div className="flex gap-4 mt-4">
        <div className="w-1/2">
          <label className="block font-semibold">Category</label>
          <select
            className="border p-2 w-full rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Civil">Civil</option>
            <option value="Criminal">Criminal</option>
            <option value="Corporate">Corporate</option>
            <option value="Family">Family</option>
            <option value="Environmental">Environmental</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="w-1/2">
          <label className="block font-semibold">Public Case</label>
          <div className="flex items-center gap-2 border p-2 rounded">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="cursor-pointer"
            />
            <span className="text-gray-600">Anyone can view this case</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Upload Files</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="border p-2 w-full rounded mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Supported formats: .pdf, .doc, .jpg, .png
        </p>
      </div>

      <div className="flex justify-end mt-6 gap-4">
        <button className="px-4 py-2 border rounded text-red-600">
          Cancel
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded">
          Create Case
        </button>
      </div>
    </div>
  );
}

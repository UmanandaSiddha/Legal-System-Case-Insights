"use client";
import { useState, useRef, ChangeEvent } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
    setEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black px-8 py-6">
      <div className="max-w-2xl w-full bg-gray-100 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>

        {/* Profile Picture */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={profilePic || "/placeholder.png"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-gray-300"
          />
          {editing && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                className="absolute bottom-2 right-2 bg-gray-600 text-white p-2 rounded-full text-xs"
                onClick={() => fileInputRef.current?.click()}
              >
                📷
              </button>
            </>
          )}
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            {editing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg"
              />
            ) : (
              <p className="text-lg">{name}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            {editing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg"
              />
            ) : (
              <p className="text-lg">{email}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {editing ? (
            <>
              <button
                className="px-6 py-3 bg-gray-500 text-white rounded-lg"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 bg-[#5C53E9] text-white rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          ) : (
            <button
              className="px-6 py-3 bg-[#5C53E9] text-white rounded-lg"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function Features(){
  return (
    <section className="py-4 px-4 max-w-6xl mx-auto text-[#000] mb-24">
      <div className="text-center mb-24">
        <h2 className="text-4xl font-bold mb-6">
          <span className="text-black">How </span>
          <span className="text-indigo-500">Legal Case Summarizer</span>
          <span className="text-black"> Works</span>
        </h2>

        <p className="text-lg max-w-3xl mx-auto">
          The Legal Case Summarizer is perfect for lawyers, law students, legal
          researchers, journalists, and anyone needing to understand the key
          points of a legal case without going through the entire text.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature Card 1 */}
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-3">Powerful Case Search</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
        </div>

        {/* Feature Card 2 */}
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-3">AI Powered Insights</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
        </div>

        {/* Feature Card 3 */}
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-3">Interactive Chat</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
        </div>

        {/* Feature Card 4 */}
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-bold mb-3">
            Secure Document Management
          </h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet...</p>
        </div>
      </div>
    </section>
  );
};

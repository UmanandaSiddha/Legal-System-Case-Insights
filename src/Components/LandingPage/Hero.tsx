// pages/index.js
import Head from "next/head";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Legal Case Summarizer</title>
        <meta name="description" content="AI-powered legal case summarizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-16 gap-16">
          <div className="text-left md:mr-8">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-black">Legal Case</span>
              <br />
              <span className="text-[#5C53E9]">Summarizer</span>
            </h1>

            <p className="text-lg text-gray-800 mb-6">
              An AI-powered tool designed to streamline the reading and
              comprehension of legal cases.
            </p>

            <p className="text-lg text-gray-800 mb-10">
              It efficiently extracts key points, arguments, and conclusions,
              transforming complex legal information into clear, accessible
              summaries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#5C53E9] hover:bg-[#554DD3] text-white px-8 py-3 rounded-md text-lg font-medium transition-colors">
                Browse Cases
              </button>

              <button className="border border-[#5C53E9] text-[#5C53E9] px-8 py-3 rounded-md text-lg font-medium transition-colors">
                Upload a new case
              </button>
            </div>
          </div>

          <div className="mt-10 md:mt-0">
            <div className="relative w-32 h-24 md:w-80 md:h-80">
              <Image
                src="/placeholder.png" //replace here
                alt="Working Demo"
                layout="fill"
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

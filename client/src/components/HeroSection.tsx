import React from "react";

export default function HeroSection() {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-primary to-blue-500 rounded-xl shadow-lg p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4">Your AI Study Partner for CBSE, JEE & BITSAT</h1>
          <p className="text-lg mb-6">Get instant help with Class 11th & 12th CBSE science subjects, JEE Mains preparation, and BITSAT exam guidance.</p>
          <div className="flex flex-wrap gap-4 mb-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Physics</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Chemistry</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Mathematics</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Biology</span>
          </div>
        </div>
      </div>
    </section>
  );
}

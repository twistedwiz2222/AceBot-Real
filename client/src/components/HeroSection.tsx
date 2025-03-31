import React from "react";
import { BookOpen, BookText } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-primary to-blue-500 rounded-xl shadow-lg p-8 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="/acebot-logo.svg" 
              alt="AceBot Logo" 
              className="h-16 w-auto"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-sans mb-1">Your AI Study Partner</h1>
              <p className="text-lg">for CBSE, JEE & BITSAT</p>
            </div>
          </div>
          <p className="text-lg mb-6">Get instant help with Class 11th & 12th CBSE science subjects, JEE Mains preparation, and BITSAT exam guidance.</p>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Physics</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Chemistry</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Mathematics</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Biology</span>
          </div>
          
          <div className="mt-4 bg-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5" />
              Powered by Textbook Knowledge
            </h3>
            <p className="text-sm mb-2">Now integrated with comprehensive knowledge from these standard textbooks:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div className="flex items-start gap-2">
                <BookText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-semibold block">Physics</span>
                  <span className="text-xs opacity-90">H.C. Verma, DC Pandey, I.E. Irodov</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BookText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-semibold block">Chemistry</span>
                  <span className="text-xs opacity-90">NCERT, MS Chouhan, OP Tandon</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BookText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-semibold block">Mathematics</span>
                  <span className="text-xs opacity-90">RD Sharma, NCERT, Cengage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

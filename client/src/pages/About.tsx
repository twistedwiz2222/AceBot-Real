import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
                About AceBot
              </h1>
            </div>
            
            <div className="space-y-8 text-foreground">
              <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800 mb-8">
                <p className="text-lg italic">
                  This project is just a fun idea and a way for me to learn. I hope everyone using it enjoys the experience! 
                  There are many things that still need fixing, but since I don't have the funds right now, some issues might remain. 
                  However, I'll keep improving and do better with my next idea. Thanks for checking it out!
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">How Quizy Works</h2>
                <p className="text-lg mb-4">
                  My AI-powered learning companion Quizy has been trained on standard textbooks including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg">
                  <li><span className="font-medium">Physics:</span> H.C. Verma and NCERT</li>
                  <li><span className="font-medium">Chemistry:</span> NCERT and MS Chouhan</li>
                  <li><span className="font-medium">Mathematics:</span> NCERT and RD Sharma</li>
                  <li><span className="font-medium">Biology:</span> NCERT Class 11-12</li>
                </ul>
                <p className="text-lg mt-4">
                  This specialized knowledge allows my AI to provide curriculum-specific answers,
                  explanations, and learning resources tailored to your exact needs.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-medium mb-2 text-primary">Smart Textbook Analysis</h3>
                    <p>
                      Analyze specific chapters and topics from your textbooks for instant summaries and concept explanations.
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-medium mb-2 text-primary">Subject-Specific Assistant</h3>
                    <p>
                      Ask questions about Physics, Chemistry, Mathematics, or Biology and receive accurate, curriculum-aligned answers.
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-medium mb-2 text-primary">Exam Preparation</h3>
                    <p>
                      Get focused support for CBSE Boards, JEE Mains, and BITSAT preparation with targeted resources.
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-lg shadow-sm border">
                    <h3 className="text-xl font-medium mb-2 text-primary">Personalized Learning</h3>
                    <p>
                      Receive customized learning paths and resources based on your specific areas of interest or difficulty.
                    </p>
                  </div>
                </div>
              </section>
              
              <section className="text-center mt-12 border-t pt-8">
                <p className="text-xl font-medium bg-gradient-to-r from-blue-500 to-primary text-transparent bg-clip-text inline-block">
                  Created by Kabir Sinha
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
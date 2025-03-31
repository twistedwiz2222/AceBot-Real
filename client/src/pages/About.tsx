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
              <img 
                src="/acebot-logo.svg" 
                alt="AceBot Logo" 
                className="h-20 w-auto mb-4" 
              />
              <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
                About AceBot
              </h1>
            </div>
            
            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-lg">
                  AceBot is dedicated to revolutionizing CBSE Class 11-12 science education and exam preparation 
                  through cutting-edge AI technology. We aim to make quality education more accessible, 
                  personalized, and effective for students preparing for CBSE Boards, JEE Mains, and BITSAT.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">How Quizy Works</h2>
                <p className="text-lg mb-4">
                  Our AI-powered learning companion Quizy has been trained on standard textbooks including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-lg">
                  <li><span className="font-medium">Physics:</span> H.C. Verma and NCERT</li>
                  <li><span className="font-medium">Chemistry:</span> NCERT and MS Chouhan</li>
                  <li><span className="font-medium">Mathematics:</span> NCERT and RD Sharma</li>
                  <li><span className="font-medium">Biology:</span> NCERT Class 11-12</li>
                </ul>
                <p className="text-lg mt-4">
                  This specialized knowledge allows our AI to provide curriculum-specific answers,
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
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-lg">
                  We envision a future where every student has access to personalized, high-quality education support
                  that adapts to their unique learning style and pace. AceBot is committed to continuously improving
                  our platform and Quizy to make complex science subjects more approachable and help students achieve 
                  their academic goals.
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
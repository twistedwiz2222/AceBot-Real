import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ChatInterface from "@/components/ChatInterface";
import Sidebar from "@/components/Sidebar";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
  ]);
  
  const [selectedExamType, setSelectedExamType] = React.useState<string>("All");
  
  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject);
      } else {
        return [...prev, subject];
      }
    });
  };

  const handleExamTypeChange = (examType: string) => {
    setSelectedExamType(examType);
  };

  return (
    <div className="bg-background font-sans text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <HeroSection />
        
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar 
            selectedSubjects={selectedSubjects} 
            onSubjectChange={handleSubjectChange} 
            selectedExamType={selectedExamType}
            onExamTypeChange={handleExamTypeChange}
          />
          
          <div className="w-full md:w-3/4">
            <ChatInterface 
              selectedSubjects={selectedSubjects} 
              selectedExamType={selectedExamType} 
            />
            <FeaturesSection />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

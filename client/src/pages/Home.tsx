import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ChatInterface from "@/components/ChatInterface";
import Sidebar from "@/components/Sidebar";
import FeaturesSection from "@/components/FeaturesSection";
import BookAnalysis from "@/components/BookAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageCircle } from "lucide-react";

export default function Home() {
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
  ]);
  
  const [selectedExamType, setSelectedExamType] = React.useState<string>("All");
  const [activeTab, setActiveTab] = React.useState("chat");
  
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
            <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>AI Chat</span>
                </TabsTrigger>
                <TabsTrigger value="books" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Physics Books</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat">
                <ChatInterface 
                  selectedSubjects={selectedSubjects} 
                  selectedExamType={selectedExamType} 
                />
              </TabsContent>
              
              <TabsContent value="books">
                <BookAnalysis />
              </TabsContent>
            </Tabs>
            
            <FeaturesSection />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

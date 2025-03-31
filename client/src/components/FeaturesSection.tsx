import React from "react";
import { 
  Lightbulb,
  Puzzle, 
  GraduationCap
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-card dark:bg-card p-6 rounded-lg shadow-sm border dark:border-gray-800 hover:shadow-md transition-shadow">
        <div className="text-purple-600 dark:text-purple-400 mb-4">
          <Lightbulb className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold mb-2 font-sans">Concept Explanations</h3>
        <p className="text-muted-foreground">Clear explanations of complex topics from CBSE syllabus with examples and illustrations.</p>
      </div>
      
      <div className="bg-card dark:bg-card p-6 rounded-lg shadow-sm border dark:border-gray-800 hover:shadow-md transition-shadow">
        <div className="text-blue-600 dark:text-blue-400 mb-4">
          <Puzzle className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold mb-2 font-sans">Problem Solving</h3>
        <p className="text-muted-foreground">Step-by-step solutions to practice problems tailored for JEE Mains and BITSAT exams.</p>
      </div>
      
      <div className="bg-card dark:bg-card p-6 rounded-lg shadow-sm border dark:border-gray-800 hover:shadow-md transition-shadow">
        <div className="text-primary dark:text-primary mb-4">
          <GraduationCap className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold mb-2 font-sans">Exam Preparation</h3>
        <p className="text-muted-foreground">Focused guidance on important topics, previous year questions, and exam strategies.</p>
      </div>
    </div>
  );
}

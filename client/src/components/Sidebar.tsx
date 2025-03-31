import React from "react";
import { Label } from "@/components/ui/label";

interface SidebarProps {
  selectedSubjects: string[];
  onSubjectChange: (subject: string) => void;
}

interface TopicItem {
  subject: string;
  topics: string[];
}

const quickTopics: TopicItem[] = [
  {
    subject: "Physics",
    topics: ["Kinematics", "Newton's Laws", "Electrostatics"]
  },
  {
    subject: "Chemistry",
    topics: ["Periodic Table", "Chemical Bonding", "Organic Chemistry"]
  },
  {
    subject: "Mathematics",
    topics: ["Calculus", "Coordinate Geometry", "Probability"]
  },
  {
    subject: "Biology",
    topics: ["Cell Structure", "Human Physiology", "Genetics"]
  }
];

export default function Sidebar({
  selectedSubjects,
  onSubjectChange
}: SidebarProps) {
  const subjectColors: Record<string, string> = {
    "Physics": "text-primary",
    "Chemistry": "text-blue-600 dark:text-blue-400",
    "Mathematics": "text-purple-600 dark:text-purple-400",
    "Biology": "text-green-600 dark:text-green-400"
  };

  return (
    <aside className="w-full md:w-1/4">
      <div className="bg-card dark:bg-card rounded-lg shadow-sm border dark:border-gray-800 p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4 font-sans">Subjects</h2>
        <ul className="space-y-2 list-disc pl-5">
          {["Physics", "Chemistry", "Mathematics", "Biology"].map((subject) => (
            <li 
              key={subject} 
              className={`cursor-pointer p-1 rounded hover:bg-accent ${selectedSubjects.includes(subject) ? 'font-medium ' + subjectColors[subject] : ''}`}
              onClick={() => onSubjectChange(subject)}
            >
              {subject}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-card dark:bg-card rounded-lg shadow-sm border dark:border-gray-800 p-6">
        <h2 className="font-semibold text-lg mb-4 font-sans">Quick Topics</h2>
        {quickTopics.map((item) => (
          <div key={item.subject} className="mb-4">
            <div className="flex items-center mb-2">
              <span className={`font-medium ${subjectColors[item.subject] || "text-primary"}`}>
                {item.subject}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.topics.map((topic) => (
                <span 
                  key={topic} 
                  className="px-3 py-1 bg-accent/50 dark:bg-accent/30 text-foreground text-xs rounded-full cursor-pointer hover:bg-accent/70 dark:hover:bg-accent/50"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

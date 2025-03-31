import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
        <div className="space-y-2">
          {["Physics", "Chemistry", "Mathematics", "Biology"].map((subject) => (
            <div key={subject} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-accent">
              <Checkbox 
                id={`subject-${subject}`}
                checked={selectedSubjects.includes(subject)}
                onCheckedChange={() => onSubjectChange(subject)}
              />
              <Label htmlFor={`subject-${subject}`}>{subject}</Label>
            </div>
          ))}
        </div>
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

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, BookOpen, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { formatMessage } from "@/lib/chatUtils";

// Popular physics books for JEE/CBSE
const POPULAR_BOOKS = [
  "H.C. Verma's Concepts of Physics Vol 1",
  "H.C. Verma's Concepts of Physics Vol 2",
  "D.C. Pandey Physics for JEE",
  "I.E. Irodov Problems in General Physics",
  "Resnick & Halliday Physics",
  "S.L. Arora Physics"
];

// Common physics topics
const PHYSICS_TOPICS = [
  "Mechanics",
  "Thermodynamics",
  "Electrostatics",
  "Current Electricity",
  "Magnetism",
  "Electromagnetic Induction",
  "Optics",
  "Modern Physics",
  "Waves & Oscillations"
];

export default function BookAnalysis() {
  const [bookName, setBookName] = useState<string>("");
  const [customBook, setCustomBook] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [customTopic, setCustomTopic] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("popular");
  const [analysis, setAnalysis] = useState<string>("");
  
  const { toast } = useToast();
  
  const analyzeBookMutation = useMutation({
    mutationFn: async () => {
      const finalBookName = activeTab === "popular" ? bookName : customBook;
      const finalTopic = topic === "custom" ? customTopic : topic;
      
      const response = await apiRequest(
        "POST",
        "/api/analyze-physics-book",
        {
          bookName: finalBookName,
          topic: finalTopic || undefined,
          chapter: chapter || undefined
        }
      );
      
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${data.bookName}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to analyze the book. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  const handleAnalyzeBook = () => {
    const finalBookName = activeTab === "popular" ? bookName : customBook;
    
    if (!finalBookName) {
      toast({
        title: "Book Required",
        description: "Please select or enter a book to analyze",
        variant: "destructive"
      });
      return;
    }
    
    analyzeBookMutation.mutate();
  };
  
  // Handle book select change
  const handleBookSelect = (value: string) => {
    setBookName(value);
  };
  
  // Handle topic select change  
  const handleTopicSelect = (value: string) => {
    setTopic(value);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Physics Book Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-1 p-6">
          <h3 className="text-lg font-semibold mb-4">Book Selection</h3>
          
          <Tabs defaultValue="popular" onValueChange={setActiveTab}>
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="popular" className="flex-1">Popular Books</TabsTrigger>
              <TabsTrigger value="custom" className="flex-1">Custom Book</TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select a Book</label>
                <Select value={bookName} onValueChange={handleBookSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a physics book" />
                  </SelectTrigger>
                  <SelectContent>
                    {POPULAR_BOOKS.map((book) => (
                      <SelectItem key={book} value={book}>
                        {book}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="custom">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Enter Book Name</label>
                <Input
                  value={customBook}
                  onChange={(e) => setCustomBook(e.target.value)}
                  placeholder="e.g., NCERT Physics Class 12"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Topic (Optional)</label>
            <Select value={topic} onValueChange={handleTopicSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic (optional)" />
              </SelectTrigger>
              <SelectContent>
                {PHYSICS_TOPICS.map((topicItem) => (
                  <SelectItem key={topicItem} value={topicItem}>
                    {topicItem}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom Topic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {topic === "custom" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Enter Custom Topic</label>
              <Input
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g., Rotational Dynamics"
              />
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Chapter (Optional)</label>
            <Input
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="e.g., Chapter 6 or Section 3.2"
            />
          </div>
          
          <Button 
            onClick={handleAnalyzeBook} 
            disabled={analyzeBookMutation.isPending} 
            className="w-full"
          >
            {analyzeBookMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Analyze Book
              </>
            )}
          </Button>
        </Card>
        
        <Card className="col-span-1 md:col-span-2 p-6">
          <h3 className="text-lg font-semibold mb-4">Book Analysis</h3>
          
          {analyzeBookMutation.isPending ? (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
              <p className="text-muted-foreground">Analyzing physics content...</p>
            </div>
          ) : analysis ? (
            <div className="prose dark:prose-invert max-w-none h-[600px] overflow-y-auto p-4">
              <div dangerouslySetInnerHTML={{ __html: formatMessage(analysis) }} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Search className="h-16 w-16 text-muted-foreground mb-4" />
              <h4 className="text-xl font-medium mb-2">No Analysis Yet</h4>
              <p className="text-muted-foreground mb-4 max-w-md">
                Select a physics book and click "Analyze Book" to get a detailed analysis 
                of the content, problem-solving approaches, and exam relevance.
              </p>
              <div className="text-sm text-muted-foreground max-w-lg">
                <p className="mb-2">
                  <strong>Pro tip:</strong> Specify a topic or chapter for more focused analysis.
                </p>
                <p>
                  Popular choices: H.C. Verma for comprehensive concepts, D.C. Pandey for JEE preparation,
                  and I.E. Irodov for challenging problems.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
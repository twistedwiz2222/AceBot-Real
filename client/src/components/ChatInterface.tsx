import React, { useRef, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatMessage } from "@/lib/chatUtils";
import { useTheme } from "@/lib/theme-context";

interface Message {
  id?: number;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

interface ChatInterfaceProps {
  selectedSubjects: string[];
  selectedExamType: string;
}

const suggestedQuestions = [
  "Explain Newton's laws of motion",
  "Solve quadratic equation examples",
  "Explain periodic table trends",
  "Cell structure and functions"
];

export default function ChatInterface({
  selectedSubjects,
  selectedExamType
}: ChatInterfaceProps) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi there! I'm Quizy, your AceBot assistant for CBSE Class 11-12, JEE, and BITSAT preparation. What would you like help with today?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const chatMutation = useMutation({
    mutationFn: async (question: string) => {
      const subject = selectedSubjects.length === 1 ? selectedSubjects[0] : undefined;
      const examType = selectedExamType !== "All" ? selectedExamType : undefined;
      
      const response = await apiRequest(
        "POST", 
        "/api/chat", 
        { question, subject, examType }
      );
      
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: data.answer,
          timestamp: new Date()
        }
      ]);

      // If this is a fallback response, show a toast notification
      if (data.isFallback) {
        toast({
          title: "Using Offline Mode",
          description: "Using textbook-based response due to high server load. Your API key may have reached its limit.",
          variant: "destructive",
          duration: 5000
        });
      }
    },
    onError: (error) => {
      // Add the error message to the chat as if it was an assistant message
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I apologize, but I'm currently experiencing technical difficulties. Please check your internet connection and try again. If the problem persists, it might be due to API rate limits or server issues.",
          timestamp: new Date()
        }
      ]);
      
      toast({
        title: "Error",
        description: "Failed to get response. Please try again later.",
        variant: "destructive"
      });
    }
  });

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message to the state
    setMessages(prev => [
      ...prev,
      { role: "user", content: inputValue }
    ]);
    
    // Send to API
    chatMutation.mutate(inputValue);
    
    // Clear input
    setInputValue("");
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-card dark:bg-card rounded-lg shadow-sm border dark:border-gray-800 overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between bg-muted dark:bg-gray-900">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <h2 className="font-semibold font-sans">AI Assistant</h2>
        </div>
      </div>

      {/* Chat messages container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ scrollBehavior: "smooth" }}>
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : ""}`}>
            {message.role === "assistant" && (
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                Q
              </div>
            )}
            
            <div 
              className={`${
                message.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-lg rounded-tr-none ml-auto" 
                  : "bg-muted dark:bg-gray-800 text-foreground dark:text-gray-200 rounded-lg rounded-tl-none ml-3"
              } p-3 max-w-3xl`}
              dangerouslySetInnerHTML={{
                __html: formatMessage(message.content)
              }}
            />
          </div>
        ))}

        {/* Suggested questions after assistant's first message */}
        {messages.length === 1 && (
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <div 
                  key={index}
                  className="bg-primary/5 dark:bg-primary/20 border border-primary/10 dark:border-primary/30 rounded-lg p-3 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/30 transition"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <p className="text-primary dark:text-primary-foreground text-sm font-medium">{question}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {chatMutation.isPending && (
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 animate-pulse">
              Q
            </div>
            <div className="ml-3 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t dark:border-gray-800 p-4 bg-muted dark:bg-gray-900">
        <form className="flex items-center" onSubmit={handleSendMessage}>
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about CBSE, JEE or BITSAT topics..."
              className="w-full pl-4 pr-10 py-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              disabled={chatMutation.isPending}
            />
          </div>
          <Button 
            type="submit" 
            className="ml-3 p-6"
            disabled={chatMutation.isPending || !inputValue.trim()}
          >
            {chatMutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

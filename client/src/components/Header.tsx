import React from "react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/lib/theme-context";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="bg-background shadow-sm border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-2 text-xl font-bold text-primary">EduAI</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className="text-foreground hover:text-primary font-medium">Home</a>
            </Link>
            <Link href="/about">
              <a className="text-foreground hover:text-primary font-medium">About</a>
            </Link>
            <Link href="/exams">
              <a className="text-foreground hover:text-primary font-medium">Exams</a>
            </Link>
            <Link href="/resources">
              <a className="text-foreground hover:text-primary font-medium">Resources</a>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <button className="p-2 rounded-full hover:bg-accent" aria-label="Settings">
                  <Settings className="h-5 w-5 text-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Settings</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={theme === "dark"} 
                      onCheckedChange={toggleTheme} 
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <ThemeToggle />
            
            <button className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Sign In
            </button>
            
            <button className="block md:hidden text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

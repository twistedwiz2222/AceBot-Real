import React, { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Upload, BookOpen, FileText, Book, Loader2, ChevronDown, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Book type enum
type BookType = "physics" | "chemistry" | "mathematics";

// Combined chapters mapping
const bookChapters: Record<string, string[]> = {};

// Physics book options
const physicsBooks = [
  { id: "hcv", name: "H.C. Verma - Concepts of Physics" },
  { id: "ncert11_physics", name: "NCERT Physics - Class 11" },
  { id: "ncert12_physics", name: "NCERT Physics - Class 12" },
  { id: "irodov", name: "I.E. Irodov - Problems in General Physics" },
  { id: "custom", name: "Custom / Other Book" }
];

// Chemistry book options
const chemistryBooks = [
  { id: "ncert11_chemistry", name: "NCERT Chemistry - Class 11" },
  { id: "ncert12_chemistry", name: "NCERT Chemistry - Class 12" },
  { id: "msc", name: "M.S. Chouhan - Organic Chemistry" },
  { id: "custom", name: "Custom / Other Book" }
];

// Chemistry chapters
const chemistryChapters = {
  ncert11_chemistry: [
    "Some Basic Concepts of Chemistry",
    "Structure of Atom",
    "Classification of Elements and Periodicity in Properties",
    "Chemical Bonding and Molecular Structure",
    "States of Matter",
    "Thermodynamics",
    "Equilibrium",
    "Redox Reactions",
    "Hydrogen",
    "The s-Block Elements",
    "The p-Block Elements",
    "Organic Chemistry – Some Basic Principles and Techniques",
    "Hydrocarbons",
    "Environmental Chemistry"
  ],
  ncert12_chemistry: [
    "The Solid State",
    "Solutions",
    "Electrochemistry",
    "Chemical Kinetics",
    "Surface Chemistry",
    "General Principles and Processes of Isolation of Elements",
    "The p-Block Elements",
    "The d-and f-Block Elements",
    "Coordination Compounds",
    "Haloalkanes and Haloarenes",
    "Alcohols, Phenols and Ethers",
    "Aldehydes, Ketones and Carboxylic Acids",
    "Amines",
    "Biomolecules",
    "Polymers",
    "Chemistry in Everyday Life"
  ],
  msc: [
    "IUPAC Nomenclature",
    "Isomerism",
    "Organic Reaction Mechanism",
    "Stereochemistry",
    "Alkanes and Cycloalkanes",
    "Alkenes",
    "Alkynes",
    "Alkyl Halides",
    "Alcohols",
    "Ethers and Epoxides",
    "Aldehydes and Ketones",
    "Carboxylic Acids and Their Derivatives",
    "Amines",
    "Aromaticity and Aromatic Compounds",
    "Substitution Reactions",
    "Elimination Reactions",
    "Addition Reactions",
    "Organometallic Compounds",
    "Phenols",
    "Spectroscopy",
    "Rearrangement Reactions",
    "Carbohydrates",
    "Amino Acids and Proteins",
    "Heterocyclic Compounds",
    "Reagents in Organic Synthesis"
  ]
};

// Chapter options for physics books
const physicsChapters = {
  hcv: [
    "Introduction to Physics",
    "Physics and Mathematics",
    "Rest and Motion: Kinematics",
    "The Forces",
    "Newton's Laws of Motion",
    "Friction",
    "Circular Motion",
    "Work and Energy",
    "Centre of Mass, Linear Momentum, Collision",
    "Rotational Mechanics",
    "Gravitation",
    "Simple Harmonic Motion",
    "Fluid Mechanics",
    "Some Mechanical Properties of Matter",
    "Wave Motion and Waves on a String",
    "Sound Waves",
    "Light Waves",
    "Geometrical Optics",
    "Optical Instruments",
    "Dispersion and Spectra",
    "Speed of Light",
    "Photometry"
  ],
  ncert11_physics: [
    "Physical World",
    "Units and Measurements",
    "Motion in a Straight Line",
    "Motion in a Plane",
    "Laws of Motion",
    "Work, Energy and Power",
    "System of Particles and Rotational Motion",
    "Gravitation",
    "Mechanical Properties of Solids",
    "Mechanical Properties of Fluids",
    "Thermal Properties of Matter",
    "Thermodynamics",
    "Kinetic Theory",
    "Oscillations",
    "Waves"
  ],
  ncert12_physics: [
    "Electric Charges and Fields",
    "Electrostatic Potential and Capacitance",
    "Current Electricity",
    "Moving Charges and Magnetism",
    "Magnetism and Matter",
    "Electromagnetic Induction",
    "Alternating Current",
    "Electromagnetic Waves",
    "Ray Optics and Optical Instruments",
    "Wave Optics",
    "Dual Nature of Radiation and Matter",
    "Atoms",
    "Nuclei",
    "Semiconductor Electronics",
    "Communication Systems"
  ]
};

interface BookScanResult {
  title: string;
  concepts: {
    name: string;
    explanation: string;
  }[];
  summary: string;
  examples?: {
    problem: string;
    solution: string;
  }[];
  relatedTopics?: string[];
}

export default function BookScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<string>("hcv");
  const [bookName, setBookName] = useState<string>("H.C. Verma - Concepts of Physics");
  const [chapterIndex, setChapterIndex] = useState<number | null>(null);
  const [scanResults, setScanResults] = useState<BookScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create a preview URL for image files
      if (selectedFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  // Handle book selection
  const handleBookChange = (value: string) => {
    setSelectedBook(value);
    
    // Update book name based on selection
    const selectedBookObj = physicsBooks.find(book => book.id === value);
    if (selectedBookObj) {
      setBookName(selectedBookObj.name);
    }
    
    // Reset chapter selection
    setChapterIndex(null);
  };

  // Handle chapter selection
  const handleChapterChange = (value: string) => {
    const index = parseInt(value);
    setChapterIndex(index);
    
    // Update book name to include chapter
    if (selectedBook !== "custom" && bookChapters[selectedBook as keyof typeof bookChapters]) {
      const chapters = bookChapters[selectedBook as keyof typeof bookChapters];
      if (chapters && chapters[index]) {
        const book = physicsBooks.find(b => b.id === selectedBook);
        if (book) {
          setBookName(`${book.name} - Chapter: ${chapters[index]}`);
        }
      }
    }
  };

  // Handle book name input (for custom books)
  const handleBookNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookName(e.target.value);
  };

  // Mutation for scanning book
  const scanMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("No file selected");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("bookName", bookName);
      formData.append("bookId", selectedBook);
      
      // Add chapter information if selected
      if (chapterIndex !== null && selectedBook !== "custom") {
        const chapters = bookChapters[selectedBook as keyof typeof bookChapters];
        if (chapters && chapters[chapterIndex]) {
          formData.append("chapter", chapters[chapterIndex]);
          formData.append("chapterIndex", chapterIndex.toString());
        }
      }

      const response = await fetch("/api/scan-book", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to scan book");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setScanResults(data);
      
      // Generate more descriptive success message
      let successMessage = `Successfully analyzed "${bookName}"`;
      if (chapterIndex !== null && selectedBook !== "custom") {
        const chapters = bookChapters[selectedBook as keyof typeof bookChapters];
        if (chapters && chapters[chapterIndex]) {
          successMessage += ` - Chapter: ${chapters[chapterIndex]}`;
        }
      }
      
      toast({
        title: "Book Scanned Successfully",
        description: successMessage,
      });
    },
    onError: (error) => {
      toast({
        title: "Error Scanning Book",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Scan book
  const handleScanBook = () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select an image of the book page to scan",
        variant: "destructive",
      });
      return;
    }

    scanMutation.mutate();
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <Card className="bg-card dark:bg-card border dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Physics Book Scanner</CardTitle>
          <CardDescription>Upload book pages from H.C. Verma or other physics textbooks to analyze them</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="bookSelect" className="text-sm font-medium">
                  Select Book
                </label>
                <Select value={selectedBook} onValueChange={handleBookChange}>
                  <SelectTrigger id="bookSelect">
                    <SelectValue placeholder="Select a physics book" />
                  </SelectTrigger>
                  <SelectContent>
                    {physicsBooks.map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedBook !== "custom" && bookChapters[selectedBook as keyof typeof bookChapters] && (
                <div className="grid gap-2">
                  <label htmlFor="chapterSelect" className="text-sm font-medium">
                    Select Chapter
                  </label>
                  <Select 
                    value={chapterIndex !== null ? chapterIndex.toString() : ""} 
                    onValueChange={handleChapterChange}
                  >
                    <SelectTrigger id="chapterSelect">
                      <SelectValue placeholder="Select a chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {bookChapters[selectedBook as keyof typeof bookChapters].map((chapter, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {chapter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {selectedBook === "custom" && (
              <div className="grid gap-2">
                <label htmlFor="bookName" className="text-sm font-medium">
                  Custom Book Name
                </label>
                <Input
                  id="bookName"
                  placeholder="Enter custom book name"
                  value={bookName}
                  onChange={handleBookNameChange}
                />
              </div>
            )}

            <div className="grid gap-2">
              <label className="text-sm font-medium">Book Page</label>
              <div 
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-accent/50 transition-colors
                  ${scanMutation.isPending ? "opacity-50 pointer-events-none" : ""}`}
                onClick={handleUploadClick}
              >
                {previewUrl ? (
                  <div className="space-y-2">
                    <img 
                      src={previewUrl} 
                      alt="Book page preview" 
                      className="max-h-64 mx-auto object-contain"
                    />
                    <p className="text-sm text-muted-foreground">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Upload book page</p>
                      <p className="text-xs text-muted-foreground">
                        Drag and drop or click to upload
                      </p>
                    </div>
                  </div>
                )}
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={scanMutation.isPending}
                />
              </div>
            </div>

            <Button 
              onClick={handleScanBook} 
              className="w-full" 
              disabled={!file || scanMutation.isPending}
            >
              {scanMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Scan Book Page
                </>
              )}
            </Button>
          </div>

          {scanResults && (
            <div className="mt-8">
              <Tabs defaultValue="concepts">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="concepts">
                    <Book className="h-4 w-4 mr-2" />
                    Key Concepts
                  </TabsTrigger>
                  <TabsTrigger value="summary">
                    <FileText className="h-4 w-4 mr-2" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="original">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Original Text
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="concepts" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Concepts</CardTitle>
                      <CardDescription>Important physics concepts identified in this page</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {scanResults.concepts.map((concept, index) => (
                          <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                            <h4 className="font-semibold text-lg">{concept.name}</h4>
                            <p className="text-muted-foreground">{concept.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="summary" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Summary</CardTitle>
                      <CardDescription>Simplified explanation of the physics concept</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{scanResults.summary}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="original" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Original Text</CardTitle>
                      <CardDescription>Extracted text from the book page</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-muted rounded-md">
                        <p className="whitespace-pre-wrap">{scanResults.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t dark:border-gray-800 pt-4">
          <p className="text-xs text-muted-foreground">
            Note: Book scanning is most effective with clear images and standard textbook layouts
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
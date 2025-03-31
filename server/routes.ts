import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { generateAIResponse, analyzePhysicsBook } from "./openai";
import { z } from "zod";
import multer from "multer";

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat route to get AI response
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const requestSchema = z.object({
        question: z.string().min(1, "Question is required"),
        subject: z.string().optional(),
        examType: z.string().optional()
      });

      const validatedData = requestSchema.parse(req.body);
      
      // Generate AI response
      const aiResponse = await generateAIResponse(
        validatedData.question,
        validatedData.subject,
        validatedData.examType
      );
      
      // Save the conversation to storage
      const message = await storage.saveMessage({
        question: validatedData.question,
        answer: aiResponse,
        subject: validatedData.subject,
        examType: validatedData.examType
      });
      
      res.json({ 
        id: message.id,
        answer: aiResponse,
        timestamp: message.timestamp 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Error in chat endpoint:", error);
        res.status(500).json({ message: "An error occurred while processing your request." });
      }
    }
  });

  // Get conversation history
  app.get("/api/messages", async (req: Request, res: Response) => {
    try {
      const subject = req.query.subject as string | undefined;
      const examType = req.query.examType as string | undefined;
      
      let messages;
      if (subject) {
        messages = await storage.getMessagesBySubject(subject);
      } else if (examType) {
        messages = await storage.getMessagesByExamType(examType);
      } else {
        messages = await storage.getMessages();
      }
      
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "An error occurred while fetching messages." });
    }
  });

  // Physics Book Analysis route
  app.post("/api/analyze-physics-book", async (req: Request, res: Response) => {
    try {
      const requestSchema = z.object({
        bookName: z.string().min(1, "Book name is required"),
        topic: z.string().optional(),
        chapter: z.string().optional()
      });

      const validatedData = requestSchema.parse(req.body);
      
      // Analyze the physics book
      const analysis = await analyzePhysicsBook(
        validatedData.bookName,
        validatedData.topic,
        validatedData.chapter
      );
      
      // Save the analysis as a message
      const message = await storage.saveMessage({
        question: `Analyze ${validatedData.bookName} ${validatedData.topic ? `on ${validatedData.topic}` : ''} ${validatedData.chapter ? `in chapter ${validatedData.chapter}` : ''}`,
        answer: analysis,
        subject: "Physics",
        examType: "All"
      });
      
      res.json({ 
        id: message.id,
        analysis: analysis,
        bookName: validatedData.bookName,
        topic: validatedData.topic,
        chapter: validatedData.chapter,
        timestamp: message.timestamp 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Error in analyze-physics-book endpoint:", error);
        res.status(500).json({ message: "An error occurred while analyzing the physics book." });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

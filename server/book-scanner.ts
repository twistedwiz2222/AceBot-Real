import OpenAI from "openai";
import { createReadStream, readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomBytes } from "crypto";
import multer from "multer";

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface BookScanResult {
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

// Function to save uploaded file to temp directory
async function saveUploadedFile(file: any): Promise<string> {
  const tempDir = tmpdir();
  const randomName = randomBytes(16).toString("hex");
  const fileExtension = file.originalname.split(".").pop() || "jpg";
  const filePath = join(tempDir, `${randomName}.${fileExtension}`);
  
  await writeFile(filePath, file.buffer);
  return filePath;
}

// Function to analyze book image with OCR using OpenAI Vision
async function extractTextFromImage(imagePath: string): Promise<string> {
  try {
    // Read image file as base64
    const imageBuffer = readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all the text visible in this image of a textbook page. Preserve all formatting, equations, and content as accurately as possible. Focus on maintaining the scientific integrity of the content. Include formulas and special characters as plaintext."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      max_tokens: 1500,
    });

    return response.choices[0].message.content || "No text could be extracted";
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw new Error("Failed to extract text from the uploaded image");
  }
}

// Function to analyze the extracted text for textbook content
async function analyzeTextbookContent(
  extractedText: string, 
  bookName: string, 
  bookId?: string,
  chapter?: string
): Promise<BookScanResult> {
  try {
    // Determine the subject based on book ID
    const isChemistry = bookId?.includes('chem') || bookId?.includes('msc');
    const subject = isChemistry ? 'chemistry' : 'physics';
    
    // Create prompt based on book type
    let prompt = `You are a ${subject} education expert. Analyze the following text from "${bookName}"`;
    
    if (chapter) {
      prompt += ` chapter "${chapter}"`;
    }
    
    prompt += `. Identify key ${subject} concepts, provide an educational summary, and explain the core principles presented.\n\n`;

    // Add specific instructions based on book type
    // Physics books
    if (bookId === "hcv") {
      prompt += `This is from H.C. Verma's "Concepts of Physics," known for concise explanations and comprehensive problem-solving approaches. Focus on identifying the conceptual building blocks and problem-solving methodologies.\n\n`;
    } else if (bookId === "ncert11_physics" || bookId === "ncert12_physics") {
      prompt += `This is from an NCERT Physics textbook, which forms the foundation of CBSE curriculum and JEE preparation. Focus on the fundamental concepts and their applications as presented in the standard curriculum.\n\n`;
    } else if (bookId === "irodov") {
      prompt += `This is from I.E. Irodov's "Problems in General Physics," known for challenging physics problems. Focus on the advanced concepts and analytical approaches to problem-solving.\n\n`;
    } 
    // Chemistry books
    else if (bookId === "ncert11_chemistry" || bookId === "ncert12_chemistry") {
      prompt += `This is from an NCERT Chemistry textbook, which forms the foundation of CBSE curriculum and JEE preparation. Focus on the fundamental chemical principles, reactions, and their applications as presented in the standard curriculum.\n\n`;
    } else if (bookId === "msc") {
      prompt += `This is from M.S. Chouhan's Organic Chemistry, known for its comprehensive coverage of organic chemistry concepts and problem-solving techniques. Focus on reaction mechanisms, stereochemistry, and systematic approaches to solving organic chemistry problems.\n\n`;
    }

    prompt += `The extracted text is as follows:\n\n${extractedText}\n\n`;
    
    prompt += `Respond with a JSON object with the following structure:
    {
      "title": "The main topic or title of this page",
      "concepts": [
        {
          "name": "Name of ${subject} concept",
          "explanation": "Clear explanation suitable for a student"
        }
      ],
      "summary": "A comprehensive summary of the content",
      "examples": [
        {
          "problem": "Example problem if any",
          "solution": "Solution approach"
        }
      ],
      "relatedTopics": ["Related ${subject} concepts or topics"]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: `You are a ${subject} education expert specialized in analyzing textbook content.` },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new Error("No content returned from AI analysis");
    }

    try {
      return JSON.parse(content) as BookScanResult;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Failed to parse the AI analysis result");
    }
  } catch (error) {
    console.error("Error analyzing textbook content:", error);
    throw new Error("Failed to analyze the textbook content");
  }
}

export async function scanBookPage(
  file: any, 
  bookName: string,
  bookId?: string,
  chapter?: string
): Promise<BookScanResult> {
  try {
    // Save the uploaded file
    const filePath = await saveUploadedFile(file);
    
    // Extract text from image using OCR
    const extractedText = await extractTextFromImage(filePath);
    
    // Analyze the extracted text
    const analysis = await analyzeTextbookContent(extractedText, bookName, bookId, chapter);
    
    return analysis;
  } catch (error) {
    console.error("Error in book scan process:", error);
    throw new Error(`Failed to scan book page: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
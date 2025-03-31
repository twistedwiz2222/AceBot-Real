import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || ""
});

const system_prompt = `You are an educational AI assistant specializing in the CBSE Class 11-12 science curriculum, JEE Mains, and BITSAT preparation.
You can answer questions about Physics, Chemistry, Mathematics, and Biology.
Your responses should be:
1. Accurate and factually correct
2. Aligned with CBSE curriculum and exam patterns
3. Concise but comprehensive
4. Include examples, formulas, and diagrams where appropriate
5. Mention if a topic is particularly important for JEE Mains or BITSAT

Format your responses with proper formatting:
- Use markdown for headings, lists, and emphasis
- Include mathematical formulas using LaTeX syntax when needed
- Highlight important concepts and keywords
- If providing numerical solutions, show step-by-step workings
- If the question is about a specific exam (JEE/BITSAT), tailor your answer accordingly

Never fabricate information. If you don't know something, admit it and suggest reliable sources.`;

const physics_books_system_prompt = `You are an expert in Physics education specializing in analyzing textbooks like H.C. Verma's "Concepts of Physics", D.C. Pandey's "Understanding Physics", and I.E. Irodov's "Problems in General Physics". 

You have deep knowledge of the CBSE Class 11-12 physics curriculum, JEE Mains, and BITSAT preparation materials.

When analyzing a physics book or concept, you should:
1. Identify the key concepts and principles covered
2. Explain the approach and methodology used in the book
3. Compare with standard CBSE curriculum requirements
4. Highlight how the content aligns with JEE Mains and BITSAT exam patterns
5. Suggest problem-solving strategies based on the book's approach
6. Recommend specific chapters or problems that are particularly valuable for exam preparation

Format your responses with proper formatting:
- Use markdown for headings, lists, and emphasis
- Include mathematical formulas using LaTeX syntax when needed
- Organize information in a structured manner with clear sections
- Reference specific page numbers, chapters, or problem numbers when possible

Focus on providing practical, actionable information that helps students effectively use these physics textbooks for exam preparation.`;

export async function generateAIResponse(question: string, subject?: string, examType?: string): Promise<string> {
  try {
    let prompt = question;
    
    // Add context from subject and exam type if provided
    if (subject || examType) {
      prompt += "\n\nContext:";
      if (subject) prompt += `\nSubject: ${subject}`;
      if (examType) prompt += `\nExam Focus: ${examType}`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate AI response. Please check your API key and try again.");
  }
}

export async function analyzePhysicsBook(bookName: string, topic?: string, chapter?: string): Promise<string> {
  try {
    let prompt = `Analyze the physics book "${bookName}"`;
    
    if (topic) {
      prompt += ` focusing on the topic "${topic}"`;
    }
    
    if (chapter) {
      prompt += ` in chapter "${chapter}"`;
    }
    
    prompt += `. Please provide a detailed analysis including:
    - Key concepts covered
    - Problem-solving approach used
    - Connection to JEE/BITSAT exams
    - Recommended study strategy
    - Important formulas and concepts
    - Comparison with other standard books (if relevant)`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: physics_books_system_prompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content || "I apologize, but I couldn't analyze this book. Please try again with a different book or topic.";
  } catch (error) {
    console.error("Error analyzing physics book:", error);
    throw new Error("Failed to analyze physics book. Please check your API key and try again.");
  }
}

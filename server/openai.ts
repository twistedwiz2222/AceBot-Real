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

import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || ""
});

const system_prompt = `You are an educational AI assistant specializing in the CBSE Class 11-12 science curriculum, JEE Mains, and BITSAT preparation, with deep knowledge of standard textbooks including:

PHYSICS:
- H.C. Verma's "Concepts of Physics"
- DC Pandey series
- I.E. Irodov's "Problems in General Physics"
- Resnick & Halliday
- NCERT Physics Class 11 & 12

CHEMISTRY:
- NCERT Chemistry Class 11 & 12
- MS Chouhan's "Advanced Problems in Organic Chemistry"
- OP Tandon
- JD Lee's Concise Inorganic Chemistry
- Morrison & Boyd's Organic Chemistry

MATHEMATICS:
- RD Sharma
- NCERT Mathematics Class 11 & 12
- Cengage Series
- Arihant Publications

You can answer questions about Physics, Chemistry, Mathematics, and Biology while referencing specific concepts and examples from these textbooks.

Your responses should be:
1. Accurate and factually correct
2. Aligned with CBSE curriculum and exam patterns
3. Concise but comprehensive
4. Include examples, formulas, and diagrams where appropriate
5. Mention if a topic is particularly important for JEE Mains or BITSAT
6. Reference specific textbooks, chapters, and problems when relevant
7. Compare approaches from different standard textbooks for complex topics

When discussing Physics topics:
- For mechanics: Reference relevant chapters from H.C. Verma and explain how his approach compares to NCERT
- For electromagnetism: Mention specific examples and problems from DC Pandey or Irodov
- For modern physics: Compare the treatment in different textbooks
- For problem-solving: Suggest specific practice problems from these textbooks that are relevant to the topic

When discussing Chemistry topics:
- For organic chemistry: Reference MS Chouhan's approach and problem-solving methodology
- For inorganic chemistry: Compare NCERT treatment with JD Lee's comprehensive explanations
- For physical chemistry: Mention specific examples from NCERT and OP Tandon
- Specify which chapters in NCERT Class 11 & 12 cover the topic and how they build on each other
- For problem-solving: Recommend specific practice problems from MS Chouhan or other relevant books

Format your responses with proper formatting:
- Use markdown for headings, lists, and emphasis
- Include mathematical formulas and chemical equations using LaTeX syntax when needed
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

    try {
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
    } catch (apiError: any) {
      // Check for rate limit or quota errors
      if (apiError.status === 429 || (apiError.error && apiError.error.type === 'insufficient_quota')) {
        console.warn("OpenAI API quota exceeded or rate limited. Using fallback response mode.");
        
        // Generate a fallback response based on the question and subject
        let fallbackResponse = `I apologize, but I'm currently experiencing high demand and can't process your request right now. 

Here are some resources for your question about ${subject || "this topic"}:

1. For CBSE Class 11-12 content: Refer to NCERT textbooks which cover the fundamentals thoroughly
2. For JEE preparation: H.C. Verma's "Concepts of Physics" and D.C. Pandey series are highly recommended
3. For BITSAT: Focus on NCERT books first, then move to specialized books like Arihant's BITSAT guides`;

        if (question.toLowerCase().includes("physics") || subject === "Physics") {
          fallbackResponse += `\n\nFor Physics specifically:
- Mechanics: Focus on Newton's Laws, Conservation principles, and Rotational dynamics
- Electromagnetism: Understand Gauss's Law, Ampere's Law, and electromagnetic induction
- Modern Physics: Quantum phenomena and nuclear physics concepts are important`;
        } else if (question.toLowerCase().includes("chemistry") || subject === "Chemistry") {
          fallbackResponse += `\n\nFor Chemistry specifically:
- Physical Chemistry: Thermodynamics, Chemical Equilibrium, and Electrochemistry
- Organic Chemistry: Reaction mechanisms and functional group properties
- Inorganic Chemistry: Periodic trends and coordination compounds`;
        } else if (question.toLowerCase().includes("math") || subject === "Mathematics") {
          fallbackResponse += `\n\nFor Mathematics specifically:
- Calculus: Limits, Differentiation, Integration and their applications
- Algebra: Complex numbers, Matrices, and Probability
- Coordinate Geometry: Conic sections and 3D geometry`;
        }

        fallbackResponse += `\n\nPlease try again later when the system load has reduced.`;
        
        return fallbackResponse;
      } else {
        // For other API errors, rethrow
        throw apiError;
      }
    }
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

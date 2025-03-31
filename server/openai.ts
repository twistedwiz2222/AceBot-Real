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

BIOLOGY:
- NCERT Biology Class 11 & 12
- Trueman's Elementary Biology
- Pradeep's Biology
- S.B. Verma & S.C. Agarwal's Biology

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

const biology_books_system_prompt = `You are an expert in Biology education specializing in analyzing textbooks like NCERT Biology for Class 11 & 12, Trueman's Elementary Biology, and other reference books used in CBSE curriculum and competitive exam preparation.

You have comprehensive knowledge of the CBSE Class 11-12 biology curriculum, as well as how biology topics are covered in entrance exams like NEET, JEE, and BITSAT.

When analyzing biology textbooks or concepts, you should:
1. Identify the key biological concepts, principles, and processes covered
2. Explain the teaching approach, diagrams, and illustrations provided
3. Highlight how the content aligns with CBSE curriculum and board examination patterns
4. Connect the material to competitive examination requirements (NEET/JEE/BITSAT)
5. Provide specific study techniques and strategies for mastering this biological content
6. Recommend particular chapters, examples, or illustrations that are especially valuable

The NCERT Biology textbooks for Class 11 cover:
- Diversity in Living World (Units 1-2): Classification, kingdoms, taxonomic categories
- Cell Structure and Functions (Unit 3): Cell theory, cell membrane, organelles
- Plant Physiology (Unit 4): Transport, mineral nutrition, photosynthesis, respiration
- Human Physiology (Unit 5): Digestion, breathing, circulation, excretion

The NCERT Biology textbooks for Class 12 cover:
- Reproduction (Unit 1): Asexual, sexual reproduction, human reproduction
- Genetics and Evolution (Unit 2): Inheritance, molecular basis of inheritance, evolution
- Biology in Human Welfare (Unit 3): Health, diseases, improvement in food production
- Biotechnology (Unit 4): Principles, applications in health and agriculture
- Ecology (Unit 5): Organisms and environment, biodiversity, environmental issues

Format your responses with proper formatting:
- Use markdown for headings, lists, and emphasis
- Include biological diagrams, cycles, and processes clearly with references
- Organize information in a structured, hierarchical manner
- Reference specific chapters, examples, and diagram numbers when possible

Focus on providing clear, practical guidance that helps students master biological concepts and prepare effectively for their examinations.`;

const mathematics_books_system_prompt = `You are an expert in Mathematics education specializing in analyzing textbooks like NCERT Mathematics for Class 11 & 12, RD Sharma's Mathematics, and Cengage Mathematics series.

You have comprehensive knowledge of the CBSE Class 11-12 mathematics curriculum, JEE Mains, and BITSAT preparation materials.

When analyzing mathematics textbooks or concepts, you should:
1. Identify the key mathematical concepts, theorems, and principles covered
2. Explain the pedagogical approach and problem-solving methodology
3. Highlight how the content aligns with CBSE curriculum and board examination patterns
4. Connect the material to JEE Mains and BITSAT examination requirements
5. Provide specific problem-solving techniques and strategies from these textbooks
6. Recommend particular chapters, exercises, or problems that are especially valuable

The NCERT Mathematics textbooks for Class 11 cover:
- Sets and Functions (Chapters 1-3)
- Algebra (Chapters 4-6)
- Coordinate Geometry (Chapters 7-11)
- Calculus (Chapter 13)
- Statistics and Probability (Chapters 14-16)

The NCERT Mathematics textbooks for Class 12 cover:
- Relations and Functions (Chapters 1-2)
- Algebra (Chapter 3-4)
- Calculus (Chapters 5-8)
- Vectors and 3D Geometry (Chapters 9-11)
- Linear Programming (Chapter 12)
- Probability (Chapter 13)

Format your responses with proper formatting:
- Use markdown for headings, lists, and emphasis
- Include mathematical formulas and equations using LaTeX syntax
- Organize information in a structured, hierarchical manner
- Reference specific chapters, exercises, examples, and problem numbers

Focus on providing clear, practical guidance that helps students master mathematical concepts through these textbooks and prepare effectively for their examinations.`;

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
- Mechanics: See chapters 1-11 in H.C. Verma Vol. 1 covering Newton's Laws, Conservation principles, and Rotational dynamics
- Electromagnetism: Refer to chapters 29-34 in H.C. Verma Vol. 2 for detailed explanations of Gauss's Law, Ampere's Law, and electromagnetic induction
- Modern Physics: Study chapters 41-47 in H.C. Verma Vol. 2 for quantum phenomena and nuclear physics concepts`;
        } else if (question.toLowerCase().includes("chemistry") || subject === "Chemistry") {
          fallbackResponse += `\n\nFor Chemistry specifically:
- Physical Chemistry: Review NCERT Class 11 (chapters 5-9) and Class 12 (chapters 1-5) for Thermodynamics, Chemical Equilibrium, and Electrochemistry
- Organic Chemistry: Study MS Chouhan's book which covers reaction mechanisms and functional group properties in detail, especially chapters 10-15
- Inorganic Chemistry: Use NCERT books which explain periodic trends and coordination compounds clearly in Class 11 (chapters 2-4) and Class 12 (chapters 7-9)`;
        } else if (question.toLowerCase().includes("math") || subject === "Mathematics") {
          fallbackResponse += `\n\nFor Mathematics specifically:
- Calculus: See NCERT Class 12 (chapters 5-8) or RD Sharma Class 12 (chapters 10-20) which covers Continuity, Differentiation, Integration, and Differential Equations thoroughly
- Algebra: Review NCERT Class 11 (chapters 4-6) or RD Sharma Class 11 (chapters 13-18) for Mathematical Induction, Complex Numbers, Permutations & Combinations
- Coordinate Geometry: Study NCERT Class 11 (chapters 7-11) which covers straight lines, conic sections (circles, ellipses, parabolas, hyperbolas)
- 3D Geometry & Vectors: Refer to NCERT Class 12 (chapters 9-11) for vector algebra and three-dimensional geometry concepts`;
        } else if (question.toLowerCase().includes("biology") || subject === "Biology") {
          fallbackResponse += `\n\nFor Biology specifically:
- Cell Biology: Review NCERT Class 11 (Unit 3) covering cell structure, cell organelles, and cell division
- Plant Physiology: Study NCERT Class 11 (Unit 4) on transport systems, mineral nutrition, photosynthesis, and respiration
- Human Physiology: Refer to NCERT Class 11 (Unit 5) for detailed explanations of digestive, respiratory, circulatory, and excretory systems
- Genetics: See NCERT Class 12 (Unit 2) covering Mendelian genetics, DNA structure, gene expression, and molecular basis of inheritance
- Ecology: Explore NCERT Class 12 (Unit 5) which covers ecosystems, biodiversity, environmental issues and conservation`;
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

export async function analyzeMathBook(bookName: string, topic?: string, chapter?: string): Promise<string> {
  try {
    let prompt = `Analyze the mathematics book "${bookName}"`;
    
    if (topic) {
      prompt += ` focusing on the topic "${topic}"`;
    }
    
    if (chapter) {
      prompt += ` in chapter "${chapter}"`;
    }
    
    prompt += `. Please provide a detailed analysis including:
    - Key mathematical concepts, theorems, and principles covered
    - Problem-solving methodologies presented
    - How this aligns with CBSE curriculum and JEE/BITSAT requirements
    - Recommended study approach for this material
    - Important formulas, theorems, and techniques
    - Comparison with other standard mathematics textbooks (if relevant)`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: mathematics_books_system_prompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      return response.choices[0].message.content || "I apologize, but I couldn't analyze this mathematics book. Please try again with a different book or topic.";
    } catch (apiError: any) {
      // Check for rate limit or quota errors
      if (apiError.status === 429 || (apiError.error && apiError.error.type === 'insufficient_quota')) {
        console.warn("OpenAI API quota exceeded or rate limited. Using fallback response for math book analysis.");
        
        // Generate a fallback response based on the book name and topic
        let fallbackResponse = `I apologize, but I'm currently experiencing high demand and can't process your detailed analysis request for "${bookName}".
        
Here's some general information about mathematics textbooks for CBSE Class 11-12 and competitive exams:

NCERT Mathematics for Class 11:
- Sets and Functions (Chapters 1-3): Covers fundamental concepts of sets, relations, functions, trigonometry
- Algebra (Chapters 4-6): Covers mathematical induction, complex numbers, linear inequalities, permutations and combinations
- Coordinate Geometry (Chapters 7-11): Covers straight lines, conic sections (circles, ellipses, parabolas, hyperbolas)
- Calculus (Chapter 13): Introduces limits and derivatives
- Statistics and Probability (Chapters 14-16): Covers measures of dispersion, probability

NCERT Mathematics for Class 12:
- Relations and Functions (Chapters 1-2): Covers advanced functions, inverse trigonometric functions
- Algebra (Chapter 3-4): Covers matrices, determinants
- Calculus (Chapters 5-8): Covers continuity, differentiability, applications of derivatives, integrals, differential equations
- Vectors and 3D Geometry (Chapters 9-11): Covers vector algebra, 3D geometry
- Linear Programming (Chapter 12): Covers optimization problems
- Probability (Chapter 13): Covers advanced probability concepts

These textbooks form the foundation for CBSE exams and are essential for competitive exams like JEE and BITSAT.

Please try again later for a more detailed, book-specific analysis.`;
        
        return fallbackResponse;
      } else {
        // For other API errors, rethrow
        throw apiError;
      }
    }
  } catch (error) {
    console.error("Error analyzing mathematics book:", error);
    throw new Error("Failed to analyze mathematics book. Please check your API key and try again.");
  }
}

export async function analyzeBiologyBook(bookName: string, topic?: string, chapter?: string): Promise<string> {
  try {
    let prompt = `Analyze the biology book "${bookName}"`;
    
    if (topic) {
      prompt += ` focusing on the topic "${topic}"`;
    }
    
    if (chapter) {
      prompt += ` in chapter "${chapter}"`;
    }
    
    prompt += `. Please provide a detailed analysis including:
    - Key biological concepts, principles, and processes covered
    - Teaching approach and presentation of content
    - How this aligns with CBSE curriculum and competitive exam requirements
    - Recommended study strategies for mastering this material
    - Important diagrams, cycles, and biological processes
    - Comparison with other standard biology textbooks (if relevant)`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: biology_books_system_prompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      return response.choices[0].message.content || "I apologize, but I couldn't analyze this biology book. Please try again with a different book or topic.";
    } catch (apiError: any) {
      // Check for rate limit or quota errors
      if (apiError.status === 429 || (apiError.error && apiError.error.type === 'insufficient_quota')) {
        console.warn("OpenAI API quota exceeded or rate limited. Using fallback response for biology book analysis.");
        
        // Generate a fallback response based on the book name and topic
        let fallbackResponse = `I apologize, but I'm currently experiencing high demand and can't process your detailed analysis request for "${bookName}".
        
Here's some general information about biology textbooks for CBSE Class 11-12 and competitive exams:

NCERT Biology for Class 11:
- Diversity in Living World (Units 1-2): Covers classification, kingdoms, taxonomic categories
- Cell Structure and Functions (Unit 3): Covers cell theory, cell membrane, organelles
- Plant Physiology (Unit 4): Covers transport, mineral nutrition, photosynthesis, respiration
- Human Physiology (Unit 5): Covers digestion, breathing, circulation, excretion

NCERT Biology for Class 12:
- Reproduction (Unit 1): Covers asexual, sexual reproduction, human reproduction
- Genetics and Evolution (Unit 2): Covers inheritance, molecular basis of inheritance, evolution
- Biology in Human Welfare (Unit 3): Covers health, diseases, improvement in food production
- Biotechnology (Unit 4): Covers principles, applications in health and agriculture
- Ecology (Unit 5): Covers organisms and environment, biodiversity, environmental issues

These textbooks form the foundation for CBSE exams and are essential for competitive exams like NEET, JEE, and BITSAT.

Please try again later for a more detailed, book-specific analysis.`;
        
        return fallbackResponse;
      } else {
        // For other API errors, rethrow
        throw apiError;
      }
    }
  } catch (error) {
    console.error("Error analyzing biology book:", error);
    throw new Error("Failed to analyze biology book. Please check your API key and try again.");
  }
}

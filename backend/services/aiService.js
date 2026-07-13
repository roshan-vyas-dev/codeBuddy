

const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});



const reviewCode = async (language, code) => {

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `
                          You are a senior MERN Stack developer and professional code reviewer.
                          
                          Your job is to review code and provide constructive, clear, and actionable feedback.
                          
                          Follow these rules:
                          
                          - Be concise and professional.
                          - Explain problems clearly.
                          - Suggest practical improvements.
                          - Do not only criticize; also mention what is done well.
                          
                          Focus your review on:
                          
                          1. Code Quality
                             - Readability
                             - Clean code practices
                             - Naming conventions
                             - Code structure
                          
                          2. Bugs and Errors
                             - Logical mistakes
                             - Edge cases
                             - Possible runtime issues
                          
                          3. Performance
                             - Time complexity
                             - Memory usage
                             - Optimization opportunities
                          
                          4. Security
                             - Vulnerabilities
                             - Unsafe practices
                             - Data handling issues
                          
                          5. Best Practices
                             - MERN stack standards
                             - Maintainability
                             - Scalability
                          
                          Respond using Markdown format with:
                          - Clear headings
                          - Bullet points
                          - Code examples when necessary
                          `
            },
            {
                role: "user",
                content: `Review this ${language} code.

                      Please provide your review in the following format:
                      
                      1. Overall Score (out of 10)
                      2. What is good about the code
                      3. Bugs or mistakes
                      4. Performance improvements
                      5. Best practices
                      6. Security concerns (if any)
                      7. Final suggestions
                      
                      Code:
                      
                      ${code}`
            }
        ]

    });

    return response.choices[0].message.content;


}

module.exports = { reviewCode };
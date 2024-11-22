const express = require('express');
const router = express.Router();
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");
const extractor = require("keyword-extractor");
require("dotenv").config();

async function generateContent(topic, key, model = "gemini-1.0-pro") {
  const instructions = `You are a content generator. Given a topic, generate a structured title, description, and keywords.
  The description should be a few paragraphs long, and the keywords should be relevant to the topic.

  Respond in the following format:
  Title: <title>
  Description: <description>
  Keywords: <comma-separated keywords>
  `;

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      "Generate content for the topic - {topic}.\n{format_instructions}"
    ),
    new ChatGoogleGenerativeAI({
      modelName: model,
      temperature: 0.7, // Adjust temperature if needed
      apiKey: key,
    }),
  ]);

  const response = await chain.invoke({
    topic: topic,
    format_instructions: instructions,
  });

  const cleanedResponse = cleanContent(response.text);
  const title = extractTitle(cleanedResponse);
  const description = extractDescription(cleanedResponse);
  const keywords = extractKeywords(description);

  return {
    title,
    description,
    keywords,
  };
}

// Function to clean up the content, removing unnecessary characters and markdown symbols
function cleanContent(content) {
  content = content.replace(/\*\*|\*|_/g, "");
  content = content.replace(/[^\x20-\x7E\n\r]/g, "");
  content = content.replace(/\s+/g, " ").trim();
  return content;
}

function extractTitle(content) {
    const titleMatch = content.match(/Title:\s*(.*?)(\n|$)/);
    let title = titleMatch ? titleMatch[1].trim() : "No Title Found";
    if (title.length > 50) { // Limit title length to 50 characters
      title = title.substring(0, 47) + "...";
    }
    return title;
  }

// Function to generate a readable description
function extractDescription(content) {
  const descriptionMatch = content.match(/Description:\s*(.*?)(\nKeywords:|$)/s);
  return descriptionMatch ? descriptionMatch[1].trim() : "No Description Found";
}

// Function to extract keywords
function extractKeywords(description) {
  const keywordsMatch = description.match(/Keywords:\s*(.*?)(\n|$)/);
  if (!keywordsMatch) {
    return "No Keywords Found";
  }

  const options = {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  };

  const extractedKeywords = extractor.extract(keywordsMatch[1], options);
  const cleanedKeywords = extractedKeywords
    .map(keyword => keyword.replace(/[^\w\s]/g, ""))
    .filter(keyword => keyword.trim() !== "");

  return cleanedKeywords.slice(0, 6).join(", ");
}

router.post('/chat-bot', async (req, res) => {
    const { query } = req.body;

    console.log("message = ",query);
    if (!query) {
        return res.status(400).send({ error: 'please enter your message' });
    }
        try {
          const result = await generateContent(query, process.env.GEMINI_API_KEY);
          let {title,description, keywords} = result
          console.log("Title:", result.title);
          console.log("Description:", result.description);
          console.log("Keywords:", result.keywords);
          res.json({title, description,keywords})
        } catch (error) {
            console.error("Error fetching content:", error);
            res.status(500).json({ message: 'Error fetching content' });
        }
})


module.exports = router;

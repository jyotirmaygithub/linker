const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const natural = require('natural');
const validUrl = require('valid-url');

// Function to calculate TF-IDF and extract top keywords
function extractKeywords(content, maxKeywords = 10) {
  const tfidf = new natural.TfIdf();
  tfidf.addDocument(content);

  const terms = tfidf.listTerms(0)
    .filter(term => !/^\d+$/.test(term.term)) // Filter out terms that are purely numeric
    .slice(0, maxKeywords)
    .map(term => term.term);

  return terms;
}

router.post('/scrape', async (req, res) => {
  const { url } = req.body;
  console.log("Received URL:", url);

   // Validate the URL format
   if (!validUrl.isUri(url)) {
    return res.status(400).json({ message: 'Invalid URL format' });
  }
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Extract the title
    const title = $('title').text() || $('h1').first().text();
    console.log("Title:", title);

    // Extract all paragraphs
    const paragraphs = [];
    $('p').each((i, elem) => {
      paragraphs.push($(elem).text().trim()); // Remove leading/trailing spaces
    });

    // Join paragraphs to create a single content string and remove extra spaces/newlines
    const content = paragraphs.join(' ').replace(/\s+/g, ' ').trim();
    console.log("Content data:", content);

    // Extract keywords from the content using TF-IDF
    const keywords = extractKeywords(content, 5); // Limit to 10 keywords
    console.log("Keywords:", keywords);

    // Send the extracted data back to the frontend
    res.json({ title, content, keywords });
  } catch (error) {
    console.error("Error fetching page content:", error);
    res.status(500).json({ message: 'Error fetching page content' });
  }
});

module.exports = router;

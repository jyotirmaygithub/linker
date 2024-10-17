const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const cors = require('cors');
const natural = require('natural');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

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

app.post('/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

   // console.log("data = ",data);

    // Extract the title
    const title = $('title').text() || $('h1').first().text();

    // Extract all paragraphs
    const paragraphs = [];
    $('p').each((i, elem) => {
      paragraphs.push($(elem).text());
    });


    // Join paragraphs to create a single content string
    const content = paragraphs.join(' ');

    // Extract keywords from the content using TF-IDF
    const keywords = extractKeywords(content, 10); // Limit to 10 keywords

    res.json({ title, paragraphs, keywords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching page content' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

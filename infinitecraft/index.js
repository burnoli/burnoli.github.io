const express = require('express');
const combineElements = require('./funcs.js');

const app = express();
const PORT = process.env.PORT || 3000;

// API endpoint to combine elements
app.get('/api/combine', async (req, res) => {
  const text1 = req.query.ele1;
  const key = req.query.key;
  const text2 = req.query.ele2;

  try {
    const result = await combineElements(key, text1.toLowerCase(), text2.toLowerCase());
    res.json(result);
  } catch (error) {
    console.error('Error combining elements:', error);
    res.sendStatus(500).send(`Error: ${error}`);
  }
});

// Default route for handling 404 errors
app.get('*', (req, res) => {
  res.sendStatus(404);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

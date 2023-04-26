const express = require('express');
const googleTrends = require('google-trends-api');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/trending/:topic', async (req, res) => {
  const { topic } = req.params;

  try {
    const results = await googleTrends.interestOverTime({
      keyword: topic,
      startTime: new Date(Date.now() - (60 * 60 * 24 * 30 * 1000)), // last 30 days
      granularTimeResolution: true,
    });

    res.json(JSON.parse(results));
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving trending topics' });
  }
});

app.get('/related/:topic', async (req, res) => {
  const { topic } = req.params;

  try {
    const results = await googleTrends.relatedQueries({
      keyword: topic,
      startTime: new Date(Date.now() - (60 * 60 * 24 * 30 * 6 * 1000)), // last 6 months
    });

    res.json(JSON.parse(results));
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving related keywords' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

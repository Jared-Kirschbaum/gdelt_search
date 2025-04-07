import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import cheerio from 'cheerio'; // Ensure you have cheerio@0.22.0 installed

const app = express();
app.use(cors());

app.get('/gdelt', async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  if (typeof query !== 'string' || !query.trim()) {
    res.status(400).send('Query must be a non-empty string');
    return;
  }

  const baseGdeltUrl: string = `https://api.gdeltproject.org/api/v1/search_ftxtsearch/search_ftxtsearch?query=${encodeURIComponent(query)}&dropdup=true`;
  const urlsToTry: Array<string> = [
    `${baseGdeltUrl}&output=artimglist`,
    `${baseGdeltUrl}&output=artlist`
  ];

  try {
    let articles: { title: string; link: string; image?: string | null }[] = [];

    for (const gdeltUrl of urlsToTry) {
      console.log('[🌍 Requesting]', gdeltUrl);

      const response = await fetch(gdeltUrl);
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // GDELT outputs a table; we iterate over each row (<tr>)
      const rows = $('table tr');
      console.log(`[🔍 Found ${rows.length} table rows]`);

      rows.each((_, row) => {
        // Extract the title from the first <b> element
        const title = $(row).find('b').first().text().trim();
        // Find the <a> element that contains the <b> element
        let href = $(row).find('a').has('b').first().attr('href') || '';
        // If the href is a JS call, extract the URL from inside it
        if (href.startsWith("javascript:window.open(")) {
          const match = href.match(/window\.open\('([^']+)'/);
          if (match) {
            href = match[1];
          }
        }
        // Try to extract an image, if available
        const image = $(row).find('img').first().attr('src') || null;
        if (title && href) {
          articles.push({ title, link: href, image });
        }
      });

      if (articles.length > 0) break; // Use the first non-empty result set
    }

    console.log(`[✅ Parsed ${articles.length} articles from GDELT]`);
    res.json(articles);
  } catch (err) {
    console.error('[🔥 GDELT Proxy Error]', err);
    res.status(500).send('Error fetching GDELT data');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ GDELT proxy running at http://localhost:${PORT}`);
});

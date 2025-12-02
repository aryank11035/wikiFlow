import express from 'express'
import cors from "cors";
import { JSDOM } from "jsdom";

const app = express()
app.use(cors())

app.get('/mainpage', async (req, res) => {
const response = await fetch("https://en.wikipedia.org/api/rest_v1/feed/featured/2025/12/02");
    
     const mainPageResponse = await fetch(
      "https://en.wikipedia.org/api/rest_v1/page/html/Main_Page"
    );
    
    const html = await mainPageResponse.text();

 
  // Allow iframe
  res.setHeader("Content-Type", "text/html");
  res.setHeader("X-Frame-Options", "ALLOWALL");

  res.send(html);
})
app.get('/api/message', (req, res) => {
    res.json({ message: 'hello from wikiflow backend!' })
})

app.listen(3001, () => console.log('server is running on http://localhost:3001'))
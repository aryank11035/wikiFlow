import express from 'express'
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
app.use(cors())

app.use('/helpers', express.static(path.join(__dirname, 'helpers')));

app.get('/mainpage', async (req, res) => {
    
  const mainPageResponse = await fetch(
      "https://en.wikipedia.org/api/rest_v1/page/html/Main_Page"
    );
    

  const html = await mainPageResponse.text();

  const styledHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://en.wikipedia.org/w/load.php?lang=en&modules=ext.cite.styles%7Cext.uls.interlanguage%7Cext.visualEditor.desktopArticleTarget.noscript%7Cext.wikimediaBadges%7Cjquery.makeCollapsible.styles%7Cskins.vector.icons%2Cstyles%7Cskins.vector.search.codex.styles%7Cwikibase.client.init&only=styles&skin=vector-2022">
            <link rel="stylesheet" href="https://en.wikipedia.org/w/load.php?lang=en&modules=site.styles&only=styles&skin=vector-2022">
            <style>
                /* Hide scrollbar inside iframe */
                ::-webkit-scrollbar {
                    display: none;
                }
                body {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    padding : 10px;
                }
                body { margin: 0;  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Lato, Helvetica, Arial, sans-serif; }
            </style>
        </head>
        <body>
            ${html}
            <script src="http://localhost:3001/helpers/click-event.js" type="module">

            </script>
        </body>
        </html>
    `;

  // Allow iframe
  res.setHeader("Content-Type", "text/html");
  res.send(styledHtml);
})
app.get('/api/message', (req, res) => {
    res.json({ message: 'hello from wikiflow backend!' })
})

app.listen(3001, () => console.log('server is running on http://localhost:3001'))   
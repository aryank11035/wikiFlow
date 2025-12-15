import express from 'express'
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { SendHTMLFormat, SendHTMLFormatforTitle } from './helpers/send-html-format.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
app.use(cors())
app.use(express.json())
app.use('/helpers', express.static(path.join(__dirname, 'helpers')));

app.get('/', (req, res) => {
    res.json({ 
        status: 'Wikipedia Proxy Server Running',
        endpoints: {
            mainpage: 'GET /mainpage',
            title: 'GET /title?title=YOUR_TITLE',
            example: 'http://localhost:3001/title?title=JavaScript'
        }
    });
});

app.get('/mainpage', async (req, res) => {
    try {
        const mainPageResponse = await fetch(
            "https://en.wikipedia.org/api/rest_v1/page/html/Main_Page"
        );
        
        if (!mainPageResponse.ok) {
            throw new Error('Failed to fetch Wikipedia main page');
        }
        
        await SendHTMLFormat(mainPageResponse, res);
    } catch (error) {
        console.error('Error fetching main page:', error);
        res.status(500).send('<html><body><h1>Error loading page</h1></body></html>');
    }
});

app.get('/title', async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).send('<html><body><h1>No title provided</h1></body></html>');
    }
    try {
        const titlePageResponse = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(title)}`
        );
     
        if (!titlePageResponse.ok) {
            throw new Error('Failed to fetch Wikipedia page');
        }
        

        await SendHTMLFormatforTitle(titlePageResponse, res);
        
    } catch (error) {
        console.error('Error fetching Wikipedia page:', error);
        res.status(500).send('<html><body><h1>Error loading page</h1></body></html>');
    }
});

// app.get('/img' , async (req ,res ) => {
//     const {}
// })


app.listen(3001, () => console.log('server is running on http://localhost:3001'));
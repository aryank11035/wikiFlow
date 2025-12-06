export async function SendHTMLFormat(mainPageResponse, res) {
    const html = await mainPageResponse.text();
    
    // Add custom styles and script to the HTML
    const styledHtml = html.replace(
        '</head>',
        `<style>
            /* Hide scrollbar inside iframe */
            ::-webkit-scrollbar {
                display: none;
            }
            body {
                -ms-overflow-style: none;
                scrollbar-width: none;
                padding: 10px;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Lato, Helvetica, Arial, sans-serif;
                font-size: 0.85rem;
            }
        </style>
        <script src="http://localhost:3001/helpers/click-event.js" type="module"></script>
        </head>`
    );
    
    res.setHeader('Content-type', 'text/html');
    res.send(styledHtml);
}



export async function SendHTMLFormatforTitle(mainPageResponse , res) {
    const html = await mainPageResponse.text();
    

   
    
    // Add custom styles and script to the HTML
    const styledHtml = html.replace(
        '</head>',
        `<style>
            /* Hide scrollbar inside iframe */
            ::-webkit-scrollbar {
                display: none;
            }
            body {
                -ms-overflow-style: none;
                scrollbar-width: none;
                padding: 10px;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Lato, Helvetica, Arial, sans-serif;
                font-size: 0.85rem;
            }
        </style>
        <script src="http://localhost:3001/helpers/click-event.js" type="module"></script>
        <script src="http://localhost:3001/helpers/load-heading.js" type="module"></script>
        </head>`
    );
    
    res.setHeader('Content-type', 'text/html');
    res.send(styledHtml);
}
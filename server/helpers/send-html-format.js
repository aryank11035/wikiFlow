export async function SendHTMLFormat(mainPageResponse, res) {
    const html = await mainPageResponse.text();
    
    // Add custom styles and script to the HTML
    const styledHtml = html.replace(
        '</head>',
        `
        <link rel="stylesheet" href="https://en.wikipedia.org/w/load.php?modules=skins.vector.styles&only=styles">
        <link rel="stylesheet" href="https://en.wikipedia.org/w/load.php?modules=site.styles&only=styles">
        <link rel="stylesheet" href="https://en.wikipedia.org/w/index.php?title=MediaWiki:Common.css&action=raw&ctype=text/css">
            <style>
            /* Hide scrollbar inside iframe */
            ::-webkit-scrollbar {
                display: none;
            }
            body {
                -ms-overflow-style: none;
                scrollbar-width: none;
                padding: 20px;
                margin: 0;  
                font-family: sans-serif;
                font-weight: normal;
                line-height : 32px;
                font-size: 1rem;
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
        `
         <link rel="stylesheet" href="https://en.wikipedia.org/w/load.php?modules=skins.vector.styles&only=styles">
        <link rel="stylesheet" href="https://en.wikipedia.org/w/load.php?modules=site.styles&only=styles">
        <link rel="stylesheet" href="https://en.wikipedia.org/w/index.php?title=MediaWiki:Common.css&action=raw&ctype=text/css">
        <style>
            /* Hide scrollbar inside iframe */
            ::-webkit-scrollbar {
                display: none;
            }
            body {
                -ms-overflow-style: none;
                scrollbar-width: none;
                padding: 20px;
                margin: 0;  
                font-family: sans-serif;
                font-weight: normal;
                line-height : 32px;
                font-size: 1rem;
            }
        </style>
        <script src="http://localhost:3001/helpers/click-event.js" type="module"></script>
        <script src="http://localhost:3001/helpers/load-heading.js" type="module"></script>
        </head>`
    );
    
    res.setHeader('Content-type', 'text/html');
    res.send(styledHtml);
}
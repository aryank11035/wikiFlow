let NODE_ID = null;

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  NODE_ID = params.get('nodeId') || 'mainPageNode';
 
});



document.addEventListener('click' , async (e) => {
    const clickedLink = e.target
    console.log(clickedLink)

    if(clickedLink.tagName === "A") {
        e.preventDefault()
        const title = clickedLink.getAttribute('title')
    
        if(!title) return 
    

        window.parent.postMessage({
            type: 'WIKI_LINK_CLICKED',
            title: title,
            sourceNodeId: NODE_ID
        }, 'http://localhost:5173');
    }

    if(clickedLink.tagName === 'IMG'){
        e.preventDefault()
        const src = clickedLink.getAttribute('src') 
   
        if( !src ) return

        window.parent.postMessage({
            type: 'WIKI_IMG_CLICKED',
            src : src ,
            sourceNodeId: NODE_ID
        }, 'http://localhost:5173');
       

    }


    
})


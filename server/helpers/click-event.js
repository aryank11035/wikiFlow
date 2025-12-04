document.addEventListener('click' , async (e) => {
    const clickedLink = e.target
    
    
    if(clickedLink.tagName !== "A") return null
    e.preventDefault()
    const title = clickedLink.getAttribute('title')
  
    if(!title) return 

    const urlParams = new URLSearchParams(window.location.search)
    const sourceNodeId = urlParams.get('nodeId') || 'mainPageNode';
    window.parent.postMessage({
        type: 'WIKI_LINK_CLICKED',
        title: title,
        sourceNodeId: sourceNodeId
    }, 'http://localhost:5173');
})
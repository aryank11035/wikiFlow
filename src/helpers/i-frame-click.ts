export const iFrameClick = () : void => {
    
    const iframe =  document.getElementById("the-iframe") as HTMLIFrameElement
    
    if(!iframe) return 
    
    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if(!doc) return 

    doc.addEventListener('click' , (e: any )=> {
        const link = e.target.closest('a')
        if(!link) return 

        e.preventDefault()

        const url = link.getAttribute('href')
        console.log('clicked inside iframe' , url );

        window.dispatchEvent(
            new CustomEvent("iframe-link-clicked", { detail: url })
        );
    })
    
}

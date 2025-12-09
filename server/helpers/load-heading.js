function initTitle() {
    // Get title from the <title> tag
    const titleTag = document.querySelector('title');
    const selectedDiv = document.getElementById('mwBg')
    const selectedDiv2 = document.getElementById('mwBA')
    if(!selectedDiv) return 
    if (!titleTag) {
        console.log('title tag not found');
        return;
    }
    
    const pageTitle = titleTag.textContent;
    
    // Create the heading element
    const heading = document.createElement('h1');
    heading.id = 'firstHeading';
    heading.className = 'page-title';
    heading.textContent = pageTitle;
    
    // Insert at the beginning of body
    if (document.body.firstChild) {
        document.body.insertBefore(heading, document.body.firstChild);
        selectedDiv.remove( )
        selectedDiv2.remove( )
    } else {
        document.body.appendChild(heading);
    }
    

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTitle);
} else {
    initTitle();
}
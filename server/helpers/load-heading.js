function initTitle() {
    // Get title from the <title> tag
    const titleTag = document.querySelector('title');
    
    if (!titleTag) {
        console.log('title tag not found');
        return;
    }
    
    const pageTitle = titleTag.textContent;
    console.log('Page title:', pageTitle);
    
    // Create the heading element
    const heading = document.createElement('h1');
    heading.id = 'firstHeading';
    heading.className = 'page-title';
    heading.textContent = pageTitle;
    
    // Insert at the beginning of body
    if (document.body.firstChild) {
        document.body.insertBefore(heading, document.body.firstChild);
    } else {
        document.body.appendChild(heading);
    }
    
    console.log('Title inserted:', heading);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTitle);
} else {
    initTitle();
}
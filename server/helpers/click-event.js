document.addEventListener('click' , (e) => {
    e.preventDefault()
    const clickedLink = e.target

    if(clickedLink.tagName !== "A") return null
    const title = clickedLink.getAttribute('title')
  

})
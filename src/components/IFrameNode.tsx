export const IFrameNode = ({linkpage, nodeId , mainpage , title } : {linkpage : string, nodeId?: string , mainpage : boolean , title ?: string} ) => {
    
    const seperator = linkpage.includes('?') ? '&': '?'
    //use proxy
    return (
        <>
           
            <iframe
                id='the-iframe'
                src={`http://localhost:3001/${linkpage}${seperator}nodeId=${nodeId || 'mainPageNode'}`}
                className={`${mainpage ? 'w-full h-full rounded-xs' : 'w-160 h-125 rounded-xs'}`}
            />
        
        </>
    )
}
export const IFrameNode = ({linkpage = 'mainpage', nodeId = 'mainPageNode', mainpage} : {linkpage : string, nodeId?: string , mainpage : boolean , title ?: string} ) => {
    
    const seperator = linkpage.includes('?') ? '&': '?'

    return (
        <>
           
            <iframe
                id='the-iframe'
                src={`http://localhost:3001/${linkpage}${seperator}nodeId=${nodeId || 'mainPageNode'}`}
                className={`${mainpage ? 'w-full h-full rounded-xs' : 'w-160 h-180 rounded-xs'}`}
            />
        
        </>
    )
}
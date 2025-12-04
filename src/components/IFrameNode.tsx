export const IFrameNode = ({linkpage, nodeId} : {linkpage : string, nodeId?: string} ) => {
    
    return (
        <iframe
            id='the-iframe'
            src={`http://localhost:3001/${linkpage}?nodeId=${nodeId || 'mainPageNode'}`}
            className="w-full h-full rounded-xs"
        />
    )
}
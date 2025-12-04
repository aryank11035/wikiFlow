
import { useEffect, useState } from "react";
import { CloseBar } from "./Closebar"
import { IFrameNode } from "./IframeNode"

export const TitlePageNode = ({id , data} : {id : string ,data : any}) => {

    const title = data?.title
    if (!title) return null;


    return(
        <div className="w-fit h-fit shadow-2xl relative">
            <CloseBar/>
            <div className="relative w-100 h-130 bg-neutral-100  border-b border-l border-r border-neutral-300 rounded-b-xs p-2 inset-shadow-sm  inset-shadow-neutral-300/80">
            
                <IFrameNode linkpage={`title?title=${encodeURIComponent(title)}`} nodeId={id}/>
            </div>
        </div>
    )
}
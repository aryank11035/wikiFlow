import { useState } from "react";
import { CloseBar } from "./Closebar"
import { IFrameNode } from "./IFrameNode"
import { Handle, Position } from "@xyflow/react";
import { handleStyle } from "./MainPageNode";

export const TitlePageNode = ({id , data} : {id : string ,data : any}) => {

    const title = data?.title
    if (!title) return null;

    const [hover , onHover] = useState<boolean>(false)
    
    return(
        <>
     
            <div className="w-fit h-fit shadow-2xl relative" onMouseEnter={() => onHover(true) }
            onMouseLeave={() => onHover(false) }>
                <CloseBar/>
                <div className="relative w-fit h-fit bg-neutral-100  border-b border-l border-r border-neutral-300 rounded-b-xs p-2 inset-shadow-sm  inset-shadow-neutral-300/80">
                
                    <IFrameNode linkpage={`title?title=${encodeURIComponent(title)}`} nodeId={id} mainpage={false} title={title}/>
                </div>
            <TitleNodeHandles hover={hover} />    
            </div>
        </>
    )
}


const TitleNodeHandles = ({hover} : {hover : boolean} )  => {
    return (
        <>

            <Handle 
            type='target'
            position={Position.Top}
            id='top-target'
            style={{
                ...handleStyle,

                opacity:  0,
            }}
        />
            <Handle 
            type='target'
            position={Position.Bottom}
            id='bottom-target'
            style={{opacity : 0}}
        />
            <Handle 
            type='target'
            position={Position.Left}
            id='left-target'
            style={{opacity : 0}}
        />
            <Handle 
            type='target'
            position={Position.Right}
            id='right-target'
            style={{opacity : 0}}
        />
    
        
        <Handle
            type="source"
            position={Position.Top}
            id="top-source"
            style={{
            ...handleStyle,
            left: '50%',
            top:  hover ? -5 : 0,
            transform: 'translateX(-50%)',
            opacity: hover ? 1 : 0,
            pointerEvents: hover ? 'auto' : 'none',
            }}
        />
        <Handle
            type="source"
            position={Position.Bottom}
            id="bottom-source"
            style={{
            ...handleStyle,
            left: '50%',
            bottom:  hover ? -5 : 0,
            transform: 'translateX(-50%)',
            opacity: hover ? 1 : 0,
            }}
        />
        <Handle
            type="source"
            position={Position.Left}
            id="left-source"
            style={{
            ...handleStyle,
            top: '50%',
            left:  hover ? -5 : 0,
            transform: 'translateY(-50%)',
            opacity: hover ? 1 : 0,
            }}
        />
        <Handle
            type="source"
            position={Position.Right}
            id="right-source"
            style={{
            ...handleStyle,
            top: '50%',
            right:   hover ? -5 : 0,           // small offset to remove edge gap
            transform: 'translateY(-50%)',
            opacity:   hover ? 1 : 0,
            }}
        />
            
        </>
    )
}
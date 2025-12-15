import { useState } from "react";
import { CloseBar } from "./Closebar"
import { IFrameNode } from "./IFrameNode"
import { Handle, Position } from "@xyflow/react";
import { handleStyle } from "./MainPageNode";

export const TitlePageNode = ({id , data} : {id : string ,data : any}) => {

    const title = data?.data
    if (!title) return null;

    const [hover , onHover] = useState<boolean>(false)

    return(
        <>
     
            <div className="w-fit h-fit shadow-2xl relative" 
                 onMouseEnter={() => onHover(true) }
                 onMouseLeave={() => onHover(false) }>
                <CloseBar id={id}/>
                <div className="relative w-fit h-fit bg-neutral-100/30 backdrop-blur-2xl  border-b border-l border-r border-neutral-300 rounded-b-xs p-4 inset-shadow-sm  inset-shadow-neutral-300/80 ">
                
                    <IFrameNode linkpage={`title?title=${encodeURIComponent(title)}`} nodeId={id} mainpage={false} title={title}/>
                </div>
            <TitleNodeHandles hover={hover} onHover={onHover}/>    
            </div>
        </>
    )
}


export const TitleNodeHandles = ({hover } : {hover : boolean , onHover : React.Dispatch<React.SetStateAction<boolean>>} )  => {


    return (
        <>

            <Handle 
            type='target'
            position={Position.Top}
            id='top-target'
            style={{
                ...handleStyle,
                top : 5 ,
                opacity:  0,
            }}
        />
            <Handle 
            type='target'
            position={Position.Bottom}
            id='bottom-target'
            style={{ ...handleStyle, opacity : 0, bottom : 5}}
        />
            <Handle 
            type='target'
            position={Position.Left}
            id='left-target'
            style={{
                ...handleStyle,
                opacity : 0 , 
                left : 5 
            }}
        />
            <Handle 
            type='target'
            position={Position.Right}
            id='right-target'
            style={{
                ...handleStyle,
                opacity : 0,
                right: 5
            }}
        />
    
        
        <Handle
            type="source"
            position={Position.Top}
            id="top-source"
            style={{
                ...handleStyle,
                top : hover ? 0 : 5 ,
                opacity: hover ? 1 : 0,
            }}
        />
        <Handle
            type="source"
            position={Position.Bottom}
            id="bottom-source"
            style={{
                ...handleStyle,
                bottom : hover ? 0 : 5 ,
            opacity: hover ? 1 : 0,
            }}
        />
        <Handle
            type="source"
            position={Position.Left}
            id="left-source"
            style={{
            ...handleStyle,
            left : hover ? 0 : 5 ,
            opacity: hover ? 1 : 0,
            }}
        />
        <Handle
            type="source"
            position={Position.Right}
            id="right-source"
            style={{
            ...handleStyle,
            right : hover ? 0 : 5 ,
            opacity:   hover ? 1 : 0,
            }}
        />
            
        </>
    )
}
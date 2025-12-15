import { useState } from "react"
import { CloseBar } from "./Closebar"
import { Handle, Position } from "@xyflow/react"
import { handleStyle } from "./MainPageNode"

export const AboutNode = () => {

    const [hover , onHover] = useState<boolean>(false)

    
    return (
        <div className="w-fit h-fit shadow-2xl relative" 
            onMouseEnter={() => onHover(true) }
            onMouseLeave={() => onHover(false) }
        >
            <CloseBar id='aboutNode'/>
            <div className="relative w-70   h-100 bg-neutral-100/50 backdrop-blur-2xl  text-neutral-500 rounded-b-xs p-2  font-bold flex items-center justify-center gap-4 flex-col"
                   
            >
                <img src="/Logo.svg" alt="logo" className="size-10"/>
                <p>
                    WikiFlow (ALPHA)
                </p>
                <p className="text-xs text-center font-light">
                    Online platform dedicated to changing how we explore Wikipedia and conduct amateur research. If you're the kind of person who starts on one article about Ping-pong and, 20 tabs later, finds yourself in Algebraic topology, this tool is for you!
                </p>

            </div>
            <TitleNodeHandles hover={hover} onHover={onHover}/>
        </div>
    )
}


const TitleNodeHandles = ({hover } : {hover : boolean , onHover : React.Dispatch<React.SetStateAction<boolean>>} )  => {


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
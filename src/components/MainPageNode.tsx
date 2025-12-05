import { Position, Handle } from '@xyflow/react';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { IFrameNode } from './IFrameNode';
import { CloseBar } from './Closebar';

const handleStyle = {

    width: '10px',
    height: '10px',
    background: '#a3a3a3' ,// neutral-400
    borderColor: '#737373',    // neutral-500
    borderRadius: '2px'  ,
    zIndex: 10,  
    cursor: 'pointer'     // rounded-xs
    
}

function getLinkAtrribute() {
    return null
}


export const MainPageNode = ({id} : {id : string}) => {


    const [hover , onHover] = useState<boolean>(false) 

    

    return (
        <div className="w-fit h-fit shadow-2xl relative" 
            onMouseEnter={() => onHover(true) }
            onMouseLeave={() => onHover(false) }
        >

                <CloseBar/>
                
                <div className="relative w-230 h-130 bg-neutral-100  border-b border-l border-r border-neutral-300 rounded-b-xs p-2 inset-shadow-sm  inset-shadow-neutral-300/80"
                   
                >
                    <IFrameNode linkpage='mainpage' nodeId={id} mainpage={true}/>
                </div>
                
                <MainNodeHandles hover={hover}/>
            
        </div>
    )


}   
const MainNodeHandles = ({hover} : {hover : boolean}) => {


    const onClick = ( ) => {
        console.log('clicked')
    }

    return (
        <>
        <Handle
            type="source"
            position={Position.Top}
            id="a"
            style={{
            ...handleStyle,
            left: '50%',
            top:  hover ? -5 : 0,
            transform: 'translateX(-50%)',
            opacity: hover ? 1 : 0,
            }}
        />
        <Handle
            type="source"
            position={Position.Bottom}
            id="b"
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
            id="c"
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
            id="d"
            style={{
            ...handleStyle,
            top: '50%',
            right:  0,           // small offset to remove edge gap
            transform: 'translateY(-50%)',
            opacity:  0,
            }}
        />

          <Handle
            type="target"
            position={Position.Right}
            id="td"
            style={{
            ...handleStyle,
            opacity : hover ? 1 : 0
            }}
  />

        </>
    )
}
export const InfoNode = () => {
    return (
        <div className="p-4 bg-white border-2 border-gray-400 rounded">
            <p>Info Node</p>
            <Handle type="target" position={Position.Top} id='a'/>
            <Handle type="target" position={Position.Bottom} id='b'/>
            <Handle type="target" position={Position.Left} id='c'/>
            <Handle type="target" position={Position.Right} id='d'/>
        </div>
    )
}


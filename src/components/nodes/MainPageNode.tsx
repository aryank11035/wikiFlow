import { Position, Handle } from '@xyflow/react';
import { memo, useState } from 'react';
import { IFrameNode } from './IFrameNode';
import { CloseBar } from '../Closebar';

export const handleStyle = {

    width: '10px',
    height: '10px',
    background: '#a3a3a3' ,// neutral-400
    borderColor: '#737373',    // neutral-500
    borderRadius: '2px'  ,
    zIndex: 10,  
    cursor: 'pointer'     // rounded-xs
    
}




export const MainPageNode = memo(({id} : {id : string}) => {


    const [hover , onHover] = useState<boolean>(false) 

    

    return (
        <div className="w-fit h-fit shadow-2xl relative" 
            onMouseEnter={() => onHover(true) }
            onMouseLeave={() => onHover(false) }
        >

                <CloseBar id={id}/>
                
                <div className="relative w-250 h-170 bg-neutral-100  border-b border-l border-r border-neutral-300 rounded-b-xs p-4 inset-shadow-sm  inset-shadow-neutral-300/80 "
                   
                >
                    <IFrameNode linkpage='mainpage' nodeId={id} mainpage={true}/>
                </div>
                
                <MainNodeHandles hover={hover} onHover={onHover}/>
            
        </div>
    )


} )  
const MainNodeHandles = memo(({hover } : {hover : boolean , onHover : React.Dispatch<React.SetStateAction<boolean>>}) => {

    return (
        <>

        
        <Handle 
            type='target'
            position={Position.Top}
            id='top-target'
            style={{
                ...handleStyle, 
                top: 5 ,
                opacity:  0,
            }}
        />
            <Handle 
            type='target'
            position={Position.Bottom}
            id='bottom-target'
            style={{ ...handleStyle, opacity : 0 , bottom : 5}}
        />
            <Handle 
            type='target'
            position={Position.Left}
            id='left-target'
            style={{ ...handleStyle, opacity : 0 , left : 5}}
        />
            <Handle 
            type='target'
            position={Position.Right}
            id='right-target'
            style={{ ...handleStyle, opacity : 0 , right : 5}}
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
            bottom : hover ? 0 : 5,
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
            opacity: hover ? 1 : 0,
            }}
        />


        </>
    )
})

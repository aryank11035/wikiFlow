import { Position, Handle } from '@xyflow/react';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

const handleStyle = {

    width: '10px',
    height: '10px',
    background: '#a3a3a3',
      // neutral-400
    borderColor: '#737373',    // neutral-500
    borderRadius: '2px'  ,
    zIndex: 10,  
    cursor: 'pointer'     // rounded-xs
    
}

export const MainPageNode = () => {


    const [hover , onHover] = useState<boolean>(false) 

    

    return (
        <div className="w-fit h-fit shadow-2xl relative" 
            onMouseEnter={() => onHover(true) }
            onMouseLeave={() => onHover(false) }
        >

                <div className="w-full bg-neutral-300 h-fit rounded-t-xs border border-neutral-400 flex justify-between items-center inset-shadow-sm  inset-shadow-neutral-200/50">
                    <p className="text-white pl-2 text-xs font-bold text-shadow-lg">en.wikipedia.org</p>
                    <div className="text-white p-2 text-center flex items-center justify-center hover:text-neutral-500 duration-300 h-full cursor-pointer">
                        <X size={15}/>
                    </div>
                </div>
                
                <div className="relative w-230 h-130 bg-neutral-100  border-b border-l border-r border-neutral-300 rounded-b-xs p-2 inset-shadow-sm  inset-shadow-neutral-300/80 "
                   
                >
                    <iframe
                        id='the-iframe'
                        src="http://localhost:3001/mainpage"
                        className=" w-full h-full  rounded-xs "
                    />
                </div>
                
                            <>
                                <Handle type="source" position={Position.Top}  style={{ ...handleStyle , position: 'absolute',    top: 6 ,   opacity : 0 }} id='a' />
                                <Handle type="source" position={Position.Bottom}  style={{ ...handleStyle , position: 'absolute',   bottom : 6 ,   opacity : 0 }}  id='b'/>
                                <Handle type="source" position={Position.Left}  style={{ ...handleStyle ,position: 'absolute',    left : 6 ,   opacity : 0 }} id='c'/>
                                <Handle type="source" position={Position.Right} style={{ ...handleStyle , position: 'absolute',   right : 6 ,   opacity : 0  }} id='d'/>

{/*                        
                                        <>
                                            <Handle type="target" position={Position.Top}  style={handleStyle } id='ta' />
                                            <Handle type="target" position={Position.Bottom}  style={handleStyle }  id='tb'/>
                                            <Handle type="target" position={Position.Left}  style={handleStyle } id='tc'/>
                                            <Handle type="target" position={Position.Right} style={handleStyle } id='td'/>
                                        </>
                              */}

                            </>
                     
            
        </div>
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


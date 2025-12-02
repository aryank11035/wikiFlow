import { Position, Handle } from '@xyflow/react';
import { useState } from 'react';


export const MainPageNode = () => {


    const [hover , onHover] = useState<boolean>(false) 

    return (
        <div className="w-fit h-fit " 
            onMouseEnter={() => onHover(true) }
            onMouseLeave={() => onHover(false) }
        >

                <div className="w-full bg-neutral-300 h-fit rounded-t-md border border-neutral-400 flex justify-between px-2 items-center">
                    <p className="text-white">en.wikipedia.org</p>
                    <div className="text-white">
                        x
                    </div>
                </div>
                
                <div className="w-230 h-130 overflow-y-hidden p-2 no-scrollbar bg-neutral-100  border-b border-l border-r border-neutral-400 rounded-b-md "
                   
                >
                    <iframe
                        src="http://localhost:3001/mainpage"
                        className="bg-white  w-full h-full px-2 "
                    />
                    {
                        hover && (
                            <>
                            
                                <Handle type="source" position={Position.Top} />
                                <Handle type="target" position={Position.Bottom} />
                            </>
                        )
                    }
                </div>
            
        </div>
    )


}   
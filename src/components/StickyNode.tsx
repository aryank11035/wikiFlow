import { Handle, NodeResizeControl, Position } from '@xyflow/react';
import { useState, useRef, useEffect } from 'react';
import { handleStyle } from './MainPageNode';
import { X } from 'lucide-react';
import { useDeleteNode } from '../helpers/delete-node';

export const StickyNode = ({data , id} : {data : {text : string} , id : string}) => {

     const deleteNode = useDeleteNode()

    const [hover , onHover] = useState<boolean>(false)
    const [stickyInput,setStickyInput] = useState<string>(data?.text)
    const [clicked,setClicked] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [fontSize, setFontSize] = useState<number>(14)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const adjustFontSize = () => {
            const textarea = textareaRef.current;
            const container = containerRef.current;
            if (!textarea || !container) return;

            // Get container dimensions
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            let currentSize = 18;
            
            // Create a temporary element to measure text dimensions
            const measureDiv = document.createElement('div');
            measureDiv.style.position = 'absolute';
            measureDiv.style.visibility = 'hidden';
            measureDiv.style.whiteSpace = 'pre-wrap';
            measureDiv.style.wordWrap = 'break-word';
            measureDiv.style.padding = '1rem';
            measureDiv.style.width = `${containerWidth}px`;
            measureDiv.style.fontWeight = '600';
            measureDiv.textContent = stickyInput || 'A';
            document.body.appendChild(measureDiv);

            // Reduce font size until it fits both width and height
            while (currentSize > 8) {
                measureDiv.style.fontSize = `${currentSize}px`;
                
                const textHeight = measureDiv.scrollHeight;
                
                if (textHeight <= containerHeight) {
                    break;
                }
                
                currentSize -= 0.5;
            }

            document.body.removeChild(measureDiv);
            setFontSize(currentSize);
        };

        adjustFontSize();
    }, [stickyInput]);

    // Handle container resize
    const handleResize = () => {
        const textarea = textareaRef.current;
        const container = containerRef.current;
        if (!textarea || !container) return;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        let currentSize = 18;
        
        const measureDiv = document.createElement('div');
        measureDiv.style.position = 'absolute';
        measureDiv.style.visibility = 'hidden';
        measureDiv.style.whiteSpace = 'pre-wrap';
        measureDiv.style.wordWrap = 'break-word';
        measureDiv.style.padding = '1rem';
        measureDiv.style.width = `${containerWidth}px`;
        measureDiv.style.fontWeight = '600';
        measureDiv.textContent = stickyInput || 'A';
        document.body.appendChild(measureDiv);

        while (currentSize > 8) {
            measureDiv.style.fontSize = `${currentSize}px`;
            
            if (measureDiv.scrollHeight <= containerHeight) {
                break;
            }
            
            currentSize -= 0.5;
        }

        document.body.removeChild(measureDiv);
        setFontSize(currentSize);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };


    return (
        <>
 
        <NodeResizeControl 
            style={{background : 'transparent'}} 
            minWidth={150} 
            minHeight={100} 
            maxHeight={300} 
            maxWidth={280}
            onResize={handleResize}
        />

        
        
        <TitleNodeHandles hover={hover} onHover={onHover}/>
            <div 
                ref={containerRef}
                className={` absolute inset-0 bg-yellow-300/40 backdrop-blur-xl w-full h-full  shadow-2xl shadow-yellow-300/${clicked ? '50' : '30'} text-neutral-600 font-semibold flex flex-col border border-yellow-500/50 rounded-xs` }
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                onClick={() => setClicked(true)}
                onDoubleClick={handleDoubleClick}
            >
                <button onClick={() => deleteNode(id)} className="text-yellow-500/50 p-1 text-center flex items-center justify-center hover:text-yellow-600 duration-300  cursor-pointer  w-fit self-end h-fit">
                    <X size={15}/>
                </button>
                <textarea  
                    ref={textareaRef}
                    readOnly={!isEditing}
                    placeholder='write something..'
                    style={{ fontSize: `${fontSize}px`, lineHeight: '1.4' }}
                    className={`grow p-2 outline-0 border-0 bg-transparent overflow-hidden resize-none w-full : placeholder:text-sm ${!isEditing ? 'pointer-events-none' : ''}`}
                    onChange={(e) => setStickyInput(e.target.value)} 
                    value={stickyInput}
                    onBlur={handleBlur}
                />
            </div>
        </>
    )
}

const TitleNodeHandles = ({hover, onHover} : {hover : boolean , onHover : React.Dispatch<React.SetStateAction<boolean>>} )  => {


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
    
        <div className="absolute flex items-center justify-center  w-full h-full ">
            <Handle
                type="source"
                position={Position.Top}
                id="top-source"

                style={{
                    display : 'absolute',
                    ...handleStyle,
                    top : hover ? 0 : 5,
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
        </div>
            
        </>
    )
}
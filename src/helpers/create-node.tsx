import { useReactFlow } from "@xyflow/react";


export const useNodeAction =  () => {
    const { setNodes } = useReactFlow();

    const createNewNode = (newNodeId : string , newPosition : { x : number , y : number } , label : string , nodeType : string ,title ?: string , style ?: {width : number , height : number}) => {
        const newNode = {
            id: newNodeId,
            position: {
                x : newPosition.x ,
                y : newPosition.y 
            },
            ...(style && { style }),
            data: { 
                label: label,
                data : title || '',
            },
            type: nodeType
        }
        setNodes(nodes => [...nodes, newNode]);
    }

    return { createNewNode }
}
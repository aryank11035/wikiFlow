import { useReactFlow } from "@xyflow/react";

export function useDeleteNode () {
    const { setEdges , setNodes } = useReactFlow()

    return (id : string) => {
        setNodes((nodes) => nodes.filter(n => n.id !== id));
        setEdges((edges) => edges.filter(e => e.source !== id && e.target !== id));
    }
}

export const useDeleteActions = () => {
    const { setEdges , setNodes } = useReactFlow()


    const deleteEdge = ( id : string[]) => {
        document.addEventListener('keydown' , (e : KeyboardEvent) => {
            if(e.key === 'Delete') {
                setEdges((edges => edges.filter(edg => !id.includes(edg.id) )))
            }
        })

    }  
    const deleteNode = ( id : string[]) => {
        document.addEventListener('keydown' , (e : KeyboardEvent) => {
            if(e.key === 'Delete') {
                setNodes((nodes => nodes.filter(nd => !id.includes(nd.id) )))
            }
        })

    }  

    return { deleteEdge , deleteNode }
}
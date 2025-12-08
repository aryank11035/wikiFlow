import { useReactFlow } from "@xyflow/react";

export function useDeleteNode () {
    const { setEdges , setNodes } = useReactFlow()

    return (id : string) => {
        setNodes((nodes) => nodes.filter(n => n.id !== id));
        setEdges((edges) => edges.filter(e => e.source !== id && e.target !== id));
    }
}
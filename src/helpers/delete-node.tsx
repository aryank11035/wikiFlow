import { useReactFlow, type Edge } from "@xyflow/react";
import { useCallback, useEffect, useRef } from "react";

export function useDeleteNode () {
    const { setEdges , setNodes } = useReactFlow()

    return (id : string) => {
        setNodes((nodes) => nodes.filter(n => n.id !== id));
        setEdges((edges) => edges.filter(e => e.source !== id && e.target !== id));
    }
}

export const useDeleteActions = () => {
    const { setEdges, setNodes } = useReactFlow()
    const selectedNodeIdsRef = useRef<string[]>([])
    const selectedEdgeIdsRef = useRef<string[]>([])

    // Single keydown listener for the entire component lifecycle
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Delete') {
                const nodeIds = selectedNodeIdsRef.current
                const edgeIds = selectedEdgeIdsRef.current
                
                if (edgeIds.length > 0) {
                    setEdges((prevEdges) => 
                        prevEdges.filter(edge => !edgeIds.includes(edge.id))
                    )
                    selectedEdgeIdsRef.current = []
                }
                
                if (nodeIds.length > 0) {
                    setNodes((prevNodes) => 
                        prevNodes.filter(node => !nodeIds.includes(node.id))
                    )
                    selectedNodeIdsRef.current = []
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [setEdges, setNodes])

    const deleteEdge = useCallback((ids: string[]) => {
        selectedEdgeIdsRef.current = ids
    }, [])

    const deleteNode = useCallback((ids: string[]) => {
        selectedNodeIdsRef.current = ids
    }, [])

    return { deleteEdge, deleteNode }
}


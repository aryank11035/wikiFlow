import './App.css'

import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, addEdge, useNodesState, useEdgesState  } from '@xyflow/react';
import type { Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';  
import { useCallback, useEffect, useState } from 'react';
import {  InfoNode, MainPageNode } from './components/MainPageNode';
import { TitlePageNode } from './components/TitlePageNode';


const nodeTypes = {
  mainPageNode : MainPageNode,
  infoNode : InfoNode,
  titlePageNode : TitlePageNode
}



const initialNodes = [
  {
    id: 'mainPageNode',
    position: { x: 0, y: 0 },
    data: { label: 'mainPageNode' },
    type: 'mainPageNode',
  },
  {
    id: 'titlePageNode',
    position: { x: 1000, y: 0 },
    data: { label: 'titlePageNode' },
    type : 'titlePageNode'
  },

];
const initialEdges = [
  {
    id: 'mainPageNode-titlePageNode',
    source: 'mainPageNode',
    sourceHandle : 'right-source',
    target: 'titlePageNode',
    targetHandle: 'left-target'
    // type:'bezier',
  },
];

export default function App() {
 

  const [nodes, setNodes ,onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges , onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback(
    (connection: any) => {
      setEdges((edgesSnapshot) => addEdge(connection, edgesSnapshot))
    },
    [],
  );
 
  const handleEdgesChange = ( draggedNode : Node ) => {

    setEdges((currentEdge) => {
        return currentEdge.map((edge) => {
            if(edge.source === draggedNode.id || edge.target === draggedNode.id){
                
              const sourceNode = nodes.find(n => n.id === edge.source)
              const targetNode = nodes.find(n => n.id === edge.target)

              if (!sourceNode || !targetNode) return edge;

              const { sourceHandle, targetHandle } = calculateBestHandles(sourceNode, targetNode);
  

              return { ...edge , sourceHandle , targetHandle }

            }

            return edge
        })
    })
  }

  const calculateBestHandles = (sourceNode: any, targetNode: any) => {

    
    const sourceCenterX = sourceNode.position.x + (sourceNode.measured?.width || 0) / 2;
    const sourceCenterY = sourceNode.position.y + (sourceNode.measured?.height || 0) / 2;
    const targetCenterX = targetNode.position.x + (targetNode.measured?.width || 0) / 2;
    const targetCenterY = targetNode.position.y + (targetNode.measured?.height || 0) / 2;
    
    const deltaX = targetCenterX - sourceCenterX;
    const deltaY = targetCenterY - sourceCenterY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        return { sourceHandle: 'right-source', targetHandle: 'left-target' };
      } else {
        return { sourceHandle: 'left-source', targetHandle: 'right-target' };
      }
    } else {
      if (deltaY > 0) {
        return { sourceHandle: 'bottom-source', targetHandle: 'top-target' };
      } else {
        return { sourceHandle: 'top-source', targetHandle: 'bottom-target' };
      }
    }

  };

  const onNodeDrag = (e : React.MouseEvent , node : Node) => {
    handleEdgesChange(node)
  }



  useEffect(() => {
    const handleMessage = (e : MessageEvent) => {
      if(e.origin !== 'http://localhost:3001') return   
      
      if(e.data.type === 'WIKI_LINK_CLICKED') {
        const {title , sourceNodeId} = e.data
        
        const newNodeId = `title-${title.replace(/\s+/g, '-')}-${Date.now()}`;   
        const sourceNode = nodes.find((n: any) => n.id === sourceNodeId);
        const newPosition = {
          x: sourceNode ? sourceNode.position.x + 400 : Math.random() * 500,
          y: sourceNode ? sourceNode.position.y + Math.random() * 100 - 50 : Math.random() * 500,
        };

        const newNode = {
          id: newNodeId,
          position: newPosition,
          data: { 
            label: title,
            title: title 
          },
          type: 'titlePageNode',
        };
        
        // Create new edge
        const newEdge = {
          id: `${sourceNodeId}-${newNodeId}`,
          source: sourceNodeId,
          sourceHandle:'right-source',
          target: newNodeId,
          targetHandle: 'left-target',
        };
        
        // Update state
        setNodes((nds: any) => [...nds, newNode]);
        setEdges((eds) => [...eds, newEdge]);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  },[nodes])

  
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'auto' }} >
      {/* forget react flow temporarily */}
      <ReactFlow 
        nodes={nodes} 
        edges={edges}   
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}

        style={{ backgroundColor: "#ffffff" }}
        zoomOnScroll={false}
        fitView
      >
        <Background 
           color="#ffffff"
            gap={0}
        />
        <Controls />
      </ReactFlow>
       {/* <MainPageNode/> */}
    </div>
  );
}
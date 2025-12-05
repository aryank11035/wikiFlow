import './App.css'

import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
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
  // {
  //   id: 'infoNode',
  //   position: { x: 1000, y: 400 },
  //   data: { label: 'infoNode' },
  //   type : 'infoNode'
  // },
];
const initialEdges = [
  {
    id: 'mainPageNode-titlePageNode',
    source: 'mainPageNode',
    sourceHandle : 'd',
    target: 'infoNode',
    // type:'bezier',
  },
];

export default function App() {
 

  const [nodes, setNodes] = useState<any>(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot : any) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

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
          sourceHandle: 'd',
          target: newNodeId,
          targetHandle: 'c',
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
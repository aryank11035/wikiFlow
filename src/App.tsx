import './App.css'

import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';  
import { useCallback, useEffect, useState } from 'react';
import {  InfoNode, MainPageNode } from './components/MainPageNode';


const nodeTypes = {
  mainPageNode : MainPageNode,
  infoNode : InfoNode,
}



const initialNodes = [
  {
    id: 'mainPageNode',
    position: { x: 0, y: 0 },
    data: { label: 'mainPageNode' },
    type: 'mainPageNode',
  },
  {
    id: 'infoNode',
    position: { x: 1000, y: 400 },
    data: { label: 'infoNode' },
    type : 'infoNode'
  },
];
const initialEdges = [
  {
    id: 'mainPageNode-infoNode',
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
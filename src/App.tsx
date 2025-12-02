import './App.css'

import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';  
import { useCallback, useEffect, useState } from 'react';

const initialNodes = [
  {
    id: 'n1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    type: 'input',
  },
  {
    id: 'n2',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
  {
    id: 'n3',
    position: { x: 200, y: 200 },
    data: { label: 'Node 3' },
  },
];
const initialEdges = [
  {
    id: 'n1-n2',
    source: 'n1',
    target: 'n2',
    type:'step',
    label: 'connects with',
  },
];

export default function App() {
 

  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);
  
  // const onNodesChange = useCallback(
  //   (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
  //   [],
  // );
  // const onEdgesChange = useCallback(
  //   (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
  //   [],
  // );

  // const onConnect = useCallback(
  //   (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
  //   [],
  // );
  
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'auto' }}>
      {/* forget react flow temporarily */}
      {/* <ReactFlow 
        nodes={nodes} 
        edges={edges}   
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
      </ReactFlow> */}
       <iframe
    src="http://localhost:3001/mainpage"
    style={{ width: "100%", height: "100vh", border: "none" }}
    />
    </div>
  );
}
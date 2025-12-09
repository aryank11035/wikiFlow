import './App.css'

import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, addEdge, useNodesState, useEdgesState, useReactFlow ,Panel   } from '@xyflow/react';
import type { Edge, Node, ReactFlowInstance } from '@xyflow/react';
import '@xyflow/react/dist/style.css';  
import { useCallback, useEffect, useRef, useState } from 'react';
import {  InfoNode, MainPageNode } from './components/MainPageNode';
import { TitlePageNode } from './components/TitlePageNode';
import { ImagePageNode } from './components/ImgPageNode';
import { createNewNode } from './helpers/create-node';
import { AboutNode } from './components/AboutNode';
import { MenuPanel, SearchPanel } from './components/panels/panels';


const nodeTypes = {
  mainPageNode : MainPageNode,
  infoNode : InfoNode,
  titlePageNode : TitlePageNode,
  imagePageNode : ImagePageNode ,
  aboutNode : AboutNode ,
}

let yPos = 200

const initialNodes = [
  {
    id: 'mainPageNode',
    position: { x: -200 , y: 0 },
    data: { label: 'mainPageNode' },
    type: 'mainPageNode',
  },
  {
    id: 'aboutNode',
    position: { x: 1000 , y: 25 },
    data: { label: 'aboutNode' },
    type: 'aboutNode',
  },
  
];

const initialEdges = [
  {
    id: 'mainPageNode-aboutNode',
    source: 'mainPageNode',
    sourceHandle : 'right-source',
    target: 'aboutNode',
    targetHandle: 'left-target'
  },
];

export default function App() {
 
   const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  // Fit view on load
  const onLoad = (rfi: ReactFlowInstance) => {
    reactFlowInstance.current = rfi;
    rfi.fitView();
  };

  // Fit view on window resize
  useEffect(() => {
    const handleResize = () => {
      if (reactFlowInstance.current) {
        reactFlowInstance.current.fitView();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
          x: !sourceNodeId.includes('title') ? sourceNode.position.x + 1200 :sourceNode.position.x + 100,
          y:  sourceNode.position.y  ,
        };
        
        const newNode = createNewNode(newNodeId , newPosition , title , 'titlePageNode' , title )
        
        

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
      if(e.data.type === 'WIKI_IMG_CLICKED'){
       
        const { src , sourceNodeId} =  e.data
      
        const newNodeId = `img-${src}-${Date.now()}`
        const sourceNode = nodes.find((n : any) => n.id === sourceNodeId)

        const newPosition = {
          x: !sourceNodeId.includes('title') ? sourceNode.position.x  + 1200 : sourceNode.position.x + 800,
          y: sourceNode.position.y 
        };

        

        const newNode = createNewNode(newNodeId , newPosition , src , 'imagePageNode' , src )

         const newEdge = {
          id: `${sourceNodeId}-${newNodeId}`,
          source: sourceNodeId,
          sourceHandle:'right-source',
          target: newNodeId,
          targetHandle: 'left-target',

        };

        setNodes((nds: any) => [...nds, newNode]);
        setEdges((eds) => [...eds, newEdge]);

      }
    }


    
    
    
    
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  },[nodes])
  
  const handleMainPage = () => {
    const newNode = createNewNode(`mainPageNode-${Date.now()}` , {x : 600 , y :100} , 'mainPageNode' , 'mainPageNode' , 'mainPageNode' )
    setNodes((nds: any) => [...nds, newNode]);
  }
  
  return (
    <div style={{ height: '100vh', width: '100%'}} ref={reactFlowWrapper}>
      {/* forget react flow temporarily */}
      <ReactFlow 
        proOptions={{ hideAttribution: true }}  
        nodes={nodes} 
        edges={edges}   
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        style={{ backgroundColor: "#ffffff" }}
        fitView
      >
        <Panel position='top-center'>
            <SearchPanel/>
        </Panel>
        <Panel position="bottom-center">
         <MenuPanel handleMainPage={handleMainPage}/>
        </Panel>
        
        <Background 
           color="#ffffff"
            gap={0}
            
        />
      </ReactFlow>
       {/* <MainPageNode/> */}
    </div>
  );
}
import './App.css'
import '@xyflow/react/dist/style.css';  

import { ReactFlow, Background,addEdge, useNodesState, useEdgesState ,Panel     } from '@xyflow/react';
import type { Connection, Edge, Node } from '@xyflow/react';
import { useCallback, useEffect } from 'react';
import {  InfoNode, MainPageNode } from './components/MainPageNode';
import { TitlePageNode } from './components/TitlePageNode';
import { ImagePageNode } from './components/ImgPageNode';
import { AboutNode } from './components/AboutNode';
import { MenuPanel, SearchPanel } from './components/panels/panels';
import { useNodeAction } from './helpers/create-node';
import CustomClickableEdge from './components/CustomEdge';
import { useDeleteActions } from './helpers/delete-node';
import { StickyNode } from './components/StickyNode';
import { OffsetConnectionLine } from './components/CustomConnectionLine';


const nodeTypes = {
  mainPageNode : MainPageNode,
  infoNode : InfoNode,
  titlePageNode : TitlePageNode,
  imagePageNode : ImagePageNode ,
  aboutNode : AboutNode ,
  stickyNode : StickyNode ,
}
const edgeTypes = {
  'customEdge' : CustomClickableEdge
}

const initialNodes = [
  {
    id: 'mainPageNode',
    position: { x: -200 , y: 0 },
    data: { label: 'mainPageNode' },
    type: 'mainPageNode'

  },
  {
    id: 'aboutNode',
    position: { x: 1000 , y: 25 },
    data: { label: 'aboutNode' },
    type: 'aboutNode',
  },
  {
    id: 'stickyNode',
    position: { x: 1000 , y: 500 },
    style: { 
      width: 240, 
      height: 150 
    },
    data: { label: 'stickyNode' , text : 'Drag the canvas to move, Scroll + Ctrl to zoom' },
    type: 'stickyNode',
  },
  
];

const initialEdges = [
  {
    id: 'mainPageNode-aboutNode',
    source: 'mainPageNode',
    sourceHandle : 'right-source',
    target: 'aboutNode',
    targetHandle: 'left-target',
    type: 'customEdge',
  },
];

export default function App() {
 
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges , onEdgesChange] = useEdgesState<any>(initialEdges);

  const { createNewNode } = useNodeAction()
  const { deleteEdge  , deleteNode } = useDeleteActions()

  const onConnect = useCallback(
  (connection: Connection) => {
    setEdges((eds) => {
      const filtered = eds.filter(
        (e) => e.target !== connection.target
      );
      return addEdge(
        {
          ...connection,
          type: "customEdge",
        },
        filtered
      );
    });
  },
  []
  );

  const handleSelectionChange = useCallback((params : {nodes : Node[] , edges : Edge[]}) =>  {


    if (params.nodes.length === 0 && params.edges.length === 0) return;


    const nodesToDelete = params.nodes.map(nod => nod.id)
    const edgesToDelete = params.edges.map(edg =>  edg.id)

    deleteEdge(edgesToDelete)
    deleteNode(nodesToDelete)

  },[deleteEdge,deleteNode])

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
    
        // Create new edge
        const newEdge = {
          id: `${sourceNodeId}-${newNodeId}`,
          source: sourceNodeId,
          sourceHandle:'right-source',
          target: newNodeId,
          targetHandle: 'left-target',
          type : 'customEdge'
        };
        
        // Update state
        
        createNewNode(newNodeId , newPosition , title , 'titlePageNode' , title )
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

        const newEdge = {
          id: `${sourceNodeId}-${newNodeId}`,
          source: sourceNodeId,
          sourceHandle:'right-source',
          target: newNodeId,
          targetHandle: 'left-target',
          type : 'customEdge'
          
        };
        
        
        createNewNode(newNodeId , newPosition , src , 'imagePageNode' , src )
        setEdges((eds) => [...eds, newEdge]); 

      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  },[nodes])
  
  const handleMainPage = () => {
    createNewNode(`mainPageNode-${Date.now()}` , {x : 600 , y :100} , 'mainPageNode' , 'mainPageNode' , 'mainPageNode' )
  }
  
  const onEdgeClick = useCallback((event : any ,edge : Edge) => {
    deleteEdge([edge.id])
  },[])

  return (
    <div style={{ height: '100vh', width: '100%'}}>
     
      <ReactFlow 
        proOptions={{ hideAttribution: true }}  
        nodes={nodes} 
        edges={edges} 
        connectionLineComponent={OffsetConnectionLine}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        onEdgeClick={onEdgeClick}
        onSelectionChange={handleSelectionChange}
        style={{ backgroundColor: "#ffffff" }}
        zoomOnScroll={false}
        panOnScroll={true}
        minZoom={0.1}
         maxZoom={4} 
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
       
    </div>
  );
}
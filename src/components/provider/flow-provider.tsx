import { ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import App from '../../App';
 
function FlowWithProvider() {
 
 
  return (
    <ReactFlowProvider>
      <App  />
    </ReactFlowProvider>
  );
}
 
export default FlowWithProvider;
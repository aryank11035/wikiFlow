
import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react';

function CustomClickableEdge({ 

  sourceX, 
  sourceY, 
  targetX, 
  targetY, 
  sourcePosition, 
  targetPosition, 
  style = {}, 
  markerEnd,
  selected
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeStyle = selected 
    ? { 
        ...style, 
        stroke: '#4299e1', 
        strokeWidth: 2,
        strokeDasharray: '5, 5', 
      } 
    : {
        ...style,
        stroke: '#b1b1b7',
        strokeWidth: 2,
      };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={edgeStyle} interactionWidth={30}
/>
      {selected && (
        <BaseEdge 
        interactionWidth={30}

          path={edgePath} 
          style={{
            stroke: '#4299e1', 
            strokeWidth: 2,
            strokeOpacity: 0.5,
            strokeDasharray: '5, 5',
          }} 
        />
      )}
    </>
  );
}

export default CustomClickableEdge;
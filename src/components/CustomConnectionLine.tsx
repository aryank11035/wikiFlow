import { type ConnectionLineComponentProps, Position , getBezierPath} from '@xyflow/react';

const GAP = 5;

function offsetPoint(
  x: number,
  y: number,
  position: Position | null,
  gap: number
) {
  if (!position) return { x, y };

  switch (position) {
    case Position.Top:
      return { x, y: y - gap };
    case Position.Bottom:
      return { x, y: y + gap };
    case Position.Left:
      return { x: x - gap, y };
    case Position.Right:
      return { x: x + gap, y };
    default:
      return { x, y };
  }
}
export function OffsetConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  fromPosition,
}: ConnectionLineComponentProps) {
  const from = offsetPoint(fromX, fromY, fromPosition, GAP);

    const [path] = getBezierPath({
    sourceX: from.x,
    sourceY: from.y,
    sourcePosition: fromPosition!,
    targetX: toX,
    targetY: toY,
    // temporary guess while dragging
    targetPosition: fromPosition!,
  });


  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke='#b1b1b7'
        strokeWidth={1}
      />
    </g>
  );
}

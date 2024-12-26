import React, { useState } from 'react';
import { Node, Position } from '../types/algorithms';

interface PathfindingVisualizerProps {
  grid: Node[][];
  onNodeClick: (row: number, col: number) => void;
}

const PathfindingVisualizer: React.FC<PathfindingVisualizerProps> = ({
  grid,
  onNodeClick,
}) => {
  return (
    <div className="grid gap-0.5 bg-gray-200 p-0.5 rounded-lg">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-0.5">
          {row.map((node, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onNodeClick(rowIndex, colIndex)}
              className={`
                w-6 h-6 rounded-sm transition-colors cursor-pointer
                ${node.isWall ? 'bg-gray-800' : ''}
                ${node.isStart ? 'bg-green-500' : ''}
                ${node.isEnd ? 'bg-red-500' : ''}
                ${node.isVisited && !node.isPath ? 'bg-blue-200' : ''}
                ${node.isPath ? 'bg-yellow-400' : ''}
                ${node.isConsidering ? 'bg-purple-300' : ''}
                ${!node.isWall && !node.isStart && !node.isEnd && !node.isVisited && !node.isPath && !node.isConsidering ? 'bg-white hover:bg-gray-100' : ''}
              `}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PathfindingVisualizer;
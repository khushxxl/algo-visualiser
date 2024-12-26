import React from 'react';
import { ArrayBar } from '../types/algorithms';

interface ArrayVisualizerProps {
  array: ArrayBar[];
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ array }) => {
  const maxValue = Math.max(...array.map(item => item.value));

  return (
    <div className="flex items-end justify-center gap-1 h-64 w-full">
      {array.map((item, index) => (
        <div
          key={index}
          style={{
            height: `${(item.value / maxValue) * 100}%`,
            width: `${100 / array.length}%`,
            maxWidth: '40px',
            transition: 'all 0.1s ease-in-out',
          }}
          className={`
            rounded-t-md
            ${item.isComparing ? 'bg-yellow-500' : ''}
            ${item.isSwapping ? 'bg-red-500' : ''}
            ${item.isSorted ? 'bg-green-500' : ''}
            ${!item.isComparing && !item.isSwapping && !item.isSorted ? 'bg-indigo-500' : ''}
          `}
        />
      ))}
    </div>
  );
};

export default ArrayVisualizer;
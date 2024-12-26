import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface AlgorithmControlsProps {
  onSort: () => void;
  onReset: () => void;
  isSorting: boolean;
}

const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({
  onSort,
  onReset,
  isSorting,
}) => {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={onSort}
        disabled={isSorting}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Play size={20} />
        Start Sorting
      </button>
      <button
        onClick={onReset}
        disabled={isSorting}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <RotateCcw size={20} />
        Reset Array
      </button>
    </div>
  );
};

export default AlgorithmControls;
import React from 'react';
import { AlgorithmType } from '../types/algorithms';

interface AlgorithmPickerProps {
  currentAlgorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  disabled: boolean;
}

const algorithms = [
  { type: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)' },
  { type: 'quick', name: 'Quick Sort', complexity: 'O(n log n)' },
  { type: 'merge', name: 'Merge Sort', complexity: 'O(n log n)' },
  { type: 'dijkstra', name: 'Dijkstra', complexity: 'O((V + E) log V)' },
] as const;

const AlgorithmPicker: React.FC<AlgorithmPickerProps> = ({
  currentAlgorithm,
  onAlgorithmChange,
  disabled,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {algorithms.map(({ type, name, complexity }) => (
        <button
          key={type}
          onClick={() => onAlgorithmChange(type)}
          disabled={disabled}
          className={`
            p-4 rounded-lg border-2 transition-all
            ${
              currentAlgorithm === type
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">Complexity: {complexity}</p>
        </button>
      ))}
    </div>
  );
};

export default AlgorithmPicker;
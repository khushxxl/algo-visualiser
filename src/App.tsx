import React from "react";
import { useAlgorithm } from "./hooks/useAlgorithm";
import { usePathfinding } from "./hooks/usePathfinding";
import { generateRandomArray } from "./utils/arrayUtils";
import ArrayVisualizer from "./components/ArrayVisualizer";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import AlgorithmControls from "./components/AlgorithmControls";
import AlgorithmPicker from "./components/AlgorithmPicker";
import { Activity } from "lucide-react";

const INITIAL_ARRAY_SIZE = 50;

function App() {
  const {
    array,
    isSorting,
    currentAlgorithm,
    setCurrentAlgorithm,
    resetArray,
    sort,
  } = useAlgorithm(generateRandomArray(INITIAL_ARRAY_SIZE));

  const { grid, isRunning, resetGrid, toggleWall, visualize } =
    usePathfinding();

  const handleReset = () => {
    if (currentAlgorithm === "dijkstra") {
      resetGrid();
    } else {
      resetArray(generateRandomArray(INITIAL_ARRAY_SIZE));
    }
  };

  const handleStart = () => {
    if (currentAlgorithm === "dijkstra") {
      visualize();
    } else {
      sort();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center gap-3 p-5">
        <Activity className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">
          Algorithm Visualizer
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mt-20">
          <AlgorithmPicker
            currentAlgorithm={currentAlgorithm}
            onAlgorithmChange={setCurrentAlgorithm}
            disabled={isSorting || isRunning}
          />

          <AlgorithmControls
            onSort={handleStart}
            onReset={handleReset}
            isSorting={isSorting || isRunning}
          />

          {currentAlgorithm === "dijkstra" ? (
            <PathfindingVisualizer grid={grid} onNodeClick={toggleWall} />
          ) : (
            <ArrayVisualizer array={array} />
          )}
        </div>

        <div className="mt-8 text-center text-gray-600">
          {currentAlgorithm === "dijkstra" ? (
            <p>
              Click cells to create walls, then start the pathfinding algorithm!
            </p>
          ) : (
            <p>Watch as the algorithm sorts the array in real-time!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

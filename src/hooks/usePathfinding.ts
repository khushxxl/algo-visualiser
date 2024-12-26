import { useState, useCallback } from 'react';
import { Node, Position } from '../types/algorithms';
import { dijkstra } from '../algorithms/dijkstra';

const GRID_ROWS = 20;
const GRID_COLS = 30;

const createNode = (): Node => ({
  isWall: false,
  isStart: false,
  isEnd: false,
  isVisited: false,
  isPath: false,
  isConsidering: false,
});

const createInitialGrid = (): Node[][] => {
  const grid: Node[][] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow: Node[] = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push(createNode());
    }
    grid.push(currentRow);
  }
  
  // Set initial start and end positions
  const start: Position = { row: 10, col: 5 };
  const end: Position = { row: 10, col: 25 };
  
  grid[start.row][start.col].isStart = true;
  grid[end.row][end.col].isEnd = true;
  
  return grid;
};

export const usePathfinding = () => {
  const [grid, setGrid] = useState<Node[][]>(createInitialGrid());
  const [isRunning, setIsRunning] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ row: 10, col: 5 });
  const [endPos, setEndPos] = useState<Position>({ row: 10, col: 25 });

  const resetGrid = useCallback(() => {
    setGrid(createInitialGrid());
    setIsRunning(false);
  }, []);

  const toggleWall = useCallback((row: number, col: number) => {
    if (!isRunning && !grid[row][col].isStart && !grid[row][col].isEnd) {
      const newGrid = [...grid];
      newGrid[row][col] = {
        ...newGrid[row][col],
        isWall: !newGrid[row][col].isWall,
      };
      setGrid(newGrid);
    }
  }, [grid, isRunning]);

  const visualize = async () => {
    if (!isRunning) {
      setIsRunning(true);
      const newGrid = grid.map(row =>
        row.map(node => ({
          ...node,
          isVisited: false,
          isPath: false,
          isConsidering: false,
        }))
      );
      setGrid(newGrid);
      await dijkstra(newGrid, startPos, endPos, setGrid);
      setIsRunning(false);
    }
  };

  return {
    grid,
    isRunning,
    resetGrid,
    toggleWall,
    visualize,
  };
};
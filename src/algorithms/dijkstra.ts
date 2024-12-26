import { Node, Position } from '../types/algorithms';
import { sleep } from '../utils/arrayUtils';

export async function dijkstra(
  grid: Node[][],
  start: Position,
  end: Position,
  setGrid: (grid: Node[][]) => void
): Promise<void> {
  const rows = grid.length;
  const cols = grid[0].length;
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: Position | null } = {};
  const unvisited = new Set<string>();

  // Initialize distances
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const pos = `${i},${j}`;
      distances[pos] = Infinity;
      previous[pos] = null;
      unvisited.add(pos);
    }
  }
  distances[`${start.row},${start.col}`] = 0;

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let minDist = Infinity;
    let current = '';
    for (const pos of unvisited) {
      if (distances[pos] < minDist) {
        minDist = distances[pos];
        current = pos;
      }
    }

    if (minDist === Infinity) break;

    const [row, col] = current.split(',').map(Number);
    unvisited.delete(current);

    if (row === end.row && col === end.col) {
      await reconstructPath(grid, previous, end, setGrid);
      return;
    }

    // Mark as visited
    if (!(row === start.row && col === start.col) && 
        !(row === end.row && col === end.col)) {
      grid[row][col].isVisited = true;
      setGrid([...grid]);
      await sleep(50);
    }

    // Check neighbors
    const neighbors = [
      { row: row - 1, col }, // up
      { row: row + 1, col }, // down
      { row, col: col - 1 }, // left
      { row, col: col + 1 }, // right
    ];

    for (const neighbor of neighbors) {
      if (
        neighbor.row >= 0 &&
        neighbor.row < rows &&
        neighbor.col >= 0 &&
        neighbor.col < cols &&
        !grid[neighbor.row][neighbor.col].isWall
      ) {
        const pos = `${neighbor.row},${neighbor.col}`;
        if (unvisited.has(pos)) {
          const dist = distances[current] + 1;
          if (dist < distances[pos]) {
            distances[pos] = dist;
            previous[pos] = { row, col };
            
            if (!(neighbor.row === end.row && neighbor.col === end.col)) {
              grid[neighbor.row][neighbor.col].isConsidering = true;
              setGrid([...grid]);
              await sleep(50);
              grid[neighbor.row][neighbor.col].isConsidering = false;
            }
          }
        }
      }
    }
  }
}

async function reconstructPath(
  grid: Node[][],
  previous: { [key: string]: Position | null },
  end: Position,
  setGrid: (grid: Node[][]) => void
): Promise<void> {
  let current: Position | null = end;
  while (current !== null) {
    const pos = `${current.row},${current.col}`;
    current = previous[pos];
    if (current) {
      grid[current.row][current.col].isPath = true;
      setGrid([...grid]);
      await sleep(50);
    }
  }
}
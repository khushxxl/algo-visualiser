export type AlgorithmType = 'bubble' | 'quick' | 'merge' | 'dijkstra';

export interface ArrayBar {
  value: number;
  isComparing: boolean;
  isSorted: boolean;
  isSwapping: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface Node {
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isPath: boolean;
  isConsidering: boolean;
}

export interface AlgorithmInfo {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
}
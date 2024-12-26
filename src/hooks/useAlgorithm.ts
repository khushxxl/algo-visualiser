import { useState, useCallback } from 'react';
import { ArrayBar, AlgorithmType } from '../types/algorithms';
import { bubbleSort } from '../algorithms/bubbleSort';
import { quickSort } from '../algorithms/quickSort';
import { mergeSort } from '../algorithms/mergeSort';

export const useAlgorithm = (initialArray: number[]) => {
  const [array, setArray] = useState<ArrayBar[]>(
    initialArray.map(value => ({
      value,
      isComparing: false,
      isSorted: false,
      isSwapping: false,
    }))
  );
  const [isSorting, setIsSorting] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmType>('bubble');

  const resetArray = useCallback((newArray: number[]) => {
    setArray(
      newArray.map(value => ({
        value,
        isComparing: false,
        isSorted: false,
        isSwapping: false,
      }))
    );
  }, []);

  const sort = async () => {
    setIsSorting(true);
    const arr = [...array];

    switch (currentAlgorithm) {
      case 'bubble':
        await bubbleSort(arr, setArray);
        break;
      case 'quick':
        await quickSort(arr, 0, arr.length - 1, setArray);
        break;
      case 'merge':
        await mergeSort(arr, 0, arr.length - 1, setArray);
        break;
    }

    setIsSorting(false);
  };

  return {
    array,
    isSorting,
    currentAlgorithm,
    setCurrentAlgorithm,
    resetArray,
    sort,
  };
};
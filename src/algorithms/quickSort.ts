import { ArrayBar } from '../types/algorithms';
import { sleep, swap } from '../utils/arrayUtils';

async function partition(
  arr: ArrayBar[],
  low: number,
  high: number,
  setArray: (arr: ArrayBar[]) => void
): Promise<number> {
  const pivot = arr[high].value;
  let i = low - 1;

  for (let j = low; j < high; j++) {
    arr[j].isComparing = true;
    arr[high].isComparing = true;
    setArray([...arr]);
    await sleep(100);

    if (arr[j].value < pivot) {
      i++;
      if (i < arr.length) {
        arr[i].isSwapping = true;
      }
      arr[j].isSwapping = true;
      setArray([...arr]);
      await sleep(100);
      swap(arr, i, j);
    }

    arr[j].isComparing = false;
    arr[high].isComparing = false;
    if (i >= 0 && i < arr.length) {
      arr[i].isSwapping = false;
    }
    arr[j].isSwapping = false;
    setArray([...arr]);
  }

  arr[i + 1].isSwapping = true;
  arr[high].isSwapping = true;
  setArray([...arr]);
  await sleep(100);
  swap(arr, i + 1, high);
  arr[i + 1].isSwapping = false;
  arr[high].isSwapping = false;
  arr[i + 1].isSorted = true;
  setArray([...arr]);

  return i + 1;
}

export async function quickSort(
  arr: ArrayBar[],
  low: number,
  high: number,
  setArray: (arr: ArrayBar[]) => void
) {
  if (low < high) {
    const pi = await partition(arr, low, high, setArray);
    await quickSort(arr, low, pi - 1, setArray);
    await quickSort(arr, pi + 1, high, setArray);
  }
  if (low === 0 && high === arr.length - 1) {
    arr.forEach(item => (item.isSorted = true));
    setArray([...arr]);
  }
}
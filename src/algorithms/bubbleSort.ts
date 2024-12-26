import { ArrayBar } from '../types/algorithms';
import { sleep, swap } from '../utils/arrayUtils';

export async function bubbleSort(
  arr: ArrayBar[],
  setArray: (arr: ArrayBar[]) => void
) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      arr[j].isComparing = true;
      arr[j + 1].isComparing = true;
      setArray([...arr]);
      await sleep(100);

      if (arr[j].value > arr[j + 1].value) {
        arr[j].isSwapping = true;
        arr[j + 1].isSwapping = true;
        setArray([...arr]);
        await sleep(100);
        swap(arr, j, j + 1);
      }

      arr[j].isComparing = false;
      arr[j + 1].isComparing = false;
      arr[j].isSwapping = false;
      arr[j + 1].isSwapping = false;
      setArray([...arr]);
    }
    arr[n - i - 1].isSorted = true;
  }
  arr[0].isSorted = true;
  setArray([...arr]);
}
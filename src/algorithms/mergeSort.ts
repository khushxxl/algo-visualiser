import { ArrayBar } from '../types/algorithms';
import { sleep } from '../utils/arrayUtils';

async function merge(
  arr: ArrayBar[],
  left: number,
  middle: number,
  right: number,
  setArray: (arr: ArrayBar[]) => void
) {
  const n1 = middle - left + 1;
  const n2 = right - middle;
  const L = arr.slice(left, middle + 1);
  const R = arr.slice(middle + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < n1 && j < n2) {
    arr[k].isComparing = true;
    setArray([...arr]);
    await sleep(100);

    if (L[i].value <= R[j].value) {
      arr[k] = { ...L[i], isSwapping: true };
      i++;
    } else {
      arr[k] = { ...R[j], isSwapping: true };
      j++;
    }
    setArray([...arr]);
    await sleep(100);
    arr[k].isComparing = false;
    arr[k].isSwapping = false;
    k++;
  }

  while (i < n1) {
    arr[k] = { ...L[i], isSwapping: true };
    setArray([...arr]);
    await sleep(100);
    arr[k].isSwapping = false;
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = { ...R[j], isSwapping: true };
    setArray([...arr]);
    await sleep(100);
    arr[k].isSwapping = false;
    j++;
    k++;
  }

  for (let m = left; m <= right; m++) {
    arr[m].isSorted = true;
  }
  setArray([...arr]);
}

export async function mergeSort(
  arr: ArrayBar[],
  left: number,
  right: number,
  setArray: (arr: ArrayBar[]) => void
) {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);
    await mergeSort(arr, left, middle, setArray);
    await mergeSort(arr, middle + 1, right, setArray);
    await merge(arr, left, middle, right, setArray);
  }
}
import { NUMBERS_RANGE, SPEED_RANGE } from "./DefaultValues";

const randomInt = (max: number, min: number) =>
  Math.round(Math.random() * (max - min)) + min;

const swap = (array: number[], i: number, j: number) => {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

export const sleep = (milliSeconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliSeconds));

const calculateDelay = (array: number[], sortingSpeed: number) => {
  const SPEED_FACTOR = 500 / array.length;
  return (SPEED_RANGE.MAX / sortingSpeed) * SPEED_FACTOR;
};

export const randomizeArray = (size: number) => {
  let randomArray = [];

  for (let i = 0; i < size; i++) {
    let randNum = randomInt(NUMBERS_RANGE.MIN, NUMBERS_RANGE.MAX);
    randomArray.push(randNum);
  }

  return randomArray;
};

export const insertionSort = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void
) => {
  let delay = calculateDelay(array, sortingSpeed);
  let i, j, key;

  for (i = 1; i < array.length; i++) {
    key = array[i];
    j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      setSwappedBars({ left: j, right: j + 1 });
      await sleep(delay);
      j--;
    }
    array[j + 1] = key;
  }
};

export const bubbleSort = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void
) => {
  let swapped;
  let delay = calculateDelay(array, sortingSpeed);

  for (let i = 0; i < array.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        setSwappedBars({ left: j, right: j + 1 });
        swapped = true;
        await sleep(delay);
      }
    }

    if (!swapped) break;
  }
};

export const heapSort = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void
) => {
  let size = array.length;
  let delay = calculateDelay(array, sortingSpeed);

  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    await heapify(array, sortingSpeed, setSwappedBars, i, size);
  }

  for (let i = size - 1; i > 0; i--) {
    swap(array, 0, i);
    setSwappedBars({ left: 0, right: i });
    await sleep(delay);
    await heapify(array, sortingSpeed, setSwappedBars, 0, i);
  }
};

const heapify = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void,
  rootIndex: number,
  size: number
) => {
  let largestElementIndex = rootIndex;
  let leftChildIndex = 2 * rootIndex + 1;
  let rightChildIndex = 2 * rootIndex + 2;
  let delay = calculateDelay(array, sortingSpeed);

  if (
    leftChildIndex < size &&
    array[leftChildIndex] > array[largestElementIndex]
  ) {
    largestElementIndex = leftChildIndex;
  }

  if (
    rightChildIndex < size &&
    array[rightChildIndex] > array[largestElementIndex]
  ) {
    largestElementIndex = rightChildIndex;
  }

  if (largestElementIndex !== rootIndex) {
    swap(array, rootIndex, largestElementIndex);
    setSwappedBars({ left: rootIndex, right: largestElementIndex });
    await sleep(delay);
    await heapify(
      array,
      sortingSpeed,
      setSwappedBars,
      largestElementIndex,
      size
    );
  }
};

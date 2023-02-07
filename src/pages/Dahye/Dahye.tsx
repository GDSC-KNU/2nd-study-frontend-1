import { useState, useEffect, useCallback } from "react";
import Controls from "./components/Controls";
import Header from "./components/Header";
import SortingGraph from "./components/Graph";
import { DEFAULT_ARRAY, SORT } from "./DefaultValues";
import {
  bubbleSort,
  heapSort,
  insertionSort,
  randomizeArray,
} from "./Algorithms";

function Dahye() {
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [arraySize, setArraySize] = useState(10);
  const [sortingSpeed, setSortingSpeed] = useState(50);
  const [sortBy, setSortBy] = useState(SORT.INSERTION_SORT);
  const [maxValue, setMaxValue] = useState(Number.MIN_VALUE);
  const [swappedBars, setSwappedBars] = useState({});
  const [isSorting, setIsSorting] = useState(false);

  const createRandomArray = useCallback(() => {
    let maxValue = Number.MIN_VALUE;
    const randomArray = randomizeArray(arraySize);

    for (const randNum of randomArray) {
      maxValue = Math.max(maxValue, randNum);
    }

    setMaxValue(maxValue);
    setArray(randomArray);
  }, [arraySize]);

  const sortHandler = async () => {
    setIsSorting(true);
    switch (sortBy) {
      case SORT.INSERTION_SORT:
        await insertionSort(array, sortingSpeed, setSwappedBars);
        break;
      case SORT.BUBBLE_SORT:
        await bubbleSort(array, sortingSpeed, setSwappedBars);
        break;
      case SORT.HEAP_SORT:
        await heapSort(array, sortingSpeed, setSwappedBars);
        break;
    }
    setIsSorting(false);
  };

  useEffect(() => {
    createRandomArray();
  }, [arraySize, createRandomArray]);

  return (
    <div className="mx-auto max-w-4xl px-2">
      <Header />
      <Controls
        sortBy={sortBy}
        isSorting={isSorting}
        onSort={sortHandler}
        arraySize={arraySize}
        sortingSpeed={sortingSpeed}
        arrayRandomizeHandler={createRandomArray}
        onDropdownChange={(sortBy) => setSortBy(sortBy)}
        onSizeChange={(size) => setArraySize(size)}
        onSpeedChange={(speed) => setSortingSpeed(speed)}
      />
      <SortingGraph
        maxValue={maxValue}
        array={array}
        arraySize={arraySize}
        swappedBars={swappedBars}
        isSorting={isSorting}
      />
    </div>
  );
}

export default Dahye;

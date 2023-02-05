import {
  BlockInterface,
  BlockStatusType,
  BoardInterface,
  deepCopy2DArray,
  didReach,
  directions,
  directionsType,
  getEnd,
  isValidBlock,
  nextPoint,
  setActive,
  setVisited,
} from "./board";

export function BFS(prev: BoardInterface): BoardInterface {
  return getQueue(prev).reduce(
    getNextBatchOfBlocksToVisit,
    initialBoardWithEmptyDeque(prev)
  );
}

const getNextBatchOfBlocksToVisit = (
  previousContext: BoardInterface,
  currentPoint: BlockInterface
): {
  deque: BlockInterface[];
  rows: number;
  columns: number;
  maze: BlockStatusType[][];
} => {
  setVisited(currentPoint, previousContext);

  if (didReach(currentPoint, getEnd(previousContext)))
    return { ...previousContext, deque: [] };

  return {
    ...previousContext,
    deque: [
      ...previousContext.deque,
      ...getNextBlocksToVisit(
        possibleDirections(currentPoint, previousContext),
        currentPoint,
        previousContext
      ),
    ],
  };
};

function initialBoardWithEmptyDeque(prev: BoardInterface): BoardInterface {
  return {
    columns: prev.columns,
    rows: prev.rows,
    maze: deepCopy2DArray(prev.maze),
    deque: [],
  };
}

function getNextBlocksToVisit(
  possibleDirections: directionsType[],
  currentPoint: BlockInterface,
  previousContext: BoardInterface
) {
  return possibleDirections.reduce(
    (accQueue: BlockInterface[], direction: directionsType) => {
      return visitNextPoint(
        accQueue,
        nextPoint(currentPoint, direction),
        previousContext
      );
    },
    []
  );
}

function visitNextPoint(
  accQueue: BlockInterface[],
  nextPoint: BlockInterface,
  previousContext: BoardInterface
) {
  setActive(nextPoint, previousContext);
  accQueue.push(nextPoint);
  return accQueue;
}

function possibleDirections(
  currentPoint: BlockInterface,
  board: BoardInterface
) {
  return directions.filter((direction) =>
    isValidBlock(nextPoint(currentPoint, direction), board)
  );
}

function getQueue(prev: BoardInterface) {
  return [...prev.deque];
}

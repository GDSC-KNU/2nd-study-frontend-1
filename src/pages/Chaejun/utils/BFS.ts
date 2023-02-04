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
  setVisited(previousContext, currentPoint);

  if (didReach(currentPoint, getEnd(previousContext)))
    return { ...previousContext, deque: [] };

  return {
    ...previousContext,
    deque: [
      ...previousContext.deque,
      ...getNextBlocksToVisit(currentPoint, previousContext),
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

function getQueue(prev: BoardInterface) {
  return [...prev.deque];
}

function getNextBlocksToVisit(
  currentPoint: BlockInterface,
  previousContext: BoardInterface
) {
  return possibleDirections(currentPoint, previousContext).reduce(
    (accQueue: BlockInterface[], direction: directionsType) => {
      setActive(previousContext, currentPoint, direction);
      accQueue.push(nextPoint(currentPoint, direction));
      return accQueue;
    },
    []
  );
}
export function possibleDirections(
  currentPoint: BlockInterface,
  board: BoardInterface
) {
  return directions.filter((direction) =>
    isValidBlock(currentPoint, direction, board)
  );
}

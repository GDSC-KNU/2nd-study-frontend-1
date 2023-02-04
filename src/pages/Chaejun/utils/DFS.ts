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

function currentPointInDFS(stack: BlockInterface[]) {
  return stack.at(-1);
}

export function DFS(prev: BoardInterface): BoardInterface {
  const newBoard = deepCopyBoard(prev);
  return {
    ...newBoard,
    deque: getNextPathHistory(newBoard, prev),
  };
}

function deepCopyBoard(prev: BoardInterface): BoardInterface {
  return {
    rows: prev.rows,
    columns: prev.columns,
    maze: deepCopy2DArray(prev.maze),
    deque: [...prev.deque],
  };
}

function getNextPathHistory(
  newBoard: BoardInterface,
  previousContext: BoardInterface
): BlockInterface[] {
  return reachedEnd(
    currentPointInDFS(getStack(newBoard)),
    newBoard,
    previousContext
  );
}

function reachedEnd(
  currentPoint: BlockInterface | undefined,
  newBoard: BoardInterface,
  previousContext: BoardInterface
) {
  if (currentPoint === undefined) return [];

  setVisited(newBoard, currentPoint);

  if (didReach(currentPoint, getEnd(newBoard)))
    return getStack(previousContext);

  return pushNextDirectionOrBacktrack(
    currentPoint,
    getNextDirection(currentPoint, previousContext),
    newBoard,
    previousContext
  );
}

function pushNextDirectionOrBacktrack(
  currentPoint: BlockInterface,
  nextDirection: directionsType | null,
  newBoard: BoardInterface,
  previousContext: BoardInterface
) {
  if (!nextDirection) return backtrack(newBoard, previousContext);

  setActive(newBoard, currentPoint, nextDirection);

  return pushNextDirection(newBoard, nextDirection);
}

function pushNextDirection(
  newBoard: BoardInterface,
  nextDirection: directionsType
) {
  return [
    ...getStack(newBoard),
    nextPoint(currentPointInDFS(getStack(newBoard))!, nextDirection),
  ];
}

function backtrack(newBoard: BoardInterface, previousContext: BoardInterface) {
  getStack(newBoard).pop();
  return getNextPathHistory(newBoard, previousContext);
}

function getNextDirection(currentPoint: BlockInterface, prev: BoardInterface) {
  return (
    directions.find((direction) =>
      isValidBlock(currentPoint, direction, prev)
    ) ?? null
  );
}

function getStack(newBoard: {
  rows: number;
  columns: number;
  maze: BlockStatusType[][];
  deque: BlockInterface[];
}) {
  return newBoard.deque;
}

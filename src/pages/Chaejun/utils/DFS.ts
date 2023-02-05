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
    deque: getNextPathHistory(
      currentPointInDFS(getStack(newBoard)),
      newBoard,
      prev
    ),
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
): BlockInterface[] {
  if (!nextDirection) return backtrack(newBoard, previousContext);

  return pushNextDirection(newBoard, nextPoint(currentPoint, nextDirection));
}

function pushNextDirection(
  newBoard: BoardInterface,
  nextPoint: BlockInterface
): BlockInterface[] {
  setActive(newBoard, nextPoint);
  return [...getStack(newBoard), nextPoint];
}

function backtrack(
  newBoard: BoardInterface,
  previousContext: BoardInterface
): BlockInterface[] {
  getStack(newBoard).pop();
  return getNextPathHistory(
    currentPointInDFS(getStack(newBoard)),
    newBoard,
    previousContext
  );
}

function getNextDirection(currentPoint: BlockInterface, prev: BoardInterface) {
  return (
    directions.find((direction) =>
      isValidBlock(nextPoint(currentPoint, direction), prev)
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

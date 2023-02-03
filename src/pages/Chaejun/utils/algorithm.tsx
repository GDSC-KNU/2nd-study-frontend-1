import {
  BlockInterface,
  BlockStatusType,
  BoardInterface,
  deepCopy2DArray,
  didReach,
  directions,
  directionsType,
  getEnd,
  getX,
  getY,
  isValidBlock,
  nextPoint,
} from "./board";
function currentPointInDFS(stack: BlockInterface[]) {
  // top while loop checks the length of stack
  // so it is safe to use stack.at(-1)
  return stack.at(-1)!;
}

export function DFS(prev: BoardInterface): BoardInterface {
  const stack: BlockInterface[] = [...prev.deque];
  const newBoard = {
    rows: prev.rows,
    columns: prev.columns,
    maze: deepCopy2DArray(prev.maze),
    deque: [...prev.deque],
  };

  while (stack.length) {
    setCurrentPointVisited(newBoard, currentPointInDFS(stack));
    if (didReach(currentPointInDFS(stack), getEnd(newBoard)))
      return { ...newBoard, maze: newBoard.maze };

    const direction = directions.find((direction) =>
      isValidBlock(currentPointInDFS(stack), direction, newBoard)
    );

    if (direction === undefined) {
      stack.pop();
      continue;
    }

    setCurrentPointActive(newBoard, currentPointInDFS(stack), direction);

    return {
      ...newBoard,
      deque: [...stack, nextPoint(currentPointInDFS(stack), direction)],
    };
  }
  return { ...prev, maze: newBoard.maze, deque: stack };
}

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
  setCurrentPointVisited(previousContext, currentPoint);

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
      setCurrentPointActive(previousContext, currentPoint, direction);
      accQueue.push(nextPoint(currentPoint, direction));
      return accQueue;
    },
    []
  );
}

function setCurrentPointActive(
  context: BoardInterface,
  currentPoint: BlockInterface,
  direction: directionsType
) {
  context.maze[getY(nextPoint(currentPoint, direction))][
    getX(nextPoint(currentPoint, direction))
  ] = "ACTIVE";
}

function setCurrentPointVisited(
  context: BoardInterface,
  currentPoint: BlockInterface
) {
  context.maze[getY(currentPoint)][getX(currentPoint)] = "VISITED";
}

function possibleDirections(
  currentPoint: BlockInterface,
  board: BoardInterface
) {
  return directions.filter((direction) =>
    isValidBlock(currentPoint, direction, board)
  );
}

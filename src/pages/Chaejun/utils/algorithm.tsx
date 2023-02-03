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
  const newBoard: BoardInterface = {
    rows: prev.rows,
    columns: prev.columns,
    maze: deepCopy2DArray(prev.maze),
    deque: [...prev.deque],
  };

  return { ...newBoard, deque: getNextPathHistory(newBoard, prev) };
}

function getNextPathHistory(
  newBoard: BoardInterface,
  previousContext: BoardInterface
): BlockInterface[] {
  while (getStack(newBoard).length) {
    setCurrentPointVisited(newBoard, currentPointInDFS(getStack(newBoard)));
    if (didReach(currentPointInDFS(getStack(newBoard)), getEnd(newBoard)))
      return getStack(newBoard);

    if (
      !getNextDirection(currentPointInDFS(getStack(newBoard)), previousContext)
    ) {
      getStack(newBoard).pop();
      continue;
    }

    setCurrentPointActive(
      newBoard,
      currentPointInDFS(getStack(newBoard)),
      getNextDirection(currentPointInDFS(getStack(newBoard)), previousContext)!
    );

    return [
      ...getStack(newBoard),
      nextPoint(
        currentPointInDFS(getStack(newBoard)),
        getNextDirection(
          currentPointInDFS(getStack(newBoard)),
          previousContext
        )!
      ),
    ];
  }
  return [];
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

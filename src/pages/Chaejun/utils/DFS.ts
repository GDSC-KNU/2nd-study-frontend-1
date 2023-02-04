import {
  BlockInterface,
  BlockStatusType,
  BoardInterface,
  deepCopy2DArray,
  didReach,
  directions,
  getEnd,
  isValidBlock,
  nextPoint,
  setActive,
  setVisited,
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
    setVisited(newBoard, currentPointInDFS(getStack(newBoard)));
    if (didReach(currentPointInDFS(getStack(newBoard)), getEnd(newBoard)))
      return getStack(newBoard);

    if (
      !getNextDirection(currentPointInDFS(getStack(newBoard)), previousContext)
    ) {
      getStack(newBoard).pop();
      continue;
    }

    setActive(
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

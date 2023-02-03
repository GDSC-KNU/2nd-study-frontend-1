import {
  BlockInterface,
  BoardInterface,
  deepCopy2DArray,
  didReach,
  directions,
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
function currentPointInBFS(queue: BlockInterface[]) {
  // top while loop checks the length of queue
  // so it is safe to use queue.at(0)
  return queue.at(0)!;
}

export function DFS(prev: BoardInterface): BoardInterface {
  const stack: BlockInterface[] = [...prev.deque];
  const newBoard = deepCopy2DArray(prev.maze);

  while (stack.length) {
    newBoard[getY(currentPointInDFS(stack))][getX(currentPointInDFS(stack))] =
      "VISITED";
    if (didReach(currentPointInDFS(stack), getEnd(prev)))
      return { ...prev, maze: newBoard };

    for (const direction of directions) {
      if (!isValidBlock(currentPointInDFS(stack), direction, prev)) continue;

      newBoard[getY(nextPoint(currentPointInDFS(stack), direction))][
        getX(nextPoint(currentPointInDFS(stack), direction))
      ] = "ACTIVE";

      return {
        ...prev,
        maze: newBoard,
        deque: [...stack, nextPoint(currentPointInDFS(stack), direction)],
      };
    }
    stack.pop();
  }
  return { ...prev, maze: newBoard, deque: stack };
}

export function BFS(prev: BoardInterface): BoardInterface {
  return [...prev.deque].reduce(
    (accBoard: BoardInterface, currentPoint: BlockInterface) => {
      accBoard.maze[getY(currentPoint)][getX(currentPoint)] = "VISITED";

      if (didReach(currentPoint, getEnd(accBoard)))
        return { ...accBoard, deque: [] };

      return {
        ...accBoard,
        deque: [
          ...accBoard.deque,
          ...possibleDirections(currentPoint, accBoard).reduce(
            (accQueue: BlockInterface[], direction: directions) => {
              accBoard.maze[getY(nextPoint(currentPoint, direction))][
                getX(nextPoint(currentPoint, direction))
              ] = "ACTIVE";
              accQueue.push(nextPoint(currentPoint, direction));
              return accQueue;
            },
            []
          ),
        ],
      };
    },
    {
      columns: prev.columns,
      rows: prev.rows,
      maze: deepCopy2DArray(prev.maze),
      deque: [],
    }
  );
}

function possibleDirections(
  currentPoint: BlockInterface,
  board: BoardInterface
) {
  return directions.filter((direction) =>
    isValidBlock(currentPoint, direction, board)
  );
}

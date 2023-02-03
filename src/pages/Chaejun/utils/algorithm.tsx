import {
  BlockInterface,
  BoardInterface,
  deepCopy2DArray,
  didReach,
  getEnd,
  isValidBlock,
} from "./board";

const directions = [
  { dir: "DOWN", x: 0, y: 1 },
  { dir: "RIGHT", x: 1, y: 0 },
  { dir: "UP", x: 0, y: -1 },
  { dir: "LEFT", x: -1, y: 0 },
] as const;

function getY(currentPoint: BlockInterface): number {
  return currentPoint.y;
}
function getX(currentPoint: BlockInterface): number {
  return currentPoint.x;
}
function nextPoint(
  currentPoint: BlockInterface,
  option: typeof directions[number]
): BlockInterface {
  return {
    x: currentPoint.x + option.x,
    y: currentPoint.y + option.y,
  };
}
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
    if (didReach(currentPointInDFS(stack), getEnd(newBoard)))
      return { ...prev, maze: newBoard };

    for (const direction of directions) {
      if (
        !isValidBlock(
          nextPoint(currentPointInDFS(stack), direction),
          getEnd(newBoard),
          newBoard
        )
      )
        continue;

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
  const queue = [...prev.deque];
  const currentQueue: BlockInterface[] = [];
  const newBoard = deepCopy2DArray(prev.maze);

  while (queue.length) {
    newBoard[getY(currentPointInBFS(queue))][getX(currentPointInBFS(queue))] =
      "VISITED";
    if (didReach(currentPointInBFS(queue), getEnd(newBoard)))
      return { ...prev, maze: newBoard };

    for (const direction of directions) {
      if (
        !isValidBlock(
          nextPoint(currentPointInBFS(queue), direction),
          getEnd(newBoard),
          newBoard
        )
      )
        continue;

      newBoard[getY(nextPoint(currentPointInBFS(queue), direction))][
        getX(nextPoint(currentPointInBFS(queue), direction))
      ] = "ACTIVE";

      currentQueue.push(nextPoint(currentPointInBFS(queue), direction));
    }
    queue.shift();
  }
  return { ...prev, maze: newBoard, deque: [...currentQueue] };
}

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

export function DFS(prev: BoardInterface): BoardInterface {
  const stack: BlockInterface[] = [...prev.deque];
  const newBoard = deepCopy2DArray(prev.maze);

  while (stack.length) {
    const currentPoint = stack.at(-1)!;
    newBoard[getY(currentPoint)][getX(currentPoint)] = "VISITED";
    if (didReach(currentPoint, getEnd(newBoard)))
      return { ...prev, maze: newBoard };

    for (const direction of directions) {
      if (
        !isValidBlock(
          nextPoint(currentPoint, direction),
          getEnd(newBoard),
          newBoard
        )
      )
        continue;

      newBoard[getY(nextPoint(currentPoint, direction))][
        getX(nextPoint(currentPoint, direction))
      ] = "ACTIVE";

      return {
        ...prev,
        maze: newBoard,
        deque: [...stack, nextPoint(currentPoint, direction)],
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
    const currentPoint = queue.shift()!;
    newBoard[getY(currentPoint)][getX(currentPoint)] = "VISITED";
    if (didReach(currentPoint, getEnd(newBoard)))
      return { ...prev, maze: newBoard };

    for (const direction of directions) {
      if (
        !isValidBlock(
          nextPoint(currentPoint, direction),
          getEnd(newBoard),
          newBoard
        )
      )
        continue;

      newBoard[getY(nextPoint(currentPoint, direction))][
        getX(nextPoint(currentPoint, direction))
      ] = "ACTIVE";

      currentQueue.push(nextPoint(currentPoint, direction));
    }
  }
  return { ...prev, maze: newBoard, deque: [...currentQueue] };
}

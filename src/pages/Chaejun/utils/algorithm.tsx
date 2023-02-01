import {
  BlockInterface,
  BoardInterface,
  deepCopy2DArray,
  didReach,
  isValidBlock,
  outOfBoard,
} from "./board";

const directions = [
  { dir: "DOWN", x: 0, y: 1 },
  { dir: "RIGHT", x: 1, y: 0 },
  { dir: "UP", x: 0, y: -1 },
  { dir: "LEFT", x: -1, y: 0 },
] as const;

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
  const end: BlockInterface = {
    y: newBoard.length - 1,
    x: newBoard[0].length - 1,
  };

  while (stack.length) {
    const currentPoint = stack.at(-1)!;
    newBoard[currentPoint.y][currentPoint.x] = "VISITED";
    if (didReach(currentPoint, end)) return { ...prev, maze: newBoard };

    for (const option of directions) {
      if (!isValidBlock(nextPoint(currentPoint, option), end, newBoard))
        continue;

      newBoard[nextPoint(currentPoint, option).y][
        nextPoint(currentPoint, option).x
      ] = "ACTIVE";

      return {
        ...prev,
        maze: newBoard,
        deque: [...stack, nextPoint(currentPoint, option)],
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
  const end: BlockInterface = {
    x: newBoard.length - 1,
    y: newBoard[0].length - 1,
  };

  while (queue.length) {
    const currentPoint = queue.shift()!;
    newBoard[currentPoint.y][currentPoint.x] = "VISITED";
    if (didReach(currentPoint, end)) return { ...prev, maze: newBoard };

    for (const option of directions) {
      console.log();
      if (!isValidBlock(nextPoint(currentPoint, option), end, newBoard))
        continue;

      newBoard[nextPoint(currentPoint, option).y][
        nextPoint(currentPoint, option).x
      ] = "ACTIVE";
      currentQueue.push(nextPoint(currentPoint, option));
    }
  }
  return { ...prev, maze: newBoard, deque: [...currentQueue] };
}

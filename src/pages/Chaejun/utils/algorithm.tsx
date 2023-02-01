import {
  BlockInterface,
  BoardInterface,
  BlockStatusType,
  deepCopy2DArray,
  didReach,
  evaluateBlock,
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
  option:
    | { readonly dir: "DOWN"; readonly x: 0; readonly y: 1 }
    | { readonly dir: "RIGHT"; readonly x: 1; readonly y: 0 }
    | { readonly dir: "UP"; readonly x: 0; readonly y: -1 }
    | { readonly dir: "LEFT"; readonly x: -1; readonly y: 0 }
): BlockInterface {
  return {
    x: currentPoint.x + option.x,
    y: currentPoint.y + option.y,
  };
}

function isValidBlock(
  newBoard: BlockStatusType[][],
  nextPoint: BlockInterface
) {
  const { visited, blocked } = evaluateBlock(newBoard, nextPoint);
  return !visited && !blocked;
}

export function DFS(prev: BoardInterface): BoardInterface {
  const stack: BlockInterface[] = [...prev.deque];
  const newBoard = deepCopy2DArray(prev);
  const end = { y: newBoard.length - 1, x: newBoard[0].length - 1 };
  // console.log("stack", stack);

  while (stack.length) {
    const currentPoint = stack.at(-1)!;
    if (didReach(currentPoint, end)) return { ...prev, maze: newBoard };

    for (const option of directions) {
      if (outOfBoard(nextPoint(currentPoint, option), end)) continue;
      if (isValidBlock(newBoard, nextPoint(currentPoint, option))) {
        newBoard[currentPoint.y][currentPoint.x] = "VISITED";
        newBoard[lastPoint.y][lastPoint.x] = "VISITED";
        newBoard[nextPoint(currentPoint, option).y][
          nextPoint(currentPoint, option).x
        ] = "ACTIVE";
        return {
          ...prev,
          maze: newBoard,
          currentPoint: nextPoint(currentPoint, option),
          deque: [...stack, nextPoint(currentPoint, option)],
        };
      }
    }
    stack.pop();
  }
  return { ...prev, maze: newBoard };
}

export function BFS(prev: BoardInterface): BoardInterface {
  const queue = [...prev.deque];
  const newBoard = deepCopy2DArray(prev);
  const currentQueue: BlockInterface[] = [];
  const end = { x: newBoard.length - 1, y: newBoard[0].length - 1 };

  while (queue.length) {
    const currentPoint = queue.shift()!;
    if (didReach(currentPoint, end)) return { ...prev, maze: newBoard };
    newBoard[currentPoint.y][currentPoint.x] = "VISITED";
    for (const option of directions) {
      if (outOfBoard(nextPoint(currentPoint, option), end)) continue;
      if (isValidBlock(newBoard, nextPoint(currentPoint, option))) {
        newBoard[nextPoint(currentPoint, option).y][
          nextPoint(currentPoint, option).x
        ] = "ACTIVE";
        currentQueue.push(nextPoint(currentPoint, option));
      }
    }
  }
  return { ...prev, maze: newBoard, deque: [...currentQueue] };
}

import {
  BoardInterface,
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

export function DFS(prev: BoardInterface) {
  const stack = [...prev.deque];
  const newBoard = deepCopy2DArray(prev);
  const lastPoint = stack[stack.length - 1];
  const end = { y: newBoard.length - 1, x: newBoard[0].length - 1 };
  // console.log("stack", stack);

  while (stack.length) {
    const currentPoint = stack.at(-1)!;
    if (didReach(currentPoint, end)) return prev;

    for (const option of directions) {
      const nextPoint = {
        x: currentPoint.x + option.x,
        y: currentPoint.y + option.y,
      };
      if (outOfBoard(nextPoint, end)) continue;
      const { visited, blocked } = evaluateBlock(newBoard, nextPoint);
      if (!visited && !blocked) {
        newBoard[currentPoint.y][currentPoint.x] = "VISITED";
        newBoard[lastPoint.y][lastPoint.x] = "VISITED";
        newBoard[nextPoint.y][nextPoint.x] = "ACTIVE";
        return {
          ...prev,
          maze: newBoard,
          currentPoint: nextPoint,
          deque: [...stack, nextPoint],
        };
      }
    }
    stack.pop();
  }
  return prev;
}

export function BFS(prev: BoardInterface) {
  const queue = [...prev.deque];
  const newBoard = deepCopy2DArray(prev);
  const currentQueue = [];
  const end = { x: newBoard.length - 1, y: newBoard[0].length - 1 };

  while (queue.length) {
    const currentPoint = queue.shift()!;
    if (didReach(currentPoint, end)) return prev;

    newBoard[currentPoint.y][currentPoint.x] = "VISITED";
    for (const option of directions) {
      const nextPoint = {
        x: currentPoint.x + option.x,
        y: currentPoint.y + option.y,
      };
      if (outOfBoard(nextPoint, end)) continue;
      const { visited, blocked } = evaluateBlock(newBoard, nextPoint);
      if (!visited && !blocked) {
        newBoard[nextPoint.y][nextPoint.x] = "ACTIVE";
        currentQueue.push(nextPoint);
      }
    }
  }
  return { ...prev, maze: newBoard, deque: [...currentQueue] };
}

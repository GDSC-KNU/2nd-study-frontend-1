export type BlockStatusType = "EMPTY" | "VISITED" | "BLOCKED" | "ACTIVE";

export interface BlockInterface {
  x: number;
  y: number;
}
export interface BoardInterface {
  rows: number;
  columns: number;
  maze: BlockStatusType[][];
  deque: BlockInterface[];
}
export interface BoardContextInterface {
  board: BoardInterface;
  setBoard: React.Dispatch<React.SetStateAction<BoardInterface>>;
}

export function deepCopy2DArray(maze: BlockStatusType[][]) {
  return maze.map((row) => row.slice());
}
export function safeInput(e: React.ChangeEvent<HTMLInputElement>): number {
  return Math.max(Number.parseInt(e.target.value), 1);
}
export function create2DArray(rows: number, columns: number) {
  const newBoard = Array.from(Array(rows), () =>
    new Array(columns).fill("EMPTY")
  );
  newBoard[0][0] = "VISITED";
  return newBoard;
}
export function initializeBoard({
  setBoard,
  rows,
  columns,
}: {
  setBoard: React.Dispatch<React.SetStateAction<BoardInterface>>;
  rows?: number;
  columns?: number;
}) {
  setBoard((prev) => {
    const newRows = rows ?? prev.rows;
    const newColumns = columns ?? prev.columns;
    const newBoard = create2DArray(newRows, newColumns);
    return {
      ...prev,
      rows: newRows,
      columns: newColumns,
      maze: newBoard,
      deque: [{ x: 0, y: 0 }],
    };
  });
}
export function randomlyBlockOrEmpty() {
  const randomNumber = Math.random();
  if (randomNumber > 0.3) return "EMPTY";
  return "BLOCKED";
}
export function didReach(
  currentPoint: BlockInterface,
  destination: BlockInterface
) {
  return currentPoint.x === destination.x && currentPoint.y === destination.y;
}
export function isStartOrEnd(
  currentPoint: BlockInterface,
  start: { y: number; x: number },
  end: { y: number; x: number }
) {
  return didReach(currentPoint, start) || didReach(currentPoint, end);
}
export function outOfBoard(nextPoint: BlockInterface, end: BlockInterface) {
  return (
    nextPoint.x < 0 ||
    nextPoint.x > end.x ||
    nextPoint.y < 0 ||
    nextPoint.y > end.y
  );
}
export function evaluateBlock(
  newBoard: BlockStatusType[][],
  nextPoint: BlockInterface
) {
  const visited =
    newBoard[nextPoint.y][nextPoint.x] === "VISITED" ||
    newBoard[nextPoint.y][nextPoint.x] === "ACTIVE";
  const blocked = newBoard[nextPoint.y][nextPoint.x] === "BLOCKED";
  return { visited, blocked };
}

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
export const directions = [
  { dir: "DOWN", x: 0, y: 1 },
  { dir: "RIGHT", x: 1, y: 0 },
  { dir: "UP", x: 0, y: -1 },
  { dir: "LEFT", x: -1, y: 0 },
] as const;
export type directionsType = typeof directions[number];

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
function getRows(rows: number | undefined, prevRows: number) {
  return rows ?? prevRows;
}
function getColumns(columns: number | undefined, prevColumns: number) {
  return columns ?? prevColumns;
}
export function getEnd(newBoard: BoardInterface): BlockInterface {
  return {
    y: newBoard.rows - 1,
    x: newBoard.columns - 1,
  };
}
export function initializeBoard({
  prev: { rows: prevRows, columns: prevColumns },
  rows,
  columns,
}: {
  prev: BoardInterface;
  rows?: number;
  columns?: number;
}) {
  return {
    rows: getRows(rows, prevRows),
    columns: getColumns(columns, prevColumns),
    maze: create2DArray(
      getRows(rows, prevRows),
      getColumns(columns, prevColumns)
    ),
    deque: [{ x: 0, y: 0 }],
  };
}
export function randomlyBlockOrEmpty() {
  const randomNumber = Math.random();
  if (randomNumber > 0.3) {
    return "EMPTY";
  }
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
export function isVisited(block: BlockStatusType) {
  return block === "VISITED" || block === "ACTIVE";
}
export function isBlocked(block: BlockStatusType) {
  return block === "BLOCKED";
}
export function isValidBlock(nextPoint: BlockInterface, board: BoardInterface) {
  return (
    !outOfBoard(nextPoint, getEnd(board)) &&
    !isVisited(getBlock(nextPoint, board)) &&
    !isBlocked(getBlock(nextPoint, board))
  );
}
export function getBlock(
  currentPoint: BlockInterface,
  board: BoardInterface
): BlockStatusType {
  return board.maze[getY(currentPoint)][getX(currentPoint)];
}
export function getY(currentPoint: BlockInterface): number {
  return currentPoint.y;
}
export function getX(currentPoint: BlockInterface): number {
  return currentPoint.x;
}
export function nextPoint(
  currentPoint: BlockInterface,
  option: directionsType
): BlockInterface {
  return {
    x: currentPoint.x + option.x,
    y: currentPoint.y + option.y,
  };
}
export function setActive(nextPoint: BlockInterface, context: BoardInterface) {
  context.maze[getY(nextPoint)][getX(nextPoint)] = "ACTIVE";
}
export function setVisited(
  currentPoint: BlockInterface,
  context: BoardInterface
) {
  context.maze[getY(currentPoint)][getX(currentPoint)] = "VISITED";
}

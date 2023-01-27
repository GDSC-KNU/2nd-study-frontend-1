import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import MainLayout from "../layouts/MainLayout";

type TBlockStatus = "EMPTY" | "VISITED" | "BLOCKED" | "ACTIVE";

interface IPoint {
  x: number;
  y: number;
}
interface IBoard {
  rows: number;
  columns: number;
  maze: TBlockStatus[][];
  currentPoint: IPoint;
  deque: IPoint[];
}

interface IBoardContext {
  board: IBoard;
  setBoard: React.Dispatch<React.SetStateAction<IBoard>>;
}

const blockStyle = {
  EMPTY: "bg-white",
  VISITED: "bg-gray-400",
  BLOCKED: "bg-black text-white",
  ACTIVE: "bg-yellow-400",
} as const;

const toggleState = {
  EMPTY: "BLOCKED",
  BLOCKED: "EMPTY",
  VISITED: "ACTIVE",
  ACTIVE: "VISITED",
} as const;

const BoardContext = createContext<IBoardContext | null>(null);

function deepCopy2DArray(prev: IBoard) {
  return prev.maze.map((row) => row.slice());
}

function safeInput(e: React.ChangeEvent<HTMLInputElement>): number {
  return Math.max(Number.parseInt(e.target.value), 1);
}

function create2DArray(rows: number, columns: number) {
  const newBoard = Array.from(Array(rows), () =>
    new Array(columns).fill("EMPTY")
  );
  newBoard[0][0] = "VISITED";
  return newBoard;
}

function initializeBoard(
  setBoard: React.Dispatch<React.SetStateAction<IBoard>>,
  rows: number,
  columns: number
) {
  setBoard((prev) => {
    const newBoard = create2DArray(rows, columns);
    return { ...prev, rows, columns, maze: newBoard, deque: [{ x: 0, y: 0 }] };
  });
}

function randomlyBlockOrEmpty() {
  const randomNumber = Math.random();
  if (randomNumber > 0.3) return "EMPTY";
  return "BLOCKED";
}

function didReach(currentPoint: IPoint, destination: IPoint) {
  return currentPoint.x === destination.x && currentPoint.y === destination.y;
}

function outOfBoard(nextPoint: IPoint, end: IPoint) {
  return (
    nextPoint.x < 0 ||
    nextPoint.x > end.x ||
    nextPoint.y < 0 ||
    nextPoint.y > end.y
  );
}

function NumberInput({
  props,
  onChange,
}: {
  props: {
    label: "columns" | "rows";
    board: IBoard;
    setBoard: React.Dispatch<React.SetStateAction<IBoard>>;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): ReactElement {
  return (
    <div className="grow">
      <label className="block">{props.label}</label>
      <input
        className="w-full rounded-md border-2 border-black py-2 px-3"
        type="number"
        onChange={onChange}
        value={props.board[props.label]}
        min="0"
      />
    </div>
  );
}

function Table(): ReactElement {
  const { board, setBoard } = { ...useContext(BoardContext) } as IBoardContext;

  return (
    <table className="mx-auto border-collapse">
      <tbody>
        {board.maze.map((row, rowId) => (
          <TableRow props={{ rowId, row }} />
        ))}
      </tbody>
    </table>
  );

  function TableRow({
    props: { rowId, row },
  }: {
    props: { rowId: number; row: TBlockStatus[] };
  }): ReactElement {
    return (
      <tr key={rowId}>
        {row.map((block, blockId) => {
          const start = { y: 0, x: 0 };
          const end = { y: board.rows - 1, x: board.columns - 1 };
          const currentPoint = { y: rowId, x: blockId };
          const isStartOrEnd =
            didReach(currentPoint, start) || didReach(currentPoint, end);
          const blockClassName = `border-2 border-black ${blockStyle[block]} ${
            isStartOrEnd ? "bg-blue-400" : ""
          }`;
          return (
            <TableCell
              props={{ blockClassName, rowId, blockId, isStartOrEnd, block }}
            />
          );
        })}
      </tr>
    );
  }

  function TableCell({
    props: { blockClassName, rowId, blockId, isStartOrEnd, block },
  }: {
    props: {
      blockClassName: string;
      rowId: number;
      blockId: number;
      isStartOrEnd: boolean;
      block: TBlockStatus;
    };
  }): ReactElement {
    const onClickHandler = () => {
      setBoard((prev) => {
        if (isStartOrEnd) return prev;
        const newBoard = deepCopy2DArray(prev);
        newBoard[rowId][blockId] = toggleState[block];
        return { ...prev, maze: newBoard };
      });
    };
    return (
      <td
        className={blockClassName}
        key={"" + rowId + blockId}
        onClick={onClickHandler}
      >
        <div className="aspect-square w-8"></div>
      </td>
    );
  }
}

function SetMazeButton() {
  const { board, setBoard } = { ...useContext(BoardContext) } as IBoardContext;
  return (
    <button
      type="button"
      className="grow rounded-md border-2 border-black bg-black py-2 px-3 text-white"
      onClick={() => setBoard(setMazeFn)}
    >
      Set Maze
    </button>
  );

  function setMazeFn(prev: IBoard) {
    const newBoard = deepCopy2DArray(prev);
    const rows = newBoard.length;
    const columns = newBoard[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const currentPoint = { y: i, x: j };
        const start = { y: 0, x: 0 };
        const end = { y: rows - 1, x: columns - 1 };
        const isStartOrEnd =
          didReach(currentPoint, start) || didReach(currentPoint, end);
        if (isStartOrEnd) continue;
        else newBoard[i][j] = randomlyBlockOrEmpty();
      }
    }
    return { ...prev, maze: newBoard };
  }
}

function ResetButton() {
  const { board, setBoard } = { ...useContext(BoardContext) } as IBoardContext;
  return (
    <button
      type="button"
      className="grow rounded-md border-2 border-black"
      onClick={() => initializeBoard(setBoard, board.rows, board.columns)}
    >
      Reset
    </button>
  );
}

const directions = [
  { dir: "DOWN", x: 0, y: 1 },
  { dir: "RIGHT", x: 1, y: 0 },
  { dir: "UP", x: 0, y: -1 },
  { dir: "LEFT", x: -1, y: 0 },
] as const;

function DFS(prev: IBoard) {
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

function BFS(prev: IBoard) {
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

function evaluateBlock(newBoard: TBlockStatus[][], nextPoint: IPoint) {
  const visited =
    newBoard[nextPoint.y][nextPoint.x] === "VISITED" ||
    newBoard[nextPoint.y][nextPoint.x] === "ACTIVE";
  const blocked = newBoard[nextPoint.y][nextPoint.x] === "BLOCKED";
  return { visited, blocked };
}

function useAlgorithm(callbackFn: (prev: IBoard) => IBoard) {
  const { board, setBoard } = { ...useContext(BoardContext) } as IBoardContext;
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (start) {
      const timer = setInterval(() => {
        setBoard(callbackFn);
      }, 500);
      return () => clearInterval(timer);
    }
  }, [start]);

  useEffect(() => {
    const endStatus = board.maze[board.rows - 1][board.columns - 1];
    if (endStatus === "ACTIVE") {
      setStart(false);
    }
  }, [board.maze]);

  return { start, setStart };
}

function AlgoButton({
  callbackFn,
  label,
}: {
  callbackFn: (prev: IBoard) => IBoard;
  label: string;
}) {
  const { start, setStart } = useAlgorithm(callbackFn);

  const buttonStyle = `grow rounded-md border-2 border-black py-2 px-3 text-white ${
    start ? "bg-yellow-400 text-black" : "bg-gray-600"
  }`;
  const onClickHandler = () => {
    setStart((prev) => !prev);
  };

  return (
    <button type="button" className={buttonStyle} onClick={onClickHandler}>
      {label}
    </button>
  );
}

const Chaejun = () => {
  const [board, setBoard] = useState<IBoard>({
    rows: 10,
    columns: 10,
    maze: create2DArray(10, 10),
    currentPoint: { x: 0, y: 0 },
    deque: [{ x: 0, y: 0 }],
  });

  function onChangeHandler() {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      initializeBoard(setBoard, board.rows, safeInput(e));
    };
  }

  return (
    <MainLayout>
      <BoardContext.Provider value={{ board, setBoard }}>
        <h1 className="text-4xl font-bold">DFS/BFS</h1>
        <form className="flex flex-col gap-2 py-4">
          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              props={{ label: "columns", board, setBoard }}
              onChange={onChangeHandler}
            />
            <NumberInput
              props={{ label: "rows", board, setBoard }}
              onChange={onChangeHandler}
            />
            <ResetButton />
            <SetMazeButton />
            <AlgoButton callbackFn={DFS} label={"DFS"} />
            <AlgoButton callbackFn={BFS} label={"BFS"} />
          </div>
        </form>
        <h2 className="text-2xl font-bold">Board</h2>
        <div className="block rounded-md border-2 border-black p-3">
          <Table />
        </div>
      </BoardContext.Provider>
    </MainLayout>
  );
};

export default Chaejun;

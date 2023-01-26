import { createContext, ReactElement, useContext, useState } from "react";
import MainLayout from "../layouts/MainLayout";

type TBlockStatus = "EMPTY" | "VISITED" | "BLOCKED" | "ACTIVE";

interface IBoard {
  rows: number;
  columns: number;
  maze: TBlockStatus[][];
  currentPoint: { x: number; y: number };
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

interface IBoardContext {
  board: IBoard;
  setBoard: React.Dispatch<React.SetStateAction<IBoard>>;
}
const BoardContext = createContext<IBoardContext | null>(null);

const Chaejun = () => {
  const [board, setBoard] = useState<IBoard>({
    rows: 5,
    columns: 5,
    maze: [
      ["VISITED", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
      ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
      ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
      ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
      ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
    ],
    currentPoint: { x: 0, y: 0 },
  });

  return (
    <MainLayout>
      <BoardContext.Provider value={{ board, setBoard }}>
        <h1 className="text-4xl font-bold">DFS/BFS</h1>
        <form
          className="flex flex-col gap-2 py-4"
          // onSubmit={(e) => {
          //   e.preventDefault();
          // }}
        >
          <div className="flex flex-row gap-2">
            <NumberInput
              props={{ label: "columns", board, setBoard }}
              onChange={(e) => {
                initializeBoard(setBoard, board.rows, safeInput(e));
              }}
            />
            <div className="grow">
              <NumberInput
                props={{ label: "rows", board, setBoard }}
                onChange={(e) => {
                  initializeBoard(setBoard, safeInput(e), board.columns);
                }}
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <button
              type="button"
              className="grow rounded-md border-2 border-black bg-black py-2 px-3 text-white"
              onClick={() => {
                setBoard((prev) => {
                  const possiblyBlocked = () => {
                    const randomNumber = Math.random();
                    if (randomNumber > 0.3) return "EMPTY";
                    return "BLOCKED";
                  };
                  const newBoard = deepCopy2DArray(prev);
                  const rows = newBoard.length;
                  const columns = newBoard[0].length;
                  for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < columns; j++) {
                      if (
                        (i == 0 && j == 0) ||
                        (i == 0 && j == 1) ||
                        (i == 1 && j == 0) ||
                        (i == rows - 1 && j == columns - 1)
                      )
                        newBoard[i][j] = "EMPTY";
                      else newBoard[i][j] = possiblyBlocked();
                    }
                  }
                  return { ...prev, maze: newBoard };
                });
              }}
            >
              Set Maze
            </button>
            <button
              className="grow rounded-md border-2 border-black bg-black py-2 px-3 text-white"
              onClick={() => randomDFS({ board, setBoard })}
            >
              DFS
            </button>
            <button className="grow rounded-md border-2 border-black bg-black py-2 px-3 text-white">
              BFS
            </button>
          </div>
        </form>
        <h2 className="text-2xl font-bold">Board</h2>
        <div className="block rounded-md border-2 border-black p-3">
          <div
            className="divide-x-2 divide-y-2 divide-black"
            style={{
              gridTemplateColumns: `repeat(${board.columns}, 1fr)`,
              display: "grid",
            }}
          ></div>
          <Table />
        </div>
      </BoardContext.Provider>
    </MainLayout>
  );
};

function deepCopy2DArray(prev: IBoard) {
  return prev.maze.map((row) => row.slice());
}

function safeInput(e: React.ChangeEvent<HTMLInputElement>): number {
  return Math.max(Number.parseInt(e.target.value), 1);
}

function NumberInput({
  props,
  onChange,
}: {
  props: {
    label: string;
    board: IBoard;
    setBoard: React.Dispatch<React.SetStateAction<IBoard>>;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): ReactElement {
  return (
    <div className="grow">
      <label className="block">label</label>
      <input
        className="w-full rounded-md border-2 border-black py-2 px-3"
        type="number"
        onChange={onChange}
        value={props.board.columns}
        min="0"
      />
    </div>
  );
}

function initializeBoard(
  setBoard: React.Dispatch<React.SetStateAction<IBoard>>,
  rows: number,
  columns: number
) {
  setBoard((prev) => {
    const newBoard = create2DArray(rows, columns);
    newBoard[0][0] = "VISITED";
    return { ...prev, rows, columns, maze: newBoard };
  });
}

function create2DArray(rows: number, columns: number) {
  return Array.from(Array(rows), () => new Array(columns).fill("EMPTY"));
}

function Table(): ReactElement {
  const context = useContext(BoardContext);
  const { board, setBoard } = { ...context } as IBoardContext;
  return (
    <table className="mx-auto border-collapse">
      <tbody>
        {board.maze.map((row, rowId) => {
          return (
            <tr key={rowId}>
              {row.map((block, blockId) => {
                const propsKey = "" + rowId + blockId;
                const isStart = rowId === 0 && blockId === 0;
                const isEnd =
                  rowId === board.rows - 1 && blockId === board.columns - 1;
                return (
                  <td
                    className={`border-2 border-black
                                      ${blockStyle[block]}
                                      ${(isStart || isEnd) && "bg-blue-400"}`}
                    key={propsKey}
                    onClick={() => {
                      if (isStart || isEnd) return;
                      setBoard((prev) => {
                        const newBoard = deepCopy2DArray(prev);
                        newBoard[rowId][blockId] = toggleState[
                          block
                        ] as TBlockStatus;
                        return { ...prev, maze: newBoard };
                      });
                    }}
                  >
                    <div className="aspect-square w-20">{block}</div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const directions = [
  { dir: "UP", x: 0, y: -1 },
  { dir: "DOWN", x: 0, y: 1 },
  { dir: "LEFT", x: -1, y: 0 },
  { dir: "RIGHT", x: 1, y: 0 },
] as const;

function randomDFS(context: IBoardContext) {
  const { rows, columns, maze, currentPoint } = {
    ...context.board,
  };

  if (currentPoint.x === columns - 1 && currentPoint.y === rows - 1) return;
  console.log("current point:", currentPoint);

  const IndexArray = [0, 1, 2, 3];
  const randomIndexArray = IndexArray.sort(() => 0.5 - Math.random());

  let nextPoint = currentPoint;
  for (const randomIndex of randomIndexArray) {
    const option = directions[randomIndex];
    nextPoint = {
      x: currentPoint.x + option.x,
      y: currentPoint.y + option.y,
    };
    console.log(nextPoint);
    const outOfBoard =
      nextPoint.x < 0 ||
      nextPoint.x >= rows ||
      nextPoint.y < 0 ||
      nextPoint.y >= columns;
    if (outOfBoard) continue;
    const visited = maze[nextPoint.y][nextPoint.x] === "VISITED";
    const blocked = maze[nextPoint.y][nextPoint.x] === "BLOCKED";
    if (!visited && !blocked) break;
  }
  context.setBoard((prev) => {
    const newBoard = deepCopy2DArray(prev);
    newBoard[nextPoint.y][nextPoint.x] = "ACTIVE";
    newBoard[currentPoint.y][currentPoint.x] = "VISITED";
    return { ...prev, maze: newBoard, currentPoint: nextPoint };
  });
}

export default Chaejun;

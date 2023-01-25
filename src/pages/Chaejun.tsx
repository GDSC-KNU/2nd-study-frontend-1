import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

interface IInputNumber {
  columns: number;
  rows: number;
}

type TBlockStatus = "EMPTY" | "VISITED" | "BLOCKED" | "ACTIVE";

const Chaejun = () => {
  const [inputNumber, setInputNumber] = useState<IInputNumber>({
    columns: 3,
    rows: 3,
  });
  const [board, setBoard] = useState<TBlockStatus[][]>([
    ["EMPTY", "EMPTY", "EMPTY"],
    ["EMPTY", "EMPTY", "EMPTY"],
    ["EMPTY", "EMPTY", "EMPTY"],
  ]);

  const blockStyle = {
    EMPTY: "bg-white",
    VISITED: "bg-gray",
    BLOCKED: "bg-black text-white",
    ACTIVE: "bg-yellow-600",
  };

  const toggleState = {
    EMPTY: "BLOCKED",
    BLOCKED: "EMPTY",
    VISITED: "BLOCKED",
    ACTIVE: "ACTIVE",
  };

  return (
    <MainLayout>
      <>
        <h1 className="text-4xl font-bold">DFS/BFS</h1>
        <form
          className="flex flex-col gap-2 py-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block">columns</label>
              <input
                className="w-full rounded-md border-2 border-black py-2 px-3"
                type="number"
                onChange={(e) => {
                  const parseInput = Number.parseInt(e.target.value);
                  const columns = parseInput > 1 ? parseInput : 1;
                  setBoard(
                    Array(inputNumber.rows).fill(Array(columns).fill("EMPTY"))
                  );
                  setInputNumber((prev) => ({
                    ...prev,
                    columns,
                  }));
                }}
                value={inputNumber.columns}
                min="0"
              />
            </div>
            <div>
              <label className="block">rows</label>
              <input
                className="w-full rounded-md border-2 border-black py-2 px-3"
                type="number"
                onChange={(e) => {
                  const parseInput = Number.parseInt(e.target.value);
                  const rows = parseInput > 1 ? parseInput : 1;
                  setBoard(
                    Array(rows).fill(Array(inputNumber.columns).fill("EMPTY"))
                  );
                  setInputNumber((prev) => ({
                    ...prev,
                    rows,
                  }));
                }}
                value={inputNumber.rows}
                min="0"
              />
            </div>
          </div>
        </form>
        <h2 className="text-2xl font-bold">Board</h2>
        <div className="block rounded-md border-2 border-black p-3">
          <div
            className="divide-x-2 divide-y-2 divide-black"
            style={{
              gridTemplateColumns: `repeat(${inputNumber.columns}, 1fr)`,
              display: "grid",
            }}
          ></div>
          <table className="mx-auto border-collapse">
            <tbody>
              {board.map((row, rowId) => {
                return (
                  <tr key={rowId}>
                    {row.map((block, blockId) => {
                      const propsKey = "" + rowId + blockId;
                      return (
                        <td
                          className={`aspect-square h-20 w-20 border-2 border-black ${blockStyle[block]}`}
                          key={propsKey}
                          onClick={() => {
                            const isStart = rowId === 0 && blockId === 0;
                            const isEnd =
                              rowId === inputNumber.rows - 1 &&
                              blockId === inputNumber.columns - 1;

                            if (isStart || isEnd) return;
                            setBoard((prev) => {
                              const newBoard = prev.map((row) => row.slice());
                              newBoard[rowId][blockId] = toggleState[
                                block
                              ] as TBlockStatus;
                              return newBoard;
                            });
                          }}
                        >
                          {block}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    </MainLayout>
  );
};

export default Chaejun;

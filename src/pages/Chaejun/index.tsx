import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { AlgoButton } from "./components/AlgoButton";
import { BoardContext } from "./BoardContext";
import { NumberInput } from "./components/NumberInput";
import { ResetButton } from "./components/ResetButton";
import { SetMazeButton } from "./components/SetMazeButton";
import { Table } from "./components/Table";
import { create2DArray, BoardInterface } from "./utils/board";
import { DFS } from "./utils/DFS";
import { BFS } from "./utils/BFS";

const Chaejun = () => {
  const [board, setBoard] = useState<BoardInterface>({
    rows: 10,
    columns: 10,
    maze: create2DArray(10, 10),
    deque: [{ x: 0, y: 0 }],
  });

  return (
    <MainLayout>
      <BoardContext.Provider value={{ board, setBoard }}>
        <h1 className="text-4xl font-bold">DFS/BFS</h1>
        <form className="flex flex-col gap-2 py-4">
          <div className="grid grid-cols-2 gap-2">
            <NumberInput props={{ label: "rows" }} />
            <NumberInput props={{ label: "columns" }} />
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

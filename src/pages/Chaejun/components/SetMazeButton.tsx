import { useContext } from "react";
import { BoardContext } from "../BoardContext";
import {
  didReach,
  deepCopy2DArray,
  randomlyBlockOrEmpty,
  isStartOrEnd,
} from "../utils/board";
import { BoardContextInterface, BoardInterface } from "../utils/board";

export function SetMazeButton() {
  const { board, setBoard } = {
    ...useContext(BoardContext),
  } as BoardContextInterface;
  return (
    <button
      type="button"
      className="grow rounded-md border-2 border-black bg-black py-2 px-3 text-white"
      onClick={() => setBoard(setMazeFn)}
    >
      Set Maze
    </button>
  );

  function setMazeFn(prev: BoardInterface) {
    const newBoard = deepCopy2DArray(prev);
    const rows = newBoard.length;
    const columns = newBoard[0].length;
    const start = { y: 0, x: 0 };
    const end = { y: rows - 1, x: columns - 1 };
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const currentPoint = { y: i, x: j };
        if (isStartOrEnd(currentPoint, start, end)) continue;
        else newBoard[i][j] = randomlyBlockOrEmpty();
      }
    }
    return { ...prev, maze: newBoard };
  }
}

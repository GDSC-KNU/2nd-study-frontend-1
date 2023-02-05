import { useContext } from "react";
import { BoardContext } from "../BoardContext";
import { initializeBoard } from "../utils/board";
import { BoardContextInterface } from "../utils/board";

export function ResetButton() {
  const { board, setBoard } = {
    ...useContext(BoardContext),
  } as BoardContextInterface;

  function onChangeHandler() {
    setBoard((prev) => initializeBoard({ prev }));
  }

  return (
    <button
      type="button"
      className="grow rounded-md border-2 border-black"
      onClick={onChangeHandler}
    >
      Reset
    </button>
  );
}

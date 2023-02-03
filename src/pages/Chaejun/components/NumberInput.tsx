import { ReactElement, useContext } from "react";
import { BoardContext } from "../BoardContext";
import {
  BoardContextInterface,
  BoardInterface,
  initializeBoard,
  safeInput,
} from "../utils/board";

export function NumberInput({
  props: { label },
}: {
  props: {
    label: "columns" | "rows";
  };
}): ReactElement {
  const { board, setBoard } = {
    ...useContext(BoardContext),
  } as BoardContextInterface;
  return (
    <div className="grow">
      <label className="block">{label}</label>
      <input
        className="w-full rounded-md border-2 border-black py-2 px-3"
        type="number"
        onChange={onChangeHandler}
        value={board[label]}
        min="0"
      />
    </div>
  );

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setBoard((prev) => initializeBoard({ prev, [label]: safeInput(e) }));
  }
}

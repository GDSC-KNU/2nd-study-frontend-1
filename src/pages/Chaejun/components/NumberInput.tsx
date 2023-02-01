import { ReactElement } from "react";
import { BoardInterface } from "../utils/board";

export function NumberInput({
  props,
  onChange,
}: {
  props: {
    label: "columns" | "rows";
    board: BoardInterface;
    setBoard: React.Dispatch<React.SetStateAction<BoardInterface>>;
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

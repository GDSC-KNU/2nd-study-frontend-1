import clsx from "clsx";
import { useAlgorithm } from "../hooks/useAlgorithm";
import { BoardInterface } from "../utils/board";

export function AlgoButton({
  callbackFn,
  label,
}: {
  callbackFn: (prev: BoardInterface) => BoardInterface;
  label: string;
}) {
  const { start, setStart } = useAlgorithm({ callbackFn });

  const buttonStyle = clsx(
    "grow rounded-md border-2 border-black py-2 px-3 text-white",
    start ? "bg-yellow-400 text-black" : "bg-gray-600"
  );

  const onClickHandler = () => {
    setStart((prev) => !prev);
  };

  return (
    <button type="button" className={buttonStyle} onClick={onClickHandler}>
      {label}
    </button>
  );
}

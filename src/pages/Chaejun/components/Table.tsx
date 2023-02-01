import { ReactElement, useContext } from "react";
import { BoardContext } from "../BoardContext";
import {
  didReach,
  deepCopy2DArray,
  BlockStatusType,
  BlockInterface,
} from "../utils/board";
import { BoardContextInterface } from "../utils/board";

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

function TableCell({
  props: { currentPoint, block },
}: {
  props: {
    currentPoint: BlockInterface;
    block: BlockStatusType;
  };
}): ReactElement {
  const { board, setBoard } = {
    ...useContext(BoardContext),
  } as BoardContextInterface;

  const start = { y: 0, x: 0 };
  const end = { y: board.rows - 1, x: board.columns - 1 };
  const isStartOrEnd =
    didReach(currentPoint, start) || didReach(currentPoint, end);
  const blockClassName = `border-2 border-black ${blockStyle[block]} ${
    isStartOrEnd ? "bg-blue-400" : ""
  }`;

  const onClickHandler = () => {
    setBoard((prev) => {
      if (isStartOrEnd) return prev;
      const newBoard = deepCopy2DArray(prev);
      newBoard[currentPoint.y][currentPoint.x] = toggleState[block];
      return { ...prev, maze: newBoard };
    });
  };

  return (
    <td className={blockClassName} onClick={onClickHandler}>
      <div className="aspect-square w-8"></div>
    </td>
  );
}

function TableRow({
  props: { rowId, row },
}: {
  props: { rowId: number; row: BlockStatusType[] };
}): ReactElement {
  return (
    <tr key={rowId}>
      {row.map((block, blockId) => (
        <TableCell
          key={"" + block + blockId}
          props={{
            currentPoint: { y: rowId, x: blockId },
            block,
          }}
        />
      ))}
    </tr>
  );
}

export function Table(): ReactElement {
  const { board } = {
    ...useContext(BoardContext),
  } as BoardContextInterface;

  return (
    <table className="mx-auto border-collapse">
      <tbody>
        {board.maze.map((row, rowId) => (
          <TableRow key={rowId} props={{ rowId, row }} />
        ))}
      </tbody>
    </table>
  );
}

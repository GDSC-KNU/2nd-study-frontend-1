import { ReactElement, useContext } from "react";
import { BoardContext } from "../BoardContext";
import { didReach, deepCopy2DArray, BlockStatusType } from "../utils/board";
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

export function Table(): ReactElement {
  const { board, setBoard } = {
    ...useContext(BoardContext),
  } as BoardContextInterface;

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
    props: { rowId: number; row: BlockStatusType[] };
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
      block: BlockStatusType;
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

import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../BoardContext";
import { BoardInterface, BoardContextInterface } from "../utils/board";

export function useAlgorithm({
  callbackFn,
}: {
  callbackFn: (prev: BoardInterface) => BoardInterface;
}) {
  const { board, setBoard } = {
    ...useContext(BoardContext),
  } as BoardContextInterface;
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (start) {
      const timer = setInterval(() => {
        setBoard(callbackFn);
      }, 500);
      return () => clearInterval(timer);
    }
  }, [start]);

  useEffect(() => {
    const endStatus = board.maze[board.rows - 1][board.columns - 1];
    if (endStatus === "ACTIVE") {
      setStart(false);
    }
  }, [board.maze]);

  return { start, setStart };
}

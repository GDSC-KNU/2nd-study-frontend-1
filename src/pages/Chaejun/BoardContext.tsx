import { createContext } from "react";
import { BoardContextInterface } from "./utils/board";

export const BoardContext = createContext<BoardContextInterface | null>(null);

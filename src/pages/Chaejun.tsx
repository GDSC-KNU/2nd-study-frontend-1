import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

interface INode {
  value: number | null;
  pointer: INode | null;
}

function insertNode(root: INode[], node: number) {
  return root;
}

function deleteNode(root: INode[], node: number) {
  return root;
}

function searchNode(root: INode[], value: number) {
  return root;
}

const Chaejun = () => {
  const [node, setNode] = useState<string>("");
  const [tree, setTree] = useState<INode[]>([{ value: null, pointer: null }]);
  return (
    <MainLayout>
      <>
        <h1 className="text-4xl font-bold">DFS/BFS</h1>
        <form
          className="flex flex-col gap-2 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            setNode("");
          }}
        >
          <input
            className="rounded-md border-2 border-black py-4 px-4"
            type="number"
            onChange={(e) => setNode(e.target.value)}
            value={node}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="grow rounded-md bg-black py-4 px-4 text-white"
            >
              Insert
            </button>
            <button
              type="button"
              className="grow rounded-md bg-black py-4 px-4 text-white"
            >
              Delete
            </button>
            <button
              type="button"
              className="grow rounded-md bg-black py-4 px-4 text-white"
            >
              Search
            </button>
          </div>
        </form>
        <h2 className="text-2xl font-bold">Result</h2>
        <div className="block border-2 border-black">
          <div className="flex flex-col gap-2"></div>
        </div>
      </>
    </MainLayout>
  );
};

export default Chaejun;

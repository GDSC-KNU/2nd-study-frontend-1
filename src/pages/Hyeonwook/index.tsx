import { useState } from "react";
import { convert } from "./BinaryTree";
import "./styles.css";

interface Node {
  data: number;
  left: Object;
  right: Object;
}

const Hyeonwook = () => {
  const [inputArray, setInputArray] = useState("");
  const [addInputArray, setAddInputArray] = useState("");
  const [binaryTreeArray, setBinaryTreeArray] = useState<String[]>();

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    let temp = inputArray.split(",");
    setBinaryTreeArray(temp);
    setInputArray("");
  };

  const addHandler = (e: any) => {
    e.preventDefault();
    let temp = addInputArray.split(",");
    setBinaryTreeArray([...(binaryTreeArray || [""]), ...(temp || [""])]);
    setAddInputArray("");
  };

  const renderBinaryTree: any = (node: Node) => {
    const { left, right, data } = node;
    return (
      <>
        <>
          <div className="node__element">{data || "null"}</div>
          {left || right ? (
            <>
              <div className="node__bottom-line"></div>
              <div className="node__children">
                {left ? (
                  <div className="node node--left">
                    {renderBinaryTree(left)}
                  </div>
                ) : (
                  ""
                )}

                {right ? (
                  <div className="node node--right">
                    {renderBinaryTree(right)}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </>
      </>
    );
  };

  const renderBinaryTree2: any = (node: any) => {
    const { left, right, data } = node;
    return (
      <div
        key={data}
        className=" mount1 flex flex-col items-center justify-center"
      >
        <div className=" h-10 min-w-[60px] max-w-fit rounded-xl bg-purple-200 text-center leading-10">
          {data || "null"}
        </div>
        {left || right ? (
          <>
            <div className=" h-5 w-[1px] bg-gray-400"></div>
            <div className=" mx-auto flex border-t border-solid border-gray-400 ">
              {left ? (
                <div className=" relative ml-8 mr-2 flex flex-col items-center">
                  <span className=" mx-auto h-5 w-[1px] bg-gray-400"></span>
                  {renderBinaryTree2(left)}
                </div>
              ) : (
                <>
                  <div className=" relative ml-8 mr-2 flex min-w-[60px] flex-col items-center"></div>
                </>
              )}

              {right ? (
                <>
                  <div className=" relative mr-8 ml-2 flex  flex-col items-center">
                    <span className=" mx-auto h-5 w-[1px] bg-gray-400"></span>
                    {renderBinaryTree2(right)}
                  </div>
                </>
              ) : (
                <>
                  <div className=" relative mr-8 ml-2 flex min-w-[60px] flex-col items-center"></div>
                </>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div className=" m-4 ">
      <div>
        <ul>
          <li>
            <form onSubmit={onSubmitHandler}>
              <input
                type="text"
                placeholder="숫자배열을 입력하세요"
                value={inputArray}
                onChange={(e) => setInputArray(e.target.value)}
              ></input>
              <button type="submit">button</button>
            </form>
          </li>
          <li>
            <form onSubmit={addHandler}>
              <input
                type="text"
                placeholder="추가할 숫자나 배열을 입력하세요"
                value={addInputArray}
                onChange={(e) => setAddInputArray(e.target.value)}
              ></input>
              <button type="submit">button</button>
            </form>
          </li>
          <li>
            <a onClick={() => ""}>Remove</a>
          </li>
          <li>
            <a onClick={() => setBinaryTreeArray([""])}>Clear</a>
          </li>
          <li>Menu5</li>
        </ul>
      </div>
      <div className=" ">
        <h1 className=" text-center text-4xl">Binary Tree</h1>
        <div className="h">
          <div className="tree">
            {renderBinaryTree(convert(binaryTreeArray || [null], 0))}
          </div>

          {renderBinaryTree2(convert(binaryTreeArray || [null], 0))}
        </div>
      </div>
    </div>
  );
};

export default Hyeonwook;

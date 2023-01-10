import { useState } from "react";
import { BinaryTree, convert } from "./BinaryTree";
import "./styles.css";

const Hyeonwook = () => {
  const [inputArray, setInputArray] = useState("");
  const [binaryTreeArray, setBinaryTreeArray] = useState<String[]>();

  let { data, left, right }: any = convert(binaryTreeArray || [null], 0);

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    let temp = inputArray.split(",");
    setBinaryTreeArray(temp);
    setInputArray("");
  };

  const renderBinaryTree: any = (node: any) => {
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
      <>
        <div className=" h-10 min-w-[60px] max-w-fit rounded-xl bg-purple-200 text-center leading-10">
          {data || "null"}
        </div>
        {left || right ? (
          <>
            <div className=" h-5 w-[1px] bg-gray-400"></div>
            <div className=" mx-auto flex border-t border-solid border-gray-400 ">
              {left ? (
                <div className=" relative ml-10 mr-2 flex flex-col items-center">
                  <span className=" mx-auto h-5 w-[1px] bg-gray-400"></span>
                  {renderBinaryTree2(left)}
                </div>
              ) : (
                <>
                  <div className=" relative ml-10 mr-2 flex min-w-[60px] flex-col items-center"></div>
                </>
              )}

              {right ? (
                <>
                  <div className=" relative mr-10 ml-2 flex  flex-col items-center">
                    <span className=" mx-auto h-5 w-[1px] bg-gray-400"></span>
                    {renderBinaryTree2(right)}
                  </div>
                </>
              ) : (
                <>
                  <div className=" relative mr-10 ml-2 flex min-w-[60px] flex-col items-center"></div>
                </>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <div className=" m-4">
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
            <a onClick={() => setBinaryTreeArray([""])}>Clear</a>
          </li>
          <li>menu3</li>
          <li>menu4</li>
          <li>menu5</li>
        </ul>
      </div>
      <div>
        <h1 className=" text-center text-4xl">Binary Tree</h1>
        {/* <ul className=" text-center">
          {binaryTreeArray?.map((item, index) => (
            <li key={index}>{item || "null"}</li>
          ))}
        </ul> */}
        <div className="h">
          <div className="tree">
            {renderBinaryTree(convert(binaryTreeArray || [null], 0))}
          </div>
          <div className=" mt-7 flex flex-col items-center justify-center">
            {renderBinaryTree2(convert(binaryTreeArray || [null], 0))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hyeonwook;

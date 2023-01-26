import { useState } from "react";
import { convert } from "./BinaryTree";
import Dropdown from "../../components/Dropdown";

// interface Node {
//   data: number;
//   left: Object;
//   right: Object;
// }

const Hyeonwook = () => {
  const [inputArray, setInputArray] = useState("");
  const [addInputArray, setAddInputArray] = useState("");
  const [binaryTreeArray, setBinaryTreeArray] = useState<String[]>();

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [dropdownVisibility2, setDropdownVisibility2] = useState(false);
  const [dropdownVisibility3, setDropdownVisibility3] = useState(false);
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

  const removeHandler = (e: any) => {
    let value = e.target.innerHTML;
    let id = e.target.parentElement.id;

    let temp = binaryTreeArray?.filter((v) => v !== value);
    setBinaryTreeArray(temp?.length === 0 ? [""] : temp);
  };

  const renderBinaryTree: any = (node: any) => {
    const { left, right, data } = node;
    return (
      <div
        key={data}
        className=" mount1 flex flex-col items-center justify-center"
        id={data}
      >
        <div
          onClick={removeHandler}
          className=" h-10 min-w-[60px] max-w-fit rounded-xl bg-black text-center leading-10 text-white"
        >
          {data || "null"}
        </div>
        {left || right ? (
          <>
            <div className=" h-5 w-[1px] bg-gray-400"></div>
            <div className=" mx-auto flex border-t border-solid border-gray-400 ">
              {left ? (
                <div className=" relative ml-8 mr-2 flex flex-col items-center">
                  <span className=" mx-auto h-5 w-[1px] bg-gray-400"></span>
                  {renderBinaryTree(left)}
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
                    {renderBinaryTree(right)}
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
    <div className="m-0 min-h-[100vh] border-[40px] border-black p-6">
      <div className=" fixed bottom-14 left-0 z-20 flex text-white">
        <button
          className=" h-[120px] w-10 bg-orange-500"
          onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
        >
          &gt;
        </button>
        <Dropdown visibility={dropdownVisibility}>
          <ul className=" z-10 w-fit border-solid ">
            <li>
              <div className=" flex  text-center">
                <button
                  className=" w-full bg-orange-500 p-1 hover:bg-black"
                  onClick={(e) => setDropdownVisibility2(!dropdownVisibility2)}
                >
                  Set
                </button>
                <Dropdown visibility={dropdownVisibility2}>
                  <ul className=" z-10 w-fit border-solid ">
                    <li>
                      <form className=" flex" onSubmit={onSubmitHandler}>
                        <input
                          type="text"
                          placeholder="숫자 배열을 입력하세요"
                          value={inputArray}
                          onChange={(e) => setInputArray(e.target.value)}
                          className=" left-16 z-30 w-44 bg-black p-1"
                        ></input>
                        <button
                          className=" ml-2 w-10 bg-orange-500 hover:bg-black"
                          type="submit"
                        >
                          ok
                        </button>
                      </form>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </li>
            <li>
              <div className=" flex  text-center">
                <button
                  className=" w-full bg-orange-500 p-1 hover:bg-black"
                  onClick={(e) => setDropdownVisibility3(!dropdownVisibility3)}
                >
                  Add
                </button>
                <Dropdown visibility={dropdownVisibility3}>
                  <ul className=" z-10 w-fit border-solid ">
                    <li>
                      <form className=" flex " onSubmit={addHandler}>
                        <input
                          type="text"
                          placeholder="숫자나 배열을 입력하세요"
                          value={addInputArray}
                          onChange={(e) => setAddInputArray(e.target.value)}
                          className=" left-16 z-30 w-44 bg-black p-1"
                        ></input>
                        <button
                          className=" ml-2 w-10 bg-orange-500 hover:bg-black"
                          type="submit"
                        >
                          ok
                        </button>
                      </form>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </li>
            <li>
              <button
                className=" cursor-pointer bg-orange-500 p-1 hover:bg-black"
                onClick={() => setBinaryTreeArray([""])}
              >
                Clear
              </button>
            </li>
          </ul>
        </Dropdown>
      </div>
      <div className="">
        <h1
          className=" z-0 text-center text-4xl
        "
        >
          Level-Order Array to Binary Tree
        </h1>
        <div className=" mt-10">
          {renderBinaryTree(convert(binaryTreeArray || [null], 0))}
        </div>
      </div>
    </div>
  );
};

export default Hyeonwook;

import { FC, useEffect, useRef, useState } from "react";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../DefaultValues";

interface IProps {
  arraySize: number;
  array: number[];
  maxValue: number;
  isSorting: boolean;
  swappedBars: { left?: number; right?: number };
}

const Graph: FC<IProps> = ({
  array,
  arraySize,
  maxValue,
  swappedBars,
  isSorting,
}) => {
  const [graphHeight, setGraphHeight] = useState(DEFAULT_HEIGHT);
  const [graphWidth, setGraphWidth] = useState(DEFAULT_WIDTH);

  const graphRef = useRef<HTMLDivElement>(null);

  const handleSizeChange = () => {
    setGraphWidth(graphRef.current?.clientWidth || DEFAULT_WIDTH);
  };

  useEffect(() => {
    setGraphHeight(graphRef.current?.clientHeight || DEFAULT_HEIGHT);
    setGraphWidth(graphRef.current?.clientWidth || DEFAULT_WIDTH);

    window.addEventListener("resize", handleSizeChange);
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, []);

  const getColor = (index: number) => {
    if (!isSorting) return "#6184d8";
    if (swappedBars.left === index) return "#9cec5b";
    else if (swappedBars.right === index) return "#c4c4c4";
    return "#6184d8";
  };

  return (
    <div className="flex h-[50vh] justify-around" ref={graphRef}>
      {array.map((num, i) => {
        return (
          <div
            key={i}
            className="rounded-md"
            style={{
              height: `${(num / maxValue) * graphHeight}px`,
              width: `${graphWidth / arraySize - 3}px`,
              backgroundColor: `${getColor(i)}`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Graph;

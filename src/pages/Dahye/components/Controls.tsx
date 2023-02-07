import { FC } from "react";
import { NUMBERS_RANGE } from "../DefaultValues";
import Slider from "./Slider";
import DropDown from "./DropDown";

interface IProps {
  onDropdownChange: (sortBy: string) => void;
  arrayRandomizeHandler: () => void;
  arraySize: number;
  isSorting: boolean;
  sortBy: string;
  sortingSpeed: number;
  onSort: () => void;
  onSizeChange: (size: number) => void;
  onSpeedChange: (speed: number) => void;
}

const Controls: FC<IProps> = (props) => {
  const rangeChangeHandler = (event: any) => {
    if (event.target.name === "Size") {
      props.onSizeChange(event.target.value);
    } else if (event.target.name === "Speed") {
      props.onSpeedChange(event.target.value);
    }
  };

  return (
    <div className="font-xl grid grid-cols-2 pb-10 sm:grid-cols-4">
      <div className="align-center flex justify-around">
        <button
          className="w-20 rounded-md bg-black py-2 text-sm text-white"
          onClick={props.arrayRandomizeHandler}
        >
          SHUFFLE
        </button>
      </div>
      <div>
        <Slider
          value={props.arraySize}
          name="Size"
          min={NUMBERS_RANGE.MIN}
          max={NUMBERS_RANGE.MAX}
          onChange={rangeChangeHandler}
        />
        <Slider
          value={props.sortingSpeed}
          name="Speed"
          min={NUMBERS_RANGE.MIN}
          max={NUMBERS_RANGE.MAX}
          onChange={rangeChangeHandler}
        />
      </div>

      <DropDown value={props.sortBy} onChange={props.onDropdownChange} />

      <div className="align-center flex justify-around">
        <button
          className="w-20 rounded-md bg-black py-2 text-sm text-white"
          onClick={props.onSort}
        >
          SORT
        </button>
      </div>
    </div>
  );
};

export default Controls;

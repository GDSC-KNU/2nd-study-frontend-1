import { FC, ChangeEvent } from "react";
import { SORT } from "../DefaultValues";

const DropDown: FC<{ value: string; onChange: (value: string) => void }> = (
  props
) => {
  const dropdownChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <div>
      <select
        className="rounded-md border border-black bg-white px-4 py-1"
        name="sortby"
        id="sortby"
        value={props.value}
        onChange={dropdownChangeHandler}
      >
        <option value={SORT.INSERTION_SORT}>{SORT.INSERTION_SORT}</option>
        <option value={SORT.BUBBLE_SORT}>{SORT.BUBBLE_SORT}</option>
        <option value={SORT.HEAP_SORT}>{SORT.HEAP_SORT}</option>
      </select>
    </div>
  );
};

export default DropDown;

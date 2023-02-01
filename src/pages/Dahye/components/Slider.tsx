import { FC } from "react";

interface IProps {
  value: number;
  name: string;
  min: number;
  max: number;
  onChange: (event: any) => void;
}

const RangeSlider: FC<IProps> = (props) => {
  return (
    <div className="w-[100%]">
      <label className="mr-2">
        {props.name} : {props.value}
      </label>
      <input
        type="range"
        step="5"
        name={props.name}
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default RangeSlider;

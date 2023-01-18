import { useEffect, useState } from "react";
import "./styles.css";

const Dropdown = (props: any) => {
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);

  useEffect(() => {
    if (props.visibility) {
      setVisibilityAnimation(true);
    } else {
      setTimeout(() => {
        setVisibilityAnimation(false);
      }, 400);
    }
  }, [props.visibility]);

  return (
    <div
      className={
        " absolute " +
        `${
          props.visibility
            ? "slide-fade-in-dropdown"
            : "slide-fade-out-dropdown"
        }`
      }
    >
      {props.visibility && props.children}
    </div>
  );
};

export default Dropdown;

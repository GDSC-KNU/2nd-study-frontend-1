import { useEffect, useState } from "react";
import "./styles.css";

const Dropdown = (props: any) => {
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    if (props.visibility) {
      setTimeout(() => {
        setOverflow(true);
      }, 400);
      setVisibilityAnimation(true);
    } else {
      setTimeout(() => {
        setVisibilityAnimation(false);
        setOverflow(false);
      }, 400);
    }
  }, [props.visibility]);

  return (
    <div
      className={
        " absolute left-12 overflow-hidden" +
        `${
          props.visibility
            ? overflow
              ? " slide-fade-in-dropdown overflow-visible"
              : " slide-fade-in-dropdown overflow-hidden"
            : " slide-fade-out-dropdown overflow-hidden"
        }`
      }
    >
      {visibilityAnimation && props.children}
    </div>
  );
};

export default Dropdown;

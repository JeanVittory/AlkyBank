import React, { useState, useEffect } from "react";
import "./Tooltip.css";

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 200);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  useEffect(() => {
    props.status === "success"
      ? setStatus("bg-green-500")
      : setStatus("bg-red-500");
  }, [props.status]);

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"} ${status}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

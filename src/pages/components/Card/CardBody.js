import React from "react";

const CardBody = ({ text }) => {
  return (
    <h4
      style={{
        wordBreak: "break-all",
      }}
      className="mt-3 text-sm font-medium"
    >
      {text}
    </h4>
  );
};

export default CardBody;

import React from "react";

const Card = ({ children }) => {
  return (
    <div
      className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 "
      draggable="true"
    >
      {children}
    </div>
  );
};

export default Card;

import React from "react";
import { useDrop } from "react-dnd";

const Section = ({ section, children }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: () => ({ name: section }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      className={`${
        isActive
          ? "bg-gray-200/20 "
          : canDrop
          ? "bg-green-200/20"
          : "bg-gradient-to-tr from-blue-50/20 to-pink-50/20"
      } p-2 flex flex-col flex-shrink-0 w-72 rounded-md overflow-auto mb-3`}
    >
      {children}
    </div>
  );
};

export default Section;

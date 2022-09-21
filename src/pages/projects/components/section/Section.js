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
  return (
    <div ref={drop} className="flex flex-col flex-shrink-0 w-72">
      {children}
    </div>
  );
};

export default Section;

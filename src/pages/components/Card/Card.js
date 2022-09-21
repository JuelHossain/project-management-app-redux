import React from "react";
import { useDrag } from "react-dnd";
import { useEditProjectMutation } from "../../../features/projects/projectsApi";

const Card = ({ id, children, ...props }) => {

  const [editProject] = useEditProjectMutation();
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "BOX",
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        editProject({ id, data: { section: dropResult.name } });
      }
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div
      ref={drag}
      {...props}
      className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 whitespace-normal "
      draggable="true"
    >
      {children}
    </div>
  );
};

export default Card;

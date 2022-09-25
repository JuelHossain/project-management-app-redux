import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useStageProjectMutation } from "../../../features/projects/projectsApi";
import { selectSearch } from "../../../features/projects/projectSelectors";

const Card = ({ data, children, ...props }) => {
  const search = useSelector(selectSearch);
  const [matched, setMatched] = useState(false);
  useEffect(() => {
    if (search === "") {
      setMatched(false);
    } else {
      if (data?.title.toLowerCase().includes(search.toLowerCase())) {
        setMatched(true);
      } else {
        setMatched(false);
      }
    }
  }, [search, data]);

  const [stageProject] = useStageProjectMutation();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOX",
    item: { id: data?.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (dropResult.name !== data?.section) {
          stageProject({
            data,
            patch: { section: dropResult.name },
          });
        }
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
      className={`relative flex flex-col items-start p-4   rounded-lg cursor-pointer  whitespace-normal hover:shadow-lg  ${
        isDragging && "opacity-0"
      } ${
        matched
          ? "border-2 shadow-lg border-blue-500 bg-blue-50/80"
          : " bg-white/80 border shadow-mds"
      }`}
      draggable={!!data}
    >
      {children}
    </div>
  );
};

export default Card;

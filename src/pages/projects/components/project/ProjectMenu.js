import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { useReducer } from "react";
import { useDeleteProjectMutation } from "../../../../features/projects/projectsApi";

const ProjectMenu = ({ id, color }) => {
  const [deleteProject] = useDeleteProjectMutation();
  const [open, toggle] = useReducer((state) => !state, false);
  return (
    <Popover
      open={open}
      handler={toggle}
      placement="bottom-end"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <PopoverHandler>
        <Button color="red" className="py-1 px-2 ">
          Delete
        </Button>
      </PopoverHandler>
      <PopoverContent className="-mt-8 bg-gray-50">
        <div className="flex flex-col gap-2 ">
          <p>Are You Sure ?</p>
          <div className="flex gap-2">
            <Button
              className="py-1 px-3"
              color="red"
              onClick={() => {
                deleteProject({ id, section: "backlog" });
              }}
            >
              Yes
            </Button>
            <Button className="py-1 px-3" color="green" onClick={toggle}>
              No
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectMenu;

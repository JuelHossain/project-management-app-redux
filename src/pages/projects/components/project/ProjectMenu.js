import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React from "react";
import { useDeleteProjectMutation } from "../../../../features/projects/projectsApi";

const ProjectMenu = ({ id, color }) => {
  const [deleteProject] = useDeleteProjectMutation();
  return (
    <Popover
      placement="left"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <PopoverHandler>
        <IconButton className="w-7 h-7" variant="text" color={color?.name}>
          <svg
            className="w-3.5 h-3.5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </IconButton>
      </PopoverHandler>
      <PopoverContent className="p-0">
        <Popover
          placement="bottom"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <PopoverHandler>
            <Button color="red" className="py-1 px-2">
              Delete
            </Button>
          </PopoverHandler>
          <PopoverContent className="-mt-8">
            <div className="flex flex-col gap-2">
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
                <Button className="py-1 px-3" color="green">
                  No
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectMenu;

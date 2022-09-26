import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../features/auth/authSelector";
import { useDeleteProjectMutation } from "../../../../../features/projects/projectsApi";

export default function DeleteProject({
  id,
  color,
  deleteOpen,
  deleteToggle,
  creatorEmail,
  teamCreatorEmail,
}) {
  const { email: myEmail } = useSelector(selectUser);
  const [deleteProject] = useDeleteProjectMutation();

  return (
    <Popover
      open={deleteOpen}
      handler={deleteToggle}
      placement="bottom-end"
      animate={{
        mount: {
          scale: 1,
          y: 0,
        },
        unmount: {
          scale: 0,
          y: 25,
        },
      }}
    >
      <PopoverHandler>
        <div className="flex items-center gap-2 py-0.5 px-2 rounded-md bg-red-500 text-red-50 hover:bg-red-700 duration-300 cursor-pointer ">
          <p className="text-sm font-bold">Delete</p>
          <XCircleIcon className="w-4 h-4" />
        </div>
      </PopoverHandler>
      <PopoverContent className="-mt-8 p-0">
        {creatorEmail === myEmail || teamCreatorEmail === myEmail ? (
          <div
            className="flex flex-col gap-2 py-2 px-4 shadow-md  rounded"
            style={{
              backgroundColor: color["50"],
              color: color["500"],
            }}
          >
            <p>Are You Sure ?</p>
            <div className="flex gap-2">
              <Button
                className="py-1 px-3 bg-green-400 text-green-50"
                color="green"
                onClick={deleteToggle}
              >
                No
              </Button>
              <Button
                className="py-1 px-3 bg-red-400 text-red-50"
                color="red"
                onClick={() => {
                  deleteProject({
                    id,
                    section: "backlog",
                  });
                }}
              >
                Yes Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 py-2 px-3  shadow-md  rounded bg-red-500 text-white ">
            <p>You Are not Authorized to Delete this project</p>
            <IconButton
              className="w-5 h-5"
              color="white"
              onClick={deleteToggle}
            >
              <XMarkIcon className="w-4 h-4 " />
            </IconButton>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

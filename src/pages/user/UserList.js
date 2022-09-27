import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useReducer } from "react";
import { image } from "../../utils/defaults";

const UserList = ({ user, setDeletedUser, deleteUser }) => {
  const [open, toggle] = useReducer((state) => !state, false);
  return (
    <div className="flex gap-2 bg-blue-200/50 hover:bg-blue-300/50 rounded-md py-1 px-2 justify-between items-center">
      <div className="flex gap-2 items-center">
        <Avatar
          src={image(user.name)}
          size="sm"
          variant="circular"
          className=" p-1 ring-1"
        />
        <div>
          <p className="text-sm ">{user.name}</p>
          <p className="text-sm ">{user.email}</p>
        </div>
      </div>
      <ConfirmDelete
        open={open}
        toggle={toggle}
        setDeletedUser={setDeletedUser}
        deleteUser={deleteUser}
        user={user}
      />
    </div>
  );
};

export default UserList;

function ConfirmDelete({ open, toggle, setDeletedUser, deleteUser, user }) {
  return (
    <Popover
      placement="top"
      open={open}
      handler={toggle}
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
        <IconButton size="sm" variant="text" color="red">
          <XMarkIcon className="w-6 h-6" />
        </IconButton>
      </PopoverHandler>
      <PopoverContent className="flex flex-col gap-2 py-4 px-4 shadow-md  rounded-md mt-10">
        <p>Are You Sure ?</p>
        <div className="flex gap-2">
          <Button
            className="py-1 px-3 bg-green-400 text-green-50"
            color="green"
            onClick={toggle}
          >
            No
          </Button>
          <Button
            className="py-1 px-3 bg-red-400 text-red-50"
            color="red"
            onClick={() => {
              setDeletedUser(user.name);
              deleteUser(user.id);
            }}
          >
            Yes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

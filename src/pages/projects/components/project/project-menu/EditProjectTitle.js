import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Alert, Button, IconButton } from "@material-tailwind/react";
import React from "react";

export default function EditProjectTitle({
  color,
  setNewTitle,
  newTitle,
  error,
  toggle,
  editHandler,
}) {
  return (
    <div className="flex flex-col gap-2">
      <textarea
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
        value={newTitle}
        className="border focus:border-2 focus:outline-none p-2 rounded-md"
        style={{
          borderColor: color["500"],
        }}
      />
      <Alert
        icon={<QuestionMarkCircleIcon className="w-5 h-5 -mt-3.5" />}
        color="red"
        className="py-1 px-3 text-xs "
        show={!!error}
      >
        {error}
      </Alert>
      <div className="text-right flex items-center justify-between">
        <IconButton color="green" onClick={toggle} className="w-5 h-5 p-0.5">
          <XMarkIcon className="w-4 h-4" />
        </IconButton>
        <Button
          color="green"
          className="py-0.5 rounded-md px-2"
          onClick={editHandler}
        >
          Edit Project Title
        </Button>
      </div>
    </div>
  );
}

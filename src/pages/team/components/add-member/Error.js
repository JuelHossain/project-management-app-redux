import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/authSelector";

const Error = ({ error, creatorEmail, setError, setInput, setSuccess }) => {
  const { email: myEmail } = useSelector(selectUser);

  return (
    !!error && (
      <div className="absolute w-full text-red-500 text-xs py-1 px-3 bg-red-100 rounded-md mt-1 flex justify-between items-center">
        <p>{error}</p>
        {creatorEmail === myEmail && (
          <IconButton
            onClick={() => {
              setError("");
              setInput("");
              setSuccess(false);
            }}
            className="-mr-2 w-5 h-5 flex-shrink-0 "
            color="red"
            variant="text"
          >
            <XMarkIcon className="w-4 h-4" />
          </IconButton>
        )}
      </div>
    )
  );
};

export default Error;

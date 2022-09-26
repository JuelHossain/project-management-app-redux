import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { IconButton, Input } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/authSelector";

export default function AddInput({
  color,
  creatorEmail,
  error,
  inputRef,
  success,
  handleSearch,
  userData,
  loading,
}) {
  const { email: myEmail } = useSelector(selectUser);
  return (
    <Input
      color={color?.name}
      disabled={creatorEmail !== myEmail}
      error={!!error}
      ref={inputRef}
      success={success}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      label={"Add Member"}
      icon={
        <IconButton
          disabled={!userData || loading}
          variant="text"
          size="sm"
          className="-mt-[5.5px] -ml-[4px] "
          color={color?.name}
          type="submit"
        >
          <PlusCircleIcon className="w-5 h-5" />
        </IconButton>
      }
    />
  );
}

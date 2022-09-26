import { Button, DialogFooter } from "@material-tailwind/react";
import React from "react";

export default function CreateActions({ error, toggle }) {
  return (
    <DialogFooter className="justify-between">
      <p className="text-red-500 text-xs">{error}</p>
      <div>
        <Button
          size="sm"
          variant="text"
          color="red"
          onClick={toggle}
          className="mr-1"
        >
          Cancel
        </Button>
        <Button type="submit" size="sm" variant="gradient" color="green">
          <span>Create</span>
        </Button>
      </div>
    </DialogFooter>
  );
}

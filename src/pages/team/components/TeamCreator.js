import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import tailColors from "tailwindcss/colors";
const colors = Object.keys(tailColors).slice(6, 26);

const TeamCreator = ({ open, toggle }) => {
  const [color, setColor] = useState("");
  const [colorError, setColorError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [about, setAbout] = useState("");
  const [aboutError, setAboutError] = useState();

  const createHandler = (e) => {
    e.preventDefault();
    console.log(color, name, about);
  };
  return (
    <Dialog open={open} handler={toggle}>
      <form onSubmit={createHandler}>
        <DialogHeader>Create A Team</DialogHeader>
        <DialogBody className="flex-col gap-2" divider>
          <Input
            error={!!nameError}
            onChange={(e) => {
              const name = e.target.value;
              if (name === "") {
                setNameError("Cannot Be empty");
              } else {
                setNameError("");
                if (name.length < 3) {
                  setNameError("Name is short");
                } else {
                  setName(name);
                }
              }
            }}
            type={"text"}
            label={nameError || "Name"}
          />
          <Textarea
            error={!!aboutError}
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            type={"text"}
            label={aboutError || "About"}
          />
          <Select
            error={!!colorError}
            placement="bottom-end"
            autoFocus
            label={colorError || "Select Color"}
            className={` text-${color}-500 capitalize`}
            value={color}
            onChange={(value) => {
              setColor(value);
            }}
          >
            {colors.map((color) => (
              <Option
                key={color}
                className={`text-${color}-500 hover:text-${color}-500 hover:bg-${color}-100 capitalize`}
                value={color}
              >
                {color}
              </Option>
            ))}
          </Select>
        </DialogBody>
        <DialogFooter>
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
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default TeamCreator;

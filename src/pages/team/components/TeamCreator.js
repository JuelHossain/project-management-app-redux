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
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import tailColors from "tailwindcss/colors";
import { useCreateTeamMutation } from "../../../features/team/teamApi";
import Loading from "../../components/Loading";
const colors = Object.keys(tailColors).slice(6, 26);

const TeamCreator = ({ open, toggle }) => {
  console.log(moment().format("MMM D"));
  const { user } = useSelector((state) => state.auth);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [createTeam, { isLoading, isSuccess, error }] = useCreateTeamMutation();
  const [color, setColor] = useState("");
  const [colorError, setColorError] = useState("");
  const createHandler = (data) => {
    if (color === "") {
      setColorError(" Oops,Color is required too");
    } else {
      setColorError("");
      createTeam({
        ...data,
        color,
        members: [user],
        createdAt: moment().format("MMM D"),
      });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      reset();
      setColor("");
      toggle();
    }
  }, [isSuccess, toggle,reset]);
  return (
    <Dialog open={open} handler={toggle} className="min-w-[320px] max-w-md">
      <Loading visible={isLoading} />
      <form onSubmit={handleSubmit(createHandler)}>
        <DialogHeader>Create A Team</DialogHeader>
        <DialogBody className="flex-col gap-2" divider>
          <Input
            error={!!errors?.name}
            {...register("name", {
              required: "Name Is Required",
              minLength: {
                value: 3,
                message: "Name Is Short",
              },
            })}
            type={"text"}
            label={errors?.name?.message || "Name"}
          />
          <Textarea
            error={!!errors?.about}
            {...register("about", {
              required: "About is required",
              minLength: {
                value: 10,
                message: "Minimum 10 Character Required",
              },
            })}
            type={"text"}
            label={errors?.about?.message || "About"}
          />
          <Select
            error={!!colorError}
            placement="bottom-end"
            label={colorError || "Select Color"}
            className={` text-${color}-500 capitalize`}
            onChange={(value) => {
              setColorError("");
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
        <DialogFooter className="justify-between">
          <p className="text-red-500 text-xs">{error?.error || error?.data}</p>
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
      </form>
    </Dialog>
  );
};

export default TeamCreator;

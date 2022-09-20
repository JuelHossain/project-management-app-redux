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
import ntc from "ntc";
import { useEffect, useRef, useState } from "react";
import { CirclePicker } from "react-color";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCreateTeamMutation } from "../../../features/team/teamApi";
import Loading from "../../components/Loading";
const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];

const TeamCreator = ({ open, toggle }) => {
  const { user } = useSelector((state) => state.auth);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [createTeam, { isLoading, isSuccess, error }] = useCreateTeamMutation();
  const [color, setColor] = useState(null);
  const [colorError, setColorError] = useState("");
  const [colorName, setColorName] = useState("");
  const createHandler = (data) => {
    if (color === "") {
      setColorError(" Oops,Color is required too");
    } else {
      setColorError("");
      createTeam({
        ...data,
        color,
        members: [user],
        createdBy: user?.email,
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
  }, [isSuccess, toggle, reset]);
  const colorPickerRef = useRef(null);
  useEffect(() => {
    console.log(colorPickerRef.current);
  }, [colorPickerRef]);
  return (
    <Dialog open={open} handler={toggle} className="min-w-[320px] max-w-md ">
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

          <div className="relative">
            <Select label="Select A Color">
              <Option className="flex justify-center items-center">
                <CirclePicker
                  colors={colors}
                  circleSize={28}
                  circleSpacing={10}
                  onChange={(value) => {
                    setColorName(ntc.name(value.hex)[1]);
                    const { r, g, b, a } = value.rgb;
                    const color = {
                      bgColor: `rgb(${r},${g},${b},${0.2})`,
                      textColor: `rgb(${r},${g},${b},${a})`,
                    };
                    setColor(color);
                  }}
                />
              </Option>
            </Select>
            {color && (
              <p
                className="absolute text-sm top-3 left-3"
                style={{
                  color: color.textColor,
                  backgroundColor: color.bgColor,
                }}
              >
                {colorName}
              </p>
            )}
          </div>
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

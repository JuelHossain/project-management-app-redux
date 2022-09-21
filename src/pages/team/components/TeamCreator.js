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
import { useCreateTeamMutation } from "../../../features/team/teamApi";
import { colors } from "../../../utils/colors";
import Loading from "../../components/Loading";

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
  const createHandler = (data) => {
    if (color) {
      setColorError("");
      createTeam({
        ...data,
        color,
        members: [user],
        createdBy: user,
        createdAt: moment().format("MMM D"),
      });
    } else {
      setColorError(" Oops,Color is required too");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      reset();
      setColor("");
      toggle();
    }
  }, [isSuccess, toggle, reset]);

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
            <Select
              color={color?.name}
              label={colorError || "Select A Color"}
              error={!!colorError}
              menuProps={{
                className: "flex flex-wrap gap-2 justify-between items-center",
              }}
            >
              {Object.keys(colors).map((key) => {
                const color = {
                  name: key,
                  ...colors[key],
                  common: {
                    backgroundColor: colors[key]["100"],
                    color: colors[key]["500"],
                  },
                };
                return (
                  <Option
                    onClick={() => {
                      setColor(color);
                    }}
                    key={Math.random()}
                    value={"color"}
                    style={{
                      backgroundColor: colors[key]["500"],
                    }}
                    className={`text-[0.1px] hover:scale-150 rounded-full capitalize  w-6 h-6 `}
                  >
                    <span className="hidden">hidden</span>
                  </Option>
                );
              })}
            </Select>
            {color && (
              <span
                className="absolute top-3 left-3.5 capitalize text-sm px-2 rounded z-0"
                style={color.common}
              >
                {color.name}
              </span>
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
